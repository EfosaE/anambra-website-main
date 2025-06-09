// lib/clients/mda.client.ts
import { MdaQueries } from "@/lib/graphql/queries/mda";
import client from "@/lib/http";

export const fetchAllMdaCategories = async () => {
  const { data } = await client.query({
    query: MdaQueries.root,
  });
  return data.mdas;
};

// export const fetchAllMdaCategoriesDeep = async () => {
//   const { data } = await client.query({
//     query: MdaQueries.rootDeep,
//   });
//   return data.mdas;
// };

export const fetchMdaById = async (documentId: string) => {
  const { data } = await client.query({
    query: MdaQueries.byId,
    variables: { documentId },
  });
  return data.mda;
};
