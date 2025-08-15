import client from "@/lib/http";
import { AboutQueryResponse, LgaPageQueryResponse } from "@/types/graphql/about";
import { aboutQueries } from "../graphql/queries/about";
import { lgaQueries } from "../graphql/queries/lga";
import { ApolloError } from "@apollo/client";
import { logApolloError } from "../utils/graphqlHelpers";
import { ansecQueries } from "../graphql/queries/executives";

export async function fetchAboutPage(): Promise<AboutQueryResponse | null> {
  try {
    const { data } = await client.query<{ about: AboutQueryResponse["about"] }>(
      {
        query: aboutQueries.root,
        // fetchPolicy: "no-cache",
      }
    );
    // console.log(data.about);
    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching About page:", error);
    }
    return null;
  }
}

export async function fetchLGAPage(): Promise<LgaPageQueryResponse | null> {
  try {
    const { data } = await client.query<LgaPageQueryResponse>({
      query: lgaQueries.root, // should be the LgaPage query
      // fetchPolicy: "no-cache", // uncomment if you want fresh data always
    });

    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching LGA page:", error);
    }
    return null;
  }
}




