import { gql } from "@apollo/client";

export const AuthorQueries = {
  root: gql`
    query FetchAuthors {
      authors {
        documentId
        name
        email
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byId: gql`
    query FetchAuthorById($documentId: ID!) {
      author(documentId: $documentId) {
        documentId
        name
        email
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
