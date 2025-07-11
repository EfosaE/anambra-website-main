// lib/api/endpoints/graphql/about.ts
import { gql } from "@apollo/client";

export const aboutQueries = {
  root: gql`
    query FetchAbout {
      about {
        title
        blocks {
          ... on ComponentSharedMedia {
            file {
              url
              width
              height
              mime
            }
          }
          ... on ComponentSharedRichText {
            body
          }
          ... on ComponentSharedSlider {
            files {
              url
              width
              height
            }
          }
        }
      }
    }
  `,
};
