// lib/clients/global.client.ts
import { GlobalQueries } from "@/lib/graphql/queries/global";
import client from "@/lib/http";
import {
  GlobalQueryResponse,
  GlobalQueryVariables,
} from "@/types/graphql/global";

// export const fetchGlobalData = async () => {
//   const { data } = await client.query({
//     query: GlobalQueries.root,
//   });
//   return data.global;
// };

export async function fetchGlobalData(status: "DRAFT" | "PUBLISHED" = "PUBLISHED") {
  const { data } = await client.query<
    GlobalQueryResponse,
    GlobalQueryVariables
  >({
    query: GlobalQueries.root,
    variables: { status },
  });

  return data.global;
}
