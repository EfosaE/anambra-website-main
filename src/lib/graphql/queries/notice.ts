import { gql } from "@apollo/client";

export const NoticeQueries = {
  root: gql`
    query FetchNotices {
      notices {
        documentId
        title
        description
        date
        URL
        Homepage
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byId: gql`
    query FetchNoticeById($documentId: ID!) {
      notice(documentId: $documentId) {
        documentId
        title
        description
        date
        URL
        Homepage
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
