// lib/clients/tag.client.ts
import { TagQueries } from "@/lib/graphql/queries/tag";
import client from "@/lib/http";

export const fetchAllTags = async () => {
  const { data } = await client.query({
    query: TagQueries.root,
  });
  return data.tags;
};

export const fetchTagById = async (documentId: string) => {
  const { data } = await client.query({
    query: TagQueries.byId,
    variables: { documentId },
  });
  return data.tag;
};
