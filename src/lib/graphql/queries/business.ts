// lib/api/endpoints/graphql/about.ts
import { gql } from "@apollo/client";

export const eodbQueries = {
  root: gql`
    query FetchEodbPage {
      businessPage {
        documentId
        Title
        councilMembers {
          name
          designation
          profile_picture {
            url
          }
        }
        introduction
        frontliners
        mandate
        objectives
        spotlight
        contactinfo {
          address
          email
          id
          phone
        }

        fees {
          Estate
          LGA
          cost {
            price
            type
            id
          }
        }
        saber_officials {
          designation_eodb
          designation_state
          id
          name
          type
        }
        requirement {
          Heading
          information
          documentId
          mda {
            name
            Slug
          }
          steps {
            number
            heading
            content
          }
        }
        mda_processes {
          Heading
          information
          documentId
          steps {
            number
            heading
            content
          }
        }
        stimulators {
          extras
          highlight
          id
        }
      }
    }
  `,
};
