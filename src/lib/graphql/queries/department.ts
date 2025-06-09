import { gql } from "@apollo/client";

export const DepartmentQueries = {
  root: gql`
    query FetchDepartments {
      departments {
        documentId
        name
        Slug
        Description
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byId: gql`
    query FetchDepartmentById($documentId: ID!) {
      department(documentId: $documentId) {
        documentId
        name
        Slug
        Description
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
