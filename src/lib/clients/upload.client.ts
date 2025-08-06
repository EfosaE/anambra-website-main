// lib/clients/uploadFile.client.ts
import { GalleryQueries } from "@/lib/graphql/queries/upload";
import client from "@/lib/http";

export const fetchAllImages = async () => {
  const { data } = await client.query({
    query: GalleryQueries.all,
  });
  return data.galleries;
};

export const fetchImageById = async (documentId: string) => {
  const { data } = await client.query({
    query: GalleryQueries.byId,
    variables: { documentId },
  });
  return data.uploadFile;
};
