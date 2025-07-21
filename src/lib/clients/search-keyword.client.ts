// lib/clients/searchKeyword.client.ts
import { SearchKeywordQueries } from "@/lib/graphql/queries/search-keyword";
import client from "@/lib/http";

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
