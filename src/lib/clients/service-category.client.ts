// lib/clients/category.client.ts
import { CategoryQueries } from "@/lib/graphql/queries/service-category";
import client from "@/lib/http";

export const fetchAllCategories = async () => {
  const { data } = await client.query({
    query: CategoryQueries.root,
  });
  return data.categories;
};

export const fetchCategoryById = async (documentId: string) => {
  const { data } = await client.query({
    query: CategoryQueries.byId,
    variables: { documentId },
  });
  return data.category;
};
