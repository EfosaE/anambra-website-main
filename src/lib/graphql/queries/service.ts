// lib/api/endpoints/graphql/services.ts
import { gql } from "@apollo/client";

export const serviceQueries = {
  all: gql`
    query GetAllServices {
      services {
        documentId
        Name
        Description
        ServicesDetails
        createdAt
        updatedAt
        publishedAt
        service_category {
          documentId
          Name
          Slug
          Description
          createdAt
          updatedAt
          publishedAt
          services {
            documentId
            Name
            Description
            ServicesDetails
            createdAt
            updatedAt
            publishedAt
          }
        }
      }
    }
  `,
  byId: gql`
    query Service($documentId: ID!) {
      service(documentId: $documentId) {
        documentId
        Name
        Description
        ServicesDetails
        WebsiteLink
        email
        phone
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  categories: gql`
    query ServiceCategories {
      serviceCategories {
        documentId
        Name
        Slug
        Description
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
  byCategorySlug: gql`
    query ServicesByCategorySlug($slug: String!) {
      serviceCategories(where: { Slug: $slug }) {
        documentId
        Name
        Slug
      }
    }
  `,
};
