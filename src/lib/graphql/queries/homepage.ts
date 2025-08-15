import { gql } from "@apollo/client";

export const HomepageQueries = {
  root: gql`
    query Homepage {
      homepage {
        documentId
        Banner {
          id
          title
          subtitle
          Statistics {
            id
            label
            value
          }
        }
        FAQ_Section {
          id
          faq_selection_criteria
          faqs {
            documentId
            question
            publishedAt
            faqAnswer
            action {
              name
              url
            }
            createdAt
            updatedAt
            publishedAt
            tags {
              name
            }
            faq_category {
              documentId
              Name
              Slug
              Description
              createdAt
              updatedAt
              publishedAt
            }
          }
        }
        SearchSection {
          id
          search_placeholder
          search_keywords {
            documentId
            keyword
            createdAt
            updatedAt
            publishedAt
          }
        }
        News_Articles_Grid {
          id
          news_selection_criteria
          selected_category {
            documentId
            name
            slug
            description
            createdAt
            updatedAt
            publishedAt
            articles {
              documentId
              title
              description
              slug
              Article_publish_date
              is_featured
              createdAt
              updatedAt
              publishedAt
              cover {
                url
              }
              category {
                name
              }
            }
          }
        }
        AgendaSection {
          headline
          outcomes
          vision
          agenda {
            id
            title
            subTitle
            description
            icon
            color
          }
        }
      }
    }
  `,

  footer: gql`
    query FooterSection {
      homepage {
        documentId
        FooterSection {
          FooterLinks {
            link
            name
            category
          }
        }
      }
    }
  `,
};
