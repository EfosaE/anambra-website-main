import { gql } from "@apollo/client";

export const UploadFileQueries = {
  root: gql`
    query FetchUploadFiles {
      uploadFiles {
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
  byId: gql`
    query FetchUploadFileById($documentId: ID!) {
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
