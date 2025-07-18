// lib/clients/tag.client.ts
import { TagQueries } from "@/lib/graphql/queries/tag";
import client from "@/lib/http";
import { ApolloError } from "@apollo/client";
import { handleError } from "../utils/graphqlHelpers";

export const fetchAllTags = async () => {
  try {
    const { data } = await client.query({
      query: TagQueries.root,
    });
    return data.tags;
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
    } else {
      console.error("Unknown error fetching tags:", error);
    }
    return null;
  }
};

export const fetchTagById = async (documentId: string) => {
  try {
    const { data } = await client.query({
      query: TagQueries.byId,
      variables: { documentId },
    });
    return data.tag;
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
    } else {
      console.error("Unknown error fetching tag by id:", error);
    }
    return null;
  }
};
