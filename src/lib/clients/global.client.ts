// lib/clients/global.client.ts
import { GlobalQueries } from "@/lib/graphql/queries/global";
import client from "@/lib/http";

export const fetchGlobalData = async () => {
  const { data } = await client.query({
    query: GlobalQueries.root,
  });
  return data.global;
};
