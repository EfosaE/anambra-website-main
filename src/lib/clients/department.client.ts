// lib/clients/department.client.ts
import { DepartmentQueries } from "@/lib/graphql/queries/department";
import client from "@/lib/http";
import { ApolloError } from "@apollo/client";
import { handleError } from "../utils/graphqlHelpers";

export const fetchAllDepartments = async () => {
  try {
    const { data } = await client.query({
      query: DepartmentQueries.root,
    });
    return data.departments;
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
    } else {
      console.error("Unknown error fetching departments:", error);
    }
    return null;
  }
};

export const fetchDepartmentById = async (documentId: string) => {
  try {
    const { data } = await client.query({
      query: DepartmentQueries.byId,
      variables: { documentId },
    });
    return data.department;
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
    } else {
      console.error("Unknown error fetching department by id:", error);
    }
    return null;
  }
};
