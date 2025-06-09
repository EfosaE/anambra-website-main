// lib/clients/page.client.ts
import { PageQueries } from "@/lib/graphql/queries/page";
import client from "@/lib/http";

export const fetchAllPages = async () => {
  const { data } = await client.query({
    query: PageQueries.root,
  });
  return data.pages;
};

export const fetchPageById = async (documentId: string) => {
  const { data } = await client.query({
    query: PageQueries.byId,
    variables: { documentId },
  });
  return data.page;
};
