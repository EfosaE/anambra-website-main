// lib/clients/mda.client.ts
import { MdaQueries } from "@/lib/graphql/queries/mda";
import client from "@/lib/http";
import { ApolloError } from "@apollo/client";
import { handleError } from "../utils/graphqlHelpers";

export const fetchAllMdaCategories = async () => {
  try {
    const { data } = await client.query({
      query: MdaQueries.root,
    });
    return data.mdas;
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
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
      handleError(error);
    } else {
      console.error("Unknown error fetching MDA by id:", error);
    }
    return null;
  }
};
