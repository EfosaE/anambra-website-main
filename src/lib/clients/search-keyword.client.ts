// lib/clients/searchKeyword.client.ts
import { SearchKeywordQueries } from "@/lib/graphql/queries/search-keyword";
import client from "@/lib/http";
import { FAQ } from "@/types/graphql/faq";
import { Service } from "@/types/graphql/service";

// export const fetchAllSearchKeywords = async () => {
//   const { data } = await client.query({
//     query: SearchKeywordQueries.root,
//   });
//   return data.searchKeywords;
// };

// export const fetchSearchKeywordById = async (documentId: string) => {
//   const { data } = await client.query({
//     query: SearchKeywordQueries.byId,
//     variables: { documentId },
//   });
//   return data.searchKeyword;
// };

export const fetchContentBySearchKeyword = async (text: string) => {
  const { data } = await client.query({
    query: SearchKeywordQueries.byKeyword,
    variables: {
      filters: {
        keyword: {
          containsi: text,
        },
      },
    },
    fetchPolicy: "no-cache", // Optional: avoid caching while typing
  });

  return data.searchKeywords;
};

type FetchContentResponse = {
  faqs: FAQ[];
  services: Service[];
};

export const fetchContentByQuery = async (
  query: string
): Promise<FetchContentResponse> => {
  const { data } = await client.query({
    query: SearchKeywordQueries.byQuery,
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
    fetchPolicy: "no-cache", // Optional: avoid caching while typing
  });

  return {
    faqs: data?.faqs ?? [],
    services: data?.services ?? [],
  };
};

