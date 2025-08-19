// lib/api/endpoints/graphql/articles.ts
import { gql } from "@apollo/client";

export const articleQueries = {
  all: gql`
    query FetchAllArticles {
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
          alternativeText
          ext
          documentId
          height
          mime
          name
          size
          url
          width
        }
        tags {
          description
          name
          slug
          documentId
          services {
            Name
          }
        }
      }
    }
  `,
  bySlug: gql`
    query FetchArticleBySlug($slug: String!) {
      articles(filters: { slug: { eqi: $slug } }) {
        title
        description
        Article_publish_date
        cover {
          url
          alternativeText
        }
        tags {
          name
        }
        blocks {
          ... on ComponentSharedRichText {
            body
          }
          ... on ComponentSharedMedia {
            file {
              url
            }
          }
          ... on ComponentSharedQuote {
            body
          }
        }
      }
    }
  `,
};

// query Article($documentId: ID!) {
//   article(documentId: $documentId) {
//     documentId
//     title
//     description
//     slug
//     Article_publish_date
//     is_featured
//     createdAt
//     updatedAt
//     publishedAt
//     cover {
//       documentId
//       name
//       alternativeText
//       caption
//       width
//       height
//       formats
//       hash
//       ext
//       mime
//       size
//       url
//       previewUrl
//       provider
//       provider_metadata
//       createdAt
//       updatedAt
//       publishedAt
//     }
//   }

// }
