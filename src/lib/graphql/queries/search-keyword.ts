import { gql } from "@apollo/client";

export const SearchKeywordQueries = {
  root: gql`
    query FetchSearchKeywords {
      searchKeywords {
        documentId
        keyword
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byId: gql`
    query SearchKeywordById($documentId: ID!) {
      searchKeyword(documentId: $documentId) {
        documentId
        keyword
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
