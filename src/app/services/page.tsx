"use client";

import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ServiceCard from "@/components/services/servicecard";

type ServiceCategory = {
  Name: string;
  Slug: string;
  documentId: string;
  Description: string;
};

const FETCH_SERVICE_CATEGORIES = gql`
  query ServiceCategories {
    serviceCategories {
      documentId
      Name
      Slug
      Description
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

export default function ServicesPage() {
  const [query, setQuery] = useState("");

  const { data, loading, error } = useQuery<{
    serviceCategories: ServiceCategory[];
  }>(FETCH_SERVICE_CATEGORIES);

  const categories = data?.serviceCategories ?? [];

  const filtered = categories.filter((cat) =>
    cat.Name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 pt-[50px] pb-20">
      <h1 className="mt-[50px] text-[30px] sm:text-[40px] font-bold text-center mb-10">
        All Services
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col items-center justify-center mb-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center bg-[#E9E9E9] rounded-[12px] mb-4 w-full max-w-[611px] px-[7px]">
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
            className="text-gray-600 hover:text-black transition text-xl">
            <img
              src="/images/searchicon.png"
              alt="Search"
              className="w-[47px] h-[54px] object-contain"
            />
          </button>
        </form>
      </div>

      {/* Result State */}
      {loading ? (
        <p className="text-center mt-10 text-[13px]">Loading services...</p>
      ) : error ? (
        <p className="text-center mt-10 text-[13px] text-red-500">
          Failed to load service categories.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((category) => (
            <ServiceCard
              key={category.documentId}
              title={category.Name}
              slug={category.Slug}
              description={category.Description}
            />
          ))}
        </div>
      )}
    </main>
  );
}
