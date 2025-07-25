// lib/clients/service.client.ts
import client from "@/lib/http";
import { serviceQueries } from "@/lib/graphql/queries/service";
import { CategoryQueries } from "../graphql/queries/category";
import { ApolloError } from "@apollo/client";
import { logApolloError } from "../utils/graphqlHelpers";
import { Service } from "@/types/graphql/service";

export const fetchAllServices = async () => {
  try {
    const { data } = await client.query({ query: serviceQueries.all });
    return data.services;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching services:", error);
    }
    return null;
  }
};

export const fetchServiceById = async (id: string): Promise<Service | null> => {
  try {
    const { data } = await client.query({
      query: serviceQueries.byId,
      variables: { documentId: id },
    });
    return data.service;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching service by id:", error);
    }
    return null;
  }
};

export const fetchServiceCategories = async () => {
  try {
    const { data } = await client.query({ query: serviceQueries.categories });
    return data.serviceCategories;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching service categories:", error);
    }
    return null;
  }
};

export const fetchCategoryById = async (documentId: string) => {
  try {
    const { data } = await client.query({
      query: CategoryQueries.byId,
      variables: { documentId },
    });
    return data.category;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching category by id:", error);
    }
    return null;
  }
};
