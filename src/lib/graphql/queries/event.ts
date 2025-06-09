import { gql } from "@apollo/client";

export const EventQueries = {
  root: gql`
    query FetchEvents {
      events {
        documentId
        title
        date
        time
        location
        description
        link
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byId: gql`
    query FetchEventById($documentId: ID!) {
      event(documentId: $documentId) {
        documentId
        title
        date
        time
        location
        description
        link
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  bySlug: gql`
    query FetchEventBySlug($slug: String!) {
      events(filters: { slug: { eq: $slug } }) {
        documentId
        title
        date
        time
        location
        description
        link
        slug
        cover {
          url
          alternativeText
        }
      }
    }
  `,
};
