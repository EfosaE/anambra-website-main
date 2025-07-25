// lib/clients/event.client.ts
import { EventQueries } from "@/lib/graphql/queries/event";
import client from "@/lib/http";
import { ApolloError } from "@apollo/client";
import { logApolloError } from "../utils/graphqlHelpers";

export const fetchAllEvents = async () => {
  try {
    const { data } = await client.query({
      query: EventQueries.root,
    });
    return data.events;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching events:", error);
    }
    return null;
  }
};

export const fetchEventBySlug = async (slug: string) => {
  try {
    const { data } = await client.query({
      query: EventQueries.bySlug,
      variables: { slug },
    });
    return data.events[0];
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching event by slug:", error);
    }
    return null;
  }
};

export const fetchEventById = async (documentId: string) => {
  try {
    const { data } = await client.query({
      query: EventQueries.byId,
      variables: {
        documentId, // <- make sure this is a string
      },
    });
    return data.event;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching event by id:", error);
    }
    return null;
  }
};
