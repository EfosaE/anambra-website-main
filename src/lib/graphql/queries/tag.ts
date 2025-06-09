import { gql } from "@apollo/client";

export const TagQueries = {
  root: gql`
    query FetchTags {
      tags {
        documentId
        Name
        Description
        Slug
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byId: gql`
    query FetchTagById($documentId: ID!) {
      tag(documentId: $documentId) {
        documentId
        Name
        Description
        Slug
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
