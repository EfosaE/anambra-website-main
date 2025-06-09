import { gql } from "@apollo/client";

export const CategoryQueries = {
  root: gql`
    query FetchCategories {
      categories {
        documentId
        name
        slug
        description
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byId: gql`
    query FetchCategoryById($documentId: ID!) {
      category(documentId: $documentId) {
        documentId
        name
        slug
        description
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
