"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { FiSearch } from "react-icons/fi";
import { fetchContentBySearchKeyword } from "@/lib/clients/search-keyword.client";
import SearchResultGrid, { SearchResultWrapper } from "./SearchResultGrid";

export default function GlobalSearch({ query }: { query: string }) {
  const [result, setResult] = useState<SearchResultWrapper[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("RESULT", result);
  }, [result]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const search = async () => {
        setError(null);
        setIsLoading(true);

        try {
          console.log("query", query);

          if (query.trim().length >= 2) {
            const data = await fetchContentBySearchKeyword(query);
            setResult(data);
          } else {
            setResult(null);
          }
        } catch (error) {
          setError(error);
          console.error("Search failed:", error);
          // Optional: display an error message to the user
          setResult(null); // Or set to [] if you prefer
        } finally {
          setIsLoading(false);
        }
      };

      search();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      {error ? (
        <div className="text-center text-red-500 py-12">
          An error occurred while fetching search results. Please try again.
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-6 h-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
        </div>
      ) : query.trim().length < 2 ? (
        <div className="text-center text-gray-500 py-12">
          Start typing to explore articles, services, and FAQs.
        </div>
      ) : result && result.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No results found. Try a different keyword.
        </div>
      ) : result ? (
        <SearchResultGrid results={result} />
      ) : null}
    </section>
  );
}
