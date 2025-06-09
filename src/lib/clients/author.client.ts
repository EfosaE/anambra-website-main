// lib/clients/author.client.ts
import { AuthorQueries } from "@/lib/graphql/queries/author";
import client from "@/lib/http";

export const fetchAllAuthors = async () => {
  const { data } = await client.query({
    query: AuthorQueries.root,
  });
  return data.authors;
};

export const fetchAuthorById = async (documentId: string) => {
  const { data } = await client.query({
    query: AuthorQueries.byId,
    variables: { documentId },
  });
  return data.author;
};
