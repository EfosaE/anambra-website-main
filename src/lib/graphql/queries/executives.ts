// lib/api/endpoints/graphql/about.ts
import { gql } from "@apollo/client";

export const ansecQueries = {
  root: gql`
    query Officials($filters: OfficialFiltersInput) {
      officials(filters: $filters) {
        designations {
          name
        }
        details {
          name
          id
          position
          Contact {
            email
          }
          profile_picture {
            url
          }
        }
      }
    }
  `,
};
