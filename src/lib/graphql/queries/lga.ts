// lib/api/endpoints/graphql/about.ts
import { gql } from "@apollo/client";

export const lgaQueries = {
  root: gql`
    query LgaPage {
      lgaPage {
        lgas
      }
    }
  `,
};
