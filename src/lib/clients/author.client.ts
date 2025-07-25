// lib/clients/author.client.ts
import { AuthorQueries } from "@/lib/graphql/queries/author";
import client from "@/lib/http";
import { ApolloError } from "@apollo/client";
import { logApolloError } from "../utils/graphqlHelpers";

export const fetchAllAuthors = async () => {
  try {
    const { data } = await client.query({
      query: AuthorQueries.root,
    });
    return data.authors;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching authors:", error);
    }
    return null;
  }
};

export const fetchAuthorById = async (documentId: string) => {
  try {
    const { data } = await client.query({
      query: AuthorQueries.byId,
      variables: { documentId },
    });
    return data.author;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching author by id:", error);
    }
    return null;
  }
};
