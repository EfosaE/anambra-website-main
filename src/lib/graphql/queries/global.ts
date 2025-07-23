import { gql } from "@apollo/client";

export const GlobalQueries = {
  root: gql`
    query Global($status: PublicationStatus) {
      global(status: $status) {
        documentId
        siteName
        favicon {
          url
          name
          height
          width
        }
        siteDescription
        defaultSeo {
          metaDescription
          metaTitle
        }
      }
    }
  `,
};
