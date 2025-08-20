// lib/api/endpoints/graphql/about.ts
import { gql } from "@apollo/client";

export const ansecQueries = {
  root: gql`
    query Officials(
      $filters: OfficialFiltersInput
      $pagination: PaginationArg
    ) {
      officials(filters: $filters, pagination: $pagination) {
        designations {
          name
        }
        name
        position
        contactInfo {
          email
        }
        profile_picture {
          url
        }
      }
    }
  `,
};
