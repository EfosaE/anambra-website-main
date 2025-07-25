"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Spinner from "@/components/Spinner";
import MdaCard from "@/components/mda/MdaCard";
import { Mda } from "@/types/graphql/mda";
import { useQuery } from "@apollo/client";
import { MdaQueries } from "@/lib/graphql/queries/mda";
import { logApolloError } from "@/lib/utils/graphqlHelpers";
import ErrorWithRetry from "@/components/ErrorWithRetry";

const categories = ["Ministry", "Agency"];

export default function MdasPage() {
  const [selectedCategory, setSelectedCategory] = useState("Ministry");
  const [query, setQuery] = useState("");

  const { data, loading, error, refetch } = useQuery<{
    mdas: Mda[];
  }>(MdaQueries.byType, {
    variables: {
      filters: {
        type: {
          eqi: selectedCategory,
        },
      },
    },
  });

  if (error) {
    logApolloError(error);
  }

  const allMdas = data?.mdas || [];

  const filteredMdas = query.trim()
    ? allMdas.filter((mda) =>
        mda.name.toLowerCase().includes(query.toLowerCase())
      )
    : allMdas;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="mt-[50px] text-[30px] md:text-[40px] font-bold text-black">
          MDAs
        </h2>
      </div>

      {/* Categories + Search */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="flex gap-6 border-b border-gray-300 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                "pb-2 text-sm font-semibold transition",
                selectedCategory === category
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-black hover:text-blue-600"
              )}>
              {category}
            </button>
          ))}
        </div>

        <form className="flex items-center bg-[#E9E9E9] rounded-[12px] h-12 w-full max-w-xl">
          <input
            type="text"
            placeholder="Search MDAs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow bg-transparent pl-[10px] text-sm text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="text-gray-600 hover:text-black transition text-xl pr-[6px]"
            onClick={(e) => e.preventDefault()}>
            <img
              src="/images/searchicon.png"
              alt="Search"
              className="w-[47px] h-[54px] object-contain"
            />
          </button>
        </form>
      </div>

      {/* Cards or Spinner or No Results */}
      {loading ? (
        <Spinner size={40} position="top" />
      ) : error ? (
        <ErrorWithRetry
          error={error}
          onRetry={() => refetch()}
          message="Failed to load MDAs"
        />
      ) : filteredMdas.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-600">
            {query.trim()
              ? `No MDAs found for "${query}"`
              : "No MDAs available in this category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMdas.map((mda) => (
            <MdaCard key={mda.documentId} mda={mda} />
          ))}
        </div>
      )}
    </main>
  );
}
