"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchAllServices } from "@/lib/clients/service.client";
import { fetchAllFaqs } from "@/lib/clients/faq.client";
import { FAQ } from "@/types/graphql/faq";
import { Service } from "@/types/graphql/service";

const TABS = ["All", "Services", "FAQ"];

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("Services");
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      try {
        const [allServices, allFaqs] = await Promise.all([
          fetchAllServices(),
          fetchAllFaqs(),
        ]);

        const slugStr = slug.toString().toLowerCase();

        setServices(
          allServices.filter(
            (s:Service) => s.service_category?.Slug?.toLowerCase() === slugStr
          )
        );
        setFaqs(
          allFaqs.filter(
            (faq: FAQ) => faq.faq_category?.Slug?.toLowerCase() === slugStr
          )
        );
      } catch (err) {
        console.error("Error fetching services/faqs:", err);
      }
    };

    loadData();
  }, [slug]);

  useEffect(() => {
    const validTab = TABS.map((t) => t.toLowerCase());
    const cleanTab = tabParam?.toLowerCase();

    if (cleanTab && validTab.includes(cleanTab)) {
      setActiveTab(
        TABS.find((t) => t.toLowerCase() === cleanTab) || "Services"
      );
    } else {
      setActiveTab("Services");
    }
  }, [tabParam]);

  const heading =
    services[0]?.service_category?.Name ??
    slug?.toString().replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ??
    "Service";

  const filteredServices = services.filter((s) =>
    s.Name?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFaqs = faqs.filter((faq) =>
    faq.question?.toLowerCase().includes(query.toLowerCase())
  );

  const showServices = activeTab === "All" || activeTab === "Services";
  const showFaqs = activeTab === "All" || activeTab === "FAQ";

  const renderTabContent = () => {
    const noResults = showServices && filteredServices.length === 0 &&
                      showFaqs && filteredFaqs.length === 0;

    return (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showServices &&
          filteredServices.map((service) => (
            <div
              key={service.documentId}
              className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col justify-between h-full">
              <p className="text-gray-600 text-[13px] mb-12">
                {service.Description ||
                  `Learn about the ${service.Name} service.`}
              </p>

              <div className="flex justify-between text-[11px] text-blue-600 font-semibold">
                <Link
                  href={`/services/${service.service_category?.Slug}?tab=services`}
                  className="uppercase">
                  {service.Name}
                </Link>
                <Link
                  href={`/services/${service.service_category?.Slug}?tab=faq`}>
                  FAQ
                </Link>
              </div>
            </div>
          ))}

        {showFaqs &&
          filteredFaqs.map((faq) => (
            <div
              key={faq.documentId}
              className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col justify-between h-full">
              <p className="text-gray-600 text-[13px] mb-12">{faq.question}</p>

              <div className="flex justify-between text-[11px] text-blue-600 font-semibold">
                <Link
                  href={`/services/${faq.faq_category?.Slug}?tab=services`}
                  className="uppercase">
                  {heading}
                </Link>
                <Link href={`/services/${faq.faq_category?.Slug}?tab=faq`}>
                  {faq.question?.length > 18 ? "View FAQ" : faq.question}
                </Link>
              </div>
            </div>
          ))}

        {noResults && (
          <p className="col-span-full text-center text-[13px] text-gray-500">
            No services or FAQs found for this category.
          </p>
        )}
      </div>
    );
  };

  // Update tab in URL when user clicks a tab
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("tab", tab.toLowerCase());
    router.push(`?${current.toString()}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 pt-[50px] pb-20">
      <h1 className="text-[30px] sm:text-[40px] font-bold text-center leading-tight mb-9">
        {heading}
      </h1>

      {/* Search Bar */}
      <div className="mt-[36px] flex flex-col items-center justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center bg-[#E9E9E9] rounded-[12px] w-full max-w-[529px] px-[7px]">
          <input
            type="text"
            placeholder={`Search ${activeTab === "FAQ" ? "FAQs" : "Services"}...`}
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
              onClick={() => handleTabClick(tab)}
              className={`flex-1 h-full text-sm sm:text-base font-semibold transition duration-200 border-b-2 ${
                activeTab === tab
                  ? "text-black border-black"
                  : "text-black border-transparent hover:text-black hover:border-black"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </main>
  );
}
