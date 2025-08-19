"use client";

import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Spinner from "@/components/Spinner";
import ServiceCategoryCard from "@/components/services/ServiceCategoryCard";

type ServiceCategory = {
  Name: string;
  Slug: string;
  documentId: string;
  Description: string;
};

const FETCH_SERVICE_CATEGORIES = gql`
  query ServiceCategories($pagination: PaginationArg) {
    serviceCategories(pagination: $pagination) {
      documentId
      Name
      Slug
      Description
    }
  }
`;

export default function ServicesPage() {
  const [query, setQuery] = useState("");

  const { data, loading, error } = useQuery<{
    serviceCategories: ServiceCategory[];
  }>(FETCH_SERVICE_CATEGORIES, {
    variables: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  const categories = data?.serviceCategories ?? [];

  const filtered = categories.filter((cat) =>
    cat.Name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 pt-[50px] pb-20">
      <h1 className="text-[30px] sm:text-[40px] font-bold text-center mb-10">
        All Services
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-9">
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
              style={{ borderRadius: "12px" }}
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

      {/* Result State */}
      {loading ? (
        <Spinner size={40} position="top" />
      ) : error ? (
        <p className="text-center mt-10 text-[13px] text-red-500">
          Failed to load service categories.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {filtered.map((category) => (
            <div key={category.documentId} className="h-full">
              <ServiceCategoryCard
                title={category.Name}
                slug={category.Slug}
                description={category.Description}
                className="h-full flex flex-col" // make card stretch
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
