// lib/clients/service.client.ts
import client from "@/lib/http";
import { serviceQueries } from "@/lib/graphql/queries/service";
import { CategoryQueries } from "../graphql/queries/category";

export const fetchAllServices = async () => {
  const { data } = await client.query({ query: serviceQueries.all });
  return data.services;
};

export const fetchServiceById = async (id: string) => {
  const { data } = await client.query({
    query: serviceQueries.byId,
    variables: { id },
  });
  return data.service;
};

export const fetchServiceCategories = async () => {
  const { data } = await client.query({ query: serviceQueries.categories });
  return data.serviceCategories;
};

export const fetchCategoryById = async (documentId: string) => {
  const { data } = await client.query({
    query: CategoryQueries.byId,
    variables: { documentId },
  });
  return data.category;
};
