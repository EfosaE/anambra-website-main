import client from "@/lib/http";
import { CategoryQueries } from "@/lib//graphql/queries/category";

export const fetchAuthor = async () => {
  const { data } = await client.query({ query: CategoryQueries.root });
  return data.categories;
};

export const fetchAuthorById = async (id: string) => {
  const { data } = await client.query({
    query: CategoryQueries.byId,
    variables: { id },
  });
  return data.category;
};
