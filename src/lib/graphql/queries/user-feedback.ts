import { gql } from "@apollo/client";

export const UserFeedbackQueries = {
  root: gql`
    query FetchCategories {
      userFeedbacks {
        documentId
        name
        email
        message
        feedback_status
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byId: gql`
    query FetchUserFeedbackById($documentId: ID!) {
      userFeedback(documentId: $documentId) {
        documentId
        name
        email
        message
        feedback_status
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
