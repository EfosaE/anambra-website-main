import { gql } from "@apollo/client";

export const PageQueries = {
  root: gql`
    query FetchPages {
      pages {
        documentId
        Title
        Slug
        Content
        Published_Time
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byId: gql`
    query FetchPageById($documentId: ID!) {
      page(documentId: $documentId) {
        documentId
        Title
        Slug
        Content
        Published_Time
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
