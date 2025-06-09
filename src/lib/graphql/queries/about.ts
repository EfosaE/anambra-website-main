// lib/api/endpoints/graphql/about.ts
import { gql } from "@apollo/client";

export const aboutQueries = {
  root: gql`
    query FetchAbout {
      about {
        title
        content
      }
    }
  `,
};
