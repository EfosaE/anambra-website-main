"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { FiSearch } from "react-icons/fi";
import { fetchContentBySearchKeyword } from "@/lib/clients/search-keyword.client";
import SearchResultGrid, { SearchResultWrapper } from "./SearchResultGrid";

export default function GlobalSearch({ query }: { query: string }) {
  const [result, setResult] = useState<SearchResultWrapper[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("RESULT", result);
  }, [result]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const search = async () => {
        setIsLoading(true); // ✅ Trigger loading after debounce delay

        console.log("query", query);
        if (query.trim().length >= 2) {
          const data = await fetchContentBySearchKeyword(query);
          setResult(data);
        } else {
          setResult(null);
        }

        setIsLoading(false); // ✅ Always stop loading
      };

      search();
    }, 400); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      {isLoading ? (
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
