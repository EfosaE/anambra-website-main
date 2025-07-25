// graphql/SearchKeywordQueries.ts
import { gql } from "@apollo/client";

export const SearchKeywordQueries = {
  byKeyword: gql`
    query SearchKeywords($filters: SearchKeywordFiltersInput) {
      searchKeywords(filters: $filters) {
        documentId
        keyword
        articles {
          __typename
          documentId
          title
        }
        faqs {
          __typename
          documentId
          question
          FaqAnswer
        }
        services {
          __typename
          documentId
          Name
          Description
        }
      }
    }
  `,
};
