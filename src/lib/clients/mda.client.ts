// lib/clients/mda.client.ts
import { ApolloError } from "@apollo/client";

import client from "@/lib/http"; // or your ApolloClient instance
import { logApolloError } from "../utils/graphqlHelpers";
import { MdaQueries } from "../graphql/queries/mda";


export const fetchMdaByType = async (typeMda: string) => {
  try {
    const { data } = await client.query({
      query: MdaQueries.byType,
      // fetchPolicy: "network-only", // Ensure fresh data
      variables: {
        filters: {
          type: {
            eqi: typeMda, // or whatever MDA type you're targeting
          },
        },
      },
    });
    return data.mdas;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching MDA categories:", error);
    }
    return null;
  }
};

// export const fetchAllMdaCategoriesDeep = async () => {
//   const { data } = await client.query({
//     query: MdaQueries.rootDeep,
//   });
//   return data.mdas;
// };

export const fetchMdaById = async (documentId: string) => {
  try {
    const { data } = await client.query({
      query: MdaQueries.byId,
      variables: { documentId },
    });
    return data.mda;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching MDA by id:", error);
    }
    return null;
  }
};
