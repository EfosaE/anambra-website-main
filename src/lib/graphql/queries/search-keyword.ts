// graphql/SearchKeywordQueries.ts
import { gql } from "@apollo/client";

export const SearchKeywordQueries = {
  byKeyword: gql`
    query SearchKeywords($filters: SearchKeywordFiltersInput) {
      searchKeywords(filters: $filters) {
        documentId
        keyword
        articles {
          title
        }
        faqs {
          question
          FaqAnswer
        }
        services {
          Name
          Description
        }
      }
    }
  `,
};
