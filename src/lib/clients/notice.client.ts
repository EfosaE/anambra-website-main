// lib/clients/notice.client.ts
import { NoticeQueries } from "@/lib/graphql/queries/notice";
import client from "@/lib/http";

export const fetchAllNotices = async () => {
  const { data } = await client.query({
    query: NoticeQueries.root,
  });
  return data.notices;
};

export const fetchNoticeById = async (documentId: string) => {
  const { data } = await client.query({
    query: NoticeQueries.byId,
    variables: { documentId },
  });
  return data.notice;
};
