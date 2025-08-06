import { gql } from "@apollo/client";

export const GalleryQueries = {
  all: gql`
    query FetchImages($pagination: PaginationArg) {
      galleries {
        albums {
          albumName
          images(pagination: $pagination) {
            documentId
            alternativeText
            caption
            height
            mime
            name
            url
            width
            provider
            provider_metadata
            size
          }
        }
      }
    }
  `,
  byId: gql`
    query FetchImageById($documentId: ID!) {
      uploadFile(documentId: $documentId) {
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
  `,
};
