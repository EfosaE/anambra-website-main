// lib/clients/searchKeyword.client.ts
import { SearchKeywordQueries } from "@/lib/graphql/queries/search-keyword";
import client from "@/lib/http";

export const fetchAllSearchKeywords = async () => {
  const { data } = await client.query({
    query: SearchKeywordQueries.root,
  });
  return data.searchKeywords;
};

export const fetchSearchKeywordById = async (documentId: string) => {
  const { data } = await client.query({
    query: SearchKeywordQueries.byId,
    variables: { documentId },
  });
  return data.searchKeyword;
};
