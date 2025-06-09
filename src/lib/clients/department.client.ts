// lib/clients/department.client.ts
import { DepartmentQueries } from "@/lib/graphql/queries/department";
import client from "@/lib/http";

export const fetchAllDepartments = async () => {
  const { data } = await client.query({
    query: DepartmentQueries.root,
  });
  return data.departments;
};

export const fetchDepartmentById = async (documentId: string) => {
  const { data } = await client.query({
    query: DepartmentQueries.byId,
    variables: { documentId },
  });
  return data.department;
};
