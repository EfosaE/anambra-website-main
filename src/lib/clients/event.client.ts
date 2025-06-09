// lib/clients/event.client.ts
import { EventQueries } from "@/lib/graphql/queries/event";
import client from "@/lib/http";

export const fetchAllEvents = async () => {
  const { data } = await client.query({
    query: EventQueries.root,
  });
  return data.events;
};

export const fetchEventBySlug = async (slug: string) => {
  const { data } = await client.query({
    query: EventQueries.bySlug,
    variables: { slug },
  });
  return data.events[0];
};

export const fetchEventById = async (documentId: string) => {
  const { data } = await client.query({
    query: EventQueries.byId,
    variables: {
      documentId, // <- make sure this is a string
    },
  });

  return data.event;
};
