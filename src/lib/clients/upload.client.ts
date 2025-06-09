// lib/clients/uploadFile.client.ts
import { UploadFileQueries } from "@/lib/graphql/queries/upload";
import client from "@/lib/http";

export const fetchAllUploadFiles = async () => {
  const { data } = await client.query({
    query: UploadFileQueries.root,
  });
  return data.uploadFiles;
};

export const fetchUploadFileById = async (documentId: string) => {
  const { data } = await client.query({
    query: UploadFileQueries.byId,
    variables: { documentId },
  });
  return data.uploadFile;
};
