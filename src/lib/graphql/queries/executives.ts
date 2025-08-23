// lib/api/endpoints/graphql/about.ts
import { gql } from "@apollo/client";

export const ansecQueries = {
  root: gql`
    query Officials(
      $filters: OfficialFiltersInput
      $pagination: PaginationArg, $sort: [String]
    ) {
      officials(filters: $filters, pagination: $pagination, sort: $sort) {
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
