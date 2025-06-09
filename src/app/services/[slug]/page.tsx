// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// const TABS = ["All", "Services", "FAQ"];

// const SERVICES = [
//   { title: "Advertisement", slug: "advertisement" },
//   { title: "Agencies", slug: "agencies" },
//   { title: "Archive", slug: "archive" },
//   { title: "Business", slug: "business" },
//   { title: "Citizens", slug: "citizens" },
//   { title: "Construction", slug: "construction" },
//   { title: "Education", slug: "education" },
//   { title: "Emergency Vehicle", slug: "emergency-vehicle" },
//   { title: "Environment", slug: "environment" },
//   { title: "Event", slug: "event" },
//   { title: "Events Calendar", slug: "events-calendar" },
//   { title: "Government Benefits", slug: "government-benefits" },
//   { title: "Health Services", slug: "health-services" },
//   { title: "Housing And Lands", slug: "housing-and-lands" },
//   { title: "Identity Management", slug: "identity-management" },
//   { title: "Job Opportunities", slug: "job-opportunities" },
//   { title: "Law & Safety", slug: "law-safety" },
//   {
//     title: "License, Permits & Applications",
//     slug: "license-permits-applications",
//   },
//   { title: "Loans & Trustfund", slug: "loans-trustfund" },
//   { title: "Media & Entertainment", slug: "media-entertainment" },
//   { title: "Ministries", slug: "ministries" },
//   { title: "Notice", slug: "notice" },
//   { title: "Payments & Levies", slug: "payments-levies" },
//   { title: "Pilgrimage & Religion", slug: "pilgrimage-religion" },
//   { title: "Projects & Construction", slug: "projects-construction" },
//   { title: "Science & Technology", slug: "science-technology" },
//   { title: "Security Services", slug: "security-services" },
//   { title: "Sports", slug: "sports" },
//   { title: "Tax", slug: "tax" },
//   { title: "Tourism & Culture", slug: "tourism-culture" },
//   { title: "Training", slug: "training" },
//   { title: "Vehicle & Transportation", slug: "vehicle-transportation" },
//   { title: "Water", slug: "water" },
// ].map((s, index) => ({ ...s, id: index + 1, name: s.title }));

// export default function ServiceDetailPage() {
//   const { slug } = useParams();
//   const [activeTab, setActiveTab] = useState("Services");
//   const [query, setQuery] = useState("");
//   const [filteredServices, setFilteredServices] = useState([]);

//   // Get services under the same category slug
//   const categoryServices = SERVICES.filter((s) => s.slug === slug);

//   const slugString = Array.isArray(slug) ? slug[0] : slug;

//   const heading = categoryServices.length
//     ? slugString.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
//     : "Service Not Found";

//   useEffect(() => {
//     const servicesToShow =
//       activeTab === "All" ? SERVICES : SERVICES.filter((s) => s.slug === slug);

//     const result = servicesToShow.filter((service) =>
//       service.name.toLowerCase().includes(query.toLowerCase())
//     );

//     setFilteredServices(result);
//   }, [slug, activeTab, query]);

//   const renderTabContent = () => {
//     return (
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredServices.map((service) => (
//           <div
//             key={service.id}
//             className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col justify-between h-full"
//           >
//             {/* <h3 className="text-lg font-semibold text-gray-700">
//               {service.name}
//             </h3> */}
//             <p className="text-gray-600 text-sm sm:text-base md:text-[16px] mb-12">
//               {activeTab === "Services"
//                 ? `This card represents ${service.name}. What should I do if police tags me an internet fraudster because I have a car.`
//                 : `Learn about the ${service.name} service offered.`}
//             </p>

//             <div className="flex justify-between text-[11px] text-blue-600 font-semibold">
//               <Link href={`/services/${service.slug}`} className="uppercase">
//                 {service.name}
//               </Link>
//               <Link href={`/services/${service.slug}`}>FAQ</Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <main className="max-w-7xl mx-auto px-6 pt-[50px] pb-20">
//       {/* Dynamic Heading */}
//       <h1 className="text-[40px] font-bold text-center leading-tight mb-9">
//         {heading}
//       </h1>

//       {/* Search Bar */}
//       <div className="mt-[36px] flex flex-col items-center justify-center">
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           className="flex items-center bg-[#E9E9E9] rounded-[12px] w-full max-w-[529px] px-[7px]"
//         >
//           <input
//             type="text"
//             placeholder="Search Services..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="grow bg-transparent text-[13px] text-gray-800 focus:outline-none pl-[7px]"
//             style={{ borderRadius: "12px" }}
//           />
//           <button
//             type="submit"
//             className="text-gray-600 hover:text-black transition text-xl"
//           >
//             <img
//               src="/images/searchicon.png"
//               alt="Search"
//               className="w-[47px] h-[54px] object-contain"
//             />
//           </button>
//         </form>
//       </div>

//       {/* Tab Navigation */}
//       <div className="mt-9 w-full max-w-[529px] h-12 mx-auto mb-12">
//         <div className="flex h-full">
//           {TABS.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 h-full text-sm sm:text-base font-semibold transition duration-200 border-b-2 ${
//                 activeTab === tab
//                   ? "text-black border-black"
//                   : "text-black border-transparent hover:text-black hover:border-black"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tab Content */}
//       {renderTabContent()}
//     </main>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchAllServices } from "@/lib/clients/service.client";
import { fetchAllFaqs } from "@/lib/clients/faq.client";

const TABS = ["All", "Services", "FAQ"];

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("Services");
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allServices, allFaqs] = await Promise.all([
          fetchAllServices(),
          fetchAllFaqs(),
        ]);

        const slugStr = slug?.toString().toLowerCase();

        const matchedServices = allServices.filter(
          (s) => s.service_category?.Slug?.toLowerCase() === slugStr
        );

        const matchedFaqs = allFaqs.filter(
          (faq) => faq.faq_category?.Slug?.toLowerCase() === slugStr
        );

        console.log("Slug:", slugStr);
        console.log("Matched Services:", matchedServices);
        console.log("Matched FAQs:", matchedFaqs);

        setServices(matchedServices);
        setFaqs(matchedFaqs);
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
    slug
      ?.toString()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ??
    "Service";

  const filteredServices = services.filter((service) =>
    service.Name?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFaqs = faqs.filter((faq) =>
    faq.question?.toLowerCase().includes(query.toLowerCase())
  );

  const renderTabContent = () => {
    const showServices = activeTab === "All" || activeTab === "Services";
    const showFaqs = activeTab === "All" || activeTab === "FAQ";

    return (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showServices &&
          filteredServices.map((service) => (
            <div
              key={service.documentId}
              className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col justify-between h-full"
            >
              <p className="text-gray-600 text-[13px] mb-12">
                {service.Description ||
                  `Learn about the ${service.Name} service.`}
              </p>

              <div className="flex justify-between text-[11px] text-blue-600 font-semibold">
                <Link
                  href={`/services/${service.service_category?.Slug}?tab=services`}
                  className="uppercase"
                >
                  {service.Name}
                </Link>
                <Link
                  href={`/services/${service.service_category?.Slug}?tab=faq`}
                >
                  FAQ
                </Link>
              </div>
            </div>
          ))}

        {showFaqs &&
          filteredFaqs.map((faq) => (
            <div
              key={faq.documentId}
              className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col justify-between h-full"
            >
              <p className="text-gray-600 text-[13px] mb-12">{faq.question}</p>

              <div className="flex justify-between text-[11px] text-blue-600 font-semibold">
                <Link
                  href={`/services/${faq.faq_category?.Slug}?tab=services`}
                  className="uppercase"
                >
                  {heading}
                </Link>
                <Link href={`/services/${faq.faq_category?.Slug}?tab=faq`}>
                  {faq.question?.length > 18 ? "View FAQ" : faq.question}
                </Link>
              </div>
            </div>
          ))}

        {showFaqs && filteredFaqs.length === 0 && (
          <p className="col-span-full text-center text-[13px] text-gray-500">
            No FAQs found for this category.
          </p>
        )}
      </div>
    );
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
          className="flex items-center bg-[#E9E9E9] rounded-[12px] w-full max-w-[529px] px-[7px]"
        >
          <input
            type="text"
            placeholder="Search Services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow bg-transparent text-[13px] text-gray-800 focus:outline-none pl-[7px]"
            style={{ borderRadius: "12px" }}
          />
          <button
            type="submit"
            className="text-gray-600 hover:text-black transition text-xl"
          >
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
              onClick={() => setActiveTab(tab)}
              className={`flex-1 h-full text-sm sm:text-base font-semibold transition duration-200 border-b-2 ${
                activeTab === tab
                  ? "text-black border-black"
                  : "text-black border-transparent hover:text-black hover:border-black"
              }`}
            >
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
