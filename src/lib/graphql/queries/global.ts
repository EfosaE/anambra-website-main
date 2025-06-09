import { gql } from "@apollo/client";

export const GlobalQueries = {
  root: gql`
    query FetchGlobal {
      global {
        documentId
        siteName
        siteDescription
        createdAt
        updatedAt
        publishedAt
      }
    }
  `,
};
