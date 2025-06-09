// lib/clients/publicAnnouncement.client.ts
import { publicAnnouncementQueries } from "@/lib/graphql/queries/public-announcement";
import client from "@/lib/http";

export const fetchAllPublicAnnouncements = async () => {
  const { data } = await client.query({
    query: publicAnnouncementQueries.root,
  });
  return data.publicAnnouncements;
};

export const fetchPublicAnnouncementById = async (documentId: string) => {
  const { data } = await client.query({
    query: publicAnnouncementQueries.byId,
    variables: { documentId },
  });
  return data.publicAnnouncement;
};
