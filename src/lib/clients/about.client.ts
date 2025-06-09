// lib/clients/about.client.ts
import client from "@/lib/http";
import { aboutQueries } from "@/lib/graphql/queries/about";

export const fetchAbout = async () => {
  const { data } = await client.query({ query: aboutQueries.root });
  return data.about;
};
