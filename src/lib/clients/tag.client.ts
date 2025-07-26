// lib/clients/tag.client.ts
import { TagQueries } from "@/lib/graphql/queries/tag";
import client from "@/lib/http";
import { ApolloError } from "@apollo/client";
import { logApolloError } from "../utils/graphqlHelpers";

export const fetchAllTags = async () => {
  try {
    const { data } = await client.query({
      query: TagQueries.root,
    });
    return data.tags;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching tags:", error);
    }
    return null;
  }
};

export const fetchTagById = async (documentId: string) => {
  try {
    const { data } = await client.query({
      query: TagQueries.byId,
      variables: { documentId },
    });
    return data.tag;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching tag by id:", error);
    }
    return null;
  }
};


// export const fetchContentByTags = async (text: string) => {
//   const { data } = await client.query({
//     query: SearchKeywordQueries.byKeyword,
//     variables: {
//       filters: {
//         keyword: {
//           containsi: text,
//         },
//       },
//     },
//     fetchPolicy: "no-cache", // Optional: avoid caching while typing
//   });

//   return data.searchKeywords;
// };