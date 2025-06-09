import { gql } from "@apollo/client";

export const MdaQueries = {
  root: gql`
    query Mdas {
      mdas {
        documentId
        name
        Slug
        Mandate
        Functions
        createdAt
        updatedAt
        publishedAt
        Officials {
          Contact {
            image {
              file {
                alternativeText
                url
                width
                height
              }
            }
          }
        }
        departments {
          name
          Description
          documentId
          Slug
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  `,

  byId: gql`
    query FetchCategoryById($documentId: ID!) {
      mda(documentId: $documentId) {
        documentId
        name
        Slug
        Mandate
        Functions
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
