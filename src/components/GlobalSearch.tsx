"use client";

import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { FiSearch } from "react-icons/fi";
import SearchResultGrid, { SearchResultWrapper } from "./SearchResultGrid";
import { logApolloError } from "@/lib/utils/graphqlHelpers";
import { SearchKeywordQueries } from "@/lib/graphql/queries/search-keyword";

// You can make this a proper GraphQL query typed with your schema
// but I'll assume `SearchKeywordQueries.byQuery` is already set up

export default function GlobalSearch({ query }: { query: string }) {
  // Only run the query if at least 1 chars entered
  const shouldSearch = query.trim().length >= 1;

  const { data, loading, error } = useQuery(SearchKeywordQueries.byQuery, {
    variables: {
      filters: {
        question: {
          containsi: query,
        },
      },
      servicesFilters2: {
        Name: {
          containsi: query,
        },
      },
    },
    skip: !shouldSearch, // ✅ prevent firing if query is too short
    fetchPolicy: "no-cache",
  });

  // Normalize response into SearchResultWrapper
  const results: SearchResultWrapper | null = useMemo(() => {
    if (!data) return null;
    return {
      articles: data.articles ?? [],
      faqs: data.faqs ?? [],
      services: data.services ?? [],
    };
  }, [data]);

  // Handle errors (log + UI message)
  if (error) {
    logApolloError(error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      {error ? (
        <div className="text-center text-red-500 py-12">
          An error occurred while fetching search results. Please try again.
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-6 h-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
        </div>
      ) : !shouldSearch ? (
        <div className="text-center text-gray-500 py-12">
          Start typing to explore articles, services, and FAQs.
        </div>
      ) : results &&
        results.articles?.length === 0 &&
        results.faqs.length === 0 &&
        results.services.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No results found. Try a different keyword.
        </div>
      ) : results ? (
        <SearchResultGrid results={results} />
      ) : null}
    </section>
  );
}
