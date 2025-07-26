import client from "@/lib/http";
import { AboutQueryResponse } from "@/types/graphql/about";
import { BusinessPageQuery } from "@/types/graphql/business";
import { eodbQueries } from "../graphql/queries/business";
import { ApolloError } from "@apollo/client/errors";
import { logApolloError } from "../utils/graphqlHelpers";

export async function fetchBusinessPage(): Promise<BusinessPageQuery | null> {
  try {
    const { data } = await client.query<{
      businessPage: BusinessPageQuery["businessPage"];
    }>({
      query: eodbQueries.root,
      // fetchPolicy: "no-cache",
    });
    // console.log(data.about);
    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching EoDB page:", error);
    }
    return null;
  }
}
