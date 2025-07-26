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
  byTag: gql`
    query SearchKeywords($filters: SearchKeywordFiltersInput) {
      searchKeywords(filters: $filters) {
        documentId
        keyword
        articles {
          __typename
          documentId
          title
        }
        faqs {
          __typename
          documentId
          question
          FaqAnswer
        }
        services {
          __typename
          documentId
          Name
          Description
        }
      }
    }
  `,
};
