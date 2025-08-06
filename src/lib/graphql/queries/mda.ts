import { gql } from "@apollo/client";

export const MdaQueries = {
  byType: gql`
    query MdasByType($filters: MdaFiltersInput) {
      mdas(filters: $filters) {
        name
        Slug
        Mandate
        Functions
        websitelink
        type
        icon {
          url
        }
        Officials {
          designation
          name
          Contact {
            email
            phone
          }
          profile_picture {
            url
            width
            height
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

        MdaContact {
          address
          email
          phone
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
