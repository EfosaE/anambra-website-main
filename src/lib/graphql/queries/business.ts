// lib/api/endpoints/graphql/about.ts
import { gql } from "@apollo/client";

export const eodbQueries = {
  root: gql`
    query BusinessPage($pagination: PaginationArg) {
      businessPage {
        title
        introduction
        objectives
        councilMembers(pagination: $pagination) {
          name
          position
          profile_picture {
            url
          }
        }
        mandate
        frontliners
        stimulators {
          highlight
          extras
          id
        }
        requirement {
          heading
          information
          documentId
          steps {
            number
            heading
            content
          }
        }
        mdaProcesses {
          heading
          information
          slug
          steps {
            number
            heading
            content
          }
        }
      }
    }
  `,
};
