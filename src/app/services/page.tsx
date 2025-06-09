// "use client";

// import ServiceCard from "@/components/services/servicecard";
// import { useState } from "react";

// const services = [
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
// ];

// export default function ServicesPage() {
//   const [query, setQuery] = useState("");

//   return (
//     <main className="max-w-7xl mx-auto px-4 pt-[50px] pb-20">
//       <h1 className="mt-[50px] text-[40px] font-bold text-center mb-10">
//         All Services
//       </h1>

//       {/* Search Bar */}
//       <div className="flex flex-col items-center justify-center mb-10">
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           className="flex items-center bg-[#E9E9E9] rounded-[12px] mb-4 w-full max-w-[611px] px-[7px]"
//         >
//           <input
//             type="text"
//             placeholder="Search Services..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="grow bg-transparent text-[13px] text-gray-800 focus:outline-none pl-[4px]"
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

//       {/* Grid of Service Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//         {services
//           .filter((service) =>
//             service.title.toLowerCase().includes(query.toLowerCase())
//           )
//           .map((service) => (
//             <ServiceCard key={service.slug} {...service} />
//           ))}
//       </div>
//     </main>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import ServiceCard from "@/components/services/servicecard";
import { fetchServiceCategories } from "@/lib/clients/service.client";

type ServiceCategory = {
  Name: string;
  Slug: string;
  documentId: string;
  Description: string;
};

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await fetchServiceCategories();
        setCategories(result);
      } catch (err: any) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load service categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-[13px]">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-[13px]">{error}</p>;

  return (
    <main className="max-w-7xl mx-auto px-4 pt-[50px] pb-20">
      <h1 className="mt-[50px] text-[30px] sm:text-[40px] font-bold text-center mb-10">
        All Services
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col items-center justify-center mb-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center bg-[#E9E9E9] rounded-[12px] mb-4 w-full max-w-[611px] px-[7px]"
        >
          <input
            type="text"
            placeholder="Search Services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow bg-transparent text-[13px] text-gray-800 focus:outline-none pl-[4px]"
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

      {/* Grid of Service Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories
          .filter((category) =>
            category.Name.toLowerCase().includes(query.toLowerCase())
          )
          .map((category) => (
            <ServiceCard
              key={category.documentId}
              title={category.Name}
              slug={category.Slug}
              description={category.Description}
            />
          ))}
      </div>
    </main>
  );
}
