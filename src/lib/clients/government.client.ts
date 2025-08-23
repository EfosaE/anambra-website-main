import { ExecutiveCouncilQueryResponse } from "@/types/graphql/official";
import client from "../http";
import { ansecQueries } from "../graphql/queries/executives";
import { ApolloError } from "@apollo/client/errors";
import { logApolloError } from "../utils/graphqlHelpers";

export async function fetchExecutiveCouncil(
  keys: string[]
): Promise<ExecutiveCouncilQueryResponse | null> {
  try {
    const { data } = await client.query<ExecutiveCouncilQueryResponse>({
      query: ansecQueries.root,
      variables: {
        filters: {
          designations: {
            name: {
              in: keys,
            },
          },
        },
        pagination: {
          pageSize: 50,
        },
        sort: ["createdAt:asc"],
      },
      // fetchPolicy: "no-cache",
    });

    if (process.env.NODE_ENV === "development") {
      console.log(data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching ANSEC page:", error);
    }
    return null;
  }
}
