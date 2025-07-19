// lib/api/endpoints/graphql/about.ts
import { gql } from "@apollo/client";

export const ansecQueries = {
  root: gql`
    query FetchExecutiveCouncil {
      about {
        executive_council {
          designation
          name
          profile_picture {
            url
            width
            height
          }
        }
      }
    }
  `,
};
