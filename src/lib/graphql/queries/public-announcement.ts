import { gql } from "@apollo/client";

export const publicAnnouncementQueries = {
  root: gql`
    query FetchPublicAnnouncements {
      publicAnnouncements {
        documentId
        title
        content
        priority
        announcement_time
        createdAt
        updatedAt
        publishedAt
        locale
      }
    }
  `,
  byId: gql`
    query FetchPublicAnnouncement($documentId: ID!) {
      publicAnnouncement(documentId: $documentId) {
        documentId
        title
        content
        priority
        announcement_time
        createdAt
        updatedAt
        publishedAt
        locale
      }
    }
  `,
};
