"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import Modal from "@/components/Modal";
import ServiceDetails from "@/components/services/ServiceDetails";
import { Service } from "@/types/graphql/service";
import Spinner from "@/components/Spinner";
import { Card } from "@/components/SearchResultGrid";
import { FAQ } from "@/types/graphql/faq";
import ResultPopUpModal from "@/components/ResultPopUpModal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const TABS = ["All", "Services", "FAQ"];

const SERVICES_AND_FAQS_BY_CATEGORY = gql`
  query ServiceAndFaqsByCategory($filters: ServiceCategoryFiltersInput) {
    serviceCategories(filters: $filters) {
      faqs {
        __typename
        question
        faqAnswer
        documentId
        tags {
          name
        }
        action {
          name
          url
        }
      }
      services {
        __typename
        Name
        Description
        documentId
      }
    }
  }
`;

export default function ServiceCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab");
  const activeTab = tabParam && TABS.includes(tabParam) ? tabParam : "All";

  const [query, setQuery] = useState("");

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "All") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    router.push(`?${params.toString()}`);
  };

  const [selectedItem, setSelectedItem] = useState<Service | FAQ | null>(null);

  const { data, loading, error } = useQuery<{
    serviceCategories: {
      services: Service[];
      faqs: FAQ[];
    }[];
  }>(SERVICES_AND_FAQS_BY_CATEGORY, {
    variables: {
      filters: {
        Slug: {
          eqi: slug,
        },
      },
    },
    skip: !slug,
  });

  const category = data?.serviceCategories?.[0];
  const faqs = category?.faqs ?? [];
  const services = category?.services ?? [];

  let filteredItems: (Service | FAQ)[] = [];

  if (activeTab === "All") {
    filteredItems = [...services, ...faqs];
  } else if (activeTab === "Services") {
    filteredItems = services;
  } else if (activeTab === "FAQ") {
    filteredItems = faqs;
  }

  // Apply search filtering
  const searchQuery = query.toLowerCase();

  const searchedItems = filteredItems.filter((item) => {
    if (item.__typename === "Service") {
      return item.Name?.toLowerCase().includes(searchQuery);
    }
    if (item.__typename === "Faq") {
      return item.question?.toLowerCase().includes(searchQuery);
    }
    return false;
  });

  // Generate heading with fallback that doesn't cause layout shift
  const heading =
    services[0]?.service_category?.Name ??
    (slug
      ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Service Category");

  return (
    <main className="container w-full mx-auto px-6 pt-6 pb-20">
      {/* Top section - fixed layout */}
      <div className="flex flex-col gap-6">
        {/* Back button */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </div>

        {/* Heading always centered */}
        <h1 className="text-[30px] sm:text-[40px] font-bold text-center leading-tight">
          {heading}
        </h1>

        {/* Search input always centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-[529px]">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center bg-[#E9E9E9] rounded-[12px] px-[7px] h-[54px]">
              <input
                type="text"
                placeholder="Search services..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-[13px] text-gray-800 focus:outline-none pl-[7px] h-full"
              />
              <button
                type="submit"
                className="flex-shrink-0 text-gray-600 hover:text-black transition-colors text-xl p-1">
                <img
                  src="/images/searchicon.png"
                  alt="Search"
                  className="w-[47px] h-[42px] object-contain"
                />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Fixed width tab navigation */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-[529px] h-12">
          <div className="flex h-full">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 h-full text-sm sm:text-base font-semibold transition-all duration-200 border-b-2 cursor-pointer ${
                  activeTab === tab
                    ? "text-black border-black"
                    : "text-gray-600 border-transparent hover:text-black hover:border-gray-400"
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner size={40} position="top" />
          <p className="mt-4 text-gray-500">Loading content...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">
            Failed to load data. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Retry
          </button>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Results count with consistent styling */}
          <div className="text-center mb-6">
            <p className="text-xs md:text-xl font-extralight">
              <span className="text-golden font-medium">
                {searchedItems.length}
              </span>{" "}
              {searchedItems.length === 1 ? "result" : "results"} found
              {query && (
                <span className="ml-1 text-gray-600">for "{query}"</span>
              )}
            </p>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedItems.length > 0 ? (
              searchedItems.map((item) => (
                <Card
                  key={item.documentId}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
                  <p className="text-lg text-gray-500 mb-2">
                    No {activeTab.toLowerCase()} found
                  </p>
                  {query ? (
                    <div>
                      <p className="text-sm text-gray-400 mb-4">
                        Try adjusting your search terms or browse all{" "}
                        {activeTab.toLowerCase()}.
                      </p>
                      <button
                        onClick={() => setQuery("")}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
                        Clear Search
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Check back later for new content.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal with service details */}
      {selectedItem && (
        <ResultPopUpModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </main>
  );
}
