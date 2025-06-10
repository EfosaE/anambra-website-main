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
