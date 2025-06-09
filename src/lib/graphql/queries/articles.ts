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
          Description
          Name
          Slug
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
      articles(filters: { slug: { eq: $slug } }) {
        title
        description
        Article_publish_date
        cover {
          url
          alternativeText
        }
        tags {
          Name
        }
        cover {
          documentId
          name
          alternativeText
          caption
          width
          height
          formats
          hash
          ext
          mime
          size
          url
          previewUrl
          provider
          provider_metadata
          createdAt
          updatedAt
          publishedAt
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
