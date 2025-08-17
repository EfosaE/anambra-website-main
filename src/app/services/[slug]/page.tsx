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

  const heading =
    services[0]?.service_category?.Name ??
    slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ??
    "Service";

  return (
    <main className="max-w-7xl mx-auto px-6 pt-[50px] pb-20">
      <h1 className="text-[30px]  sm:text-[40px] font-bold text-center leading-tight mb-9">
        {heading}
      </h1>

      {/* Search Bar */}
      <div className="mt-[36px] flex flex-col items-center justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center bg-[#E9E9E9] rounded-[12px] w-full max-w-[529px] px-[7px]">
          <input
            type="text"
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow bg-transparent text-[13px] text-gray-800 focus:outline-none pl-[7px]"
            style={{ borderRadius: "12px" }}
          />
          <button
            type="submit"
            className="text-gray-600 hover:text-black transition text-xl">
            <img
              src="/images/searchicon.png"
              alt="Search"
              className="w-[47px] h-[54px] object-contain"
            />
          </button>
        </form>
      </div>

      {/* Tab Navigation */}
      <div className="mt-9 w-full max-w-[529px] h-12 mx-auto mb-12">
        <div className="flex h-full">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 h-full text-sm sm:text-base font-semibold transition duration-200 border-b-2 cursor-pointer ${
                activeTab === tab
                  ? "text-black border-black"
                  : "text-black border-transparent hover:text-black hover:border-black"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Loading / Error states */}
      {loading && <Spinner size={40} position="top" />}
      {error && (
        <p className="mt-6 text-center text-red-500">
          Failed to load data. Please try again later.
        </p>
      )}

      {/* Services List */}
      {!loading && !error && (
        <>
          <p className="text-center md:text-2xl ">
            <span className="text-golden font-bold">
              {searchedItems.length}{" "}
            </span>{" "}
            result(s) found
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedItems.length > 0 ? (
              searchedItems.map((item) => (
                <Card
                  key={item.documentId}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-[13px] text-gray-500">
                No {activeTab.toLowerCase()} found for this category.
              </p>
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
