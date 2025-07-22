import { gql } from "@apollo/client";

export const FaqQueries = {
  root: gql`
    query FetchFaqs {
      faqs {
        documentId
        question
        # publishedAt
        FaqAnswer
        createdAt
        updatedAt
        publishedAt
        faq_category {
          Name
          Slug
        }
      }
    }
  `,
  byId: gql`
    query FetchFaqById($documentId: ID!) {
      faq(documentId: $documentId) {
        documentId
        question
        # publishedAt
        FaqAnswer
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
