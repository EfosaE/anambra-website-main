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
          faqAnswer
          tags {
            name
          }
          action {
            name
            url
          }
        }
        services {
          __typename
          documentId
          Name
          Description
          websiteLink
          contactInfo {
            email
            address
            phone
          }
        }
      }
    }
  `,

  byQuery: gql`
    query FetchByQuery(
      $filters: FaqFiltersInput
      $servicesFilters2: ServiceFiltersInput
    ) {
      faqs(filters: $filters) {
        documentId
        question
        faqAnswer
        tags {
          name
        }
        action {
          name
          url
        }
      }
      services(filters: $servicesFilters2) {
        documentId
        Name
        Description
        websiteLink
        contactInfo {
          email
          address
          phone
        }
      }
    }
  `,
};
