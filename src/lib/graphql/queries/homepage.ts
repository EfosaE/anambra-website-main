import { gql } from "@apollo/client";

export const HomepageQueries = {
  root: gql`
    query Homepage {
      homepage {
        documentId
        createdAt
        updatedAt
        publishedAt
        Banner {
          id
          title
          subtitle
          Statistics {
            id
            label
            value
          }
          banner_image {
            alternativeText
            width
            url
            size
            name
            height
          }
        }
        FAQ_Section {
          id
          faq_selection_criteria
          faqs {
            documentId
            question
            faq_Published_Date
            FaqAnswer
            createdAt
            updatedAt
            publishedAt
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
        FoterSection {
          FooterLinks {
            link
            name
          }
        }
        Lens_Ease_Section {
          id
          lens_section_title
          lens_section_description
          lens_section_link
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
        IllustrationSection {
          id
          illustration_animation {
            alternativeText
            width
            url
            name
            height
          }
        }
      }
    }
  `,
};
