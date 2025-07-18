import client from "@/lib/http";
import { AboutQueryResponse, LGAQueryResponse } from "@/types/graphql/about";
import { aboutQueries } from "../graphql/queries/about";
import { lgaQueries } from "../graphql/queries/lga";
import { ApolloError } from "@apollo/client";
import { handleError } from "../utils/graphqlHelpers";

export async function fetchAboutPage(): Promise<AboutQueryResponse | null> {
  try {
    const { data } = await client.query<{ about: AboutQueryResponse["about"] }>(
      {
        query: aboutQueries.root,
        fetchPolicy: "no-cache",
      }
    );
    // console.log(data.about);
    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
    } else {
      console.error("Unknown error fetching About page:", error);
    }
    return null;
  }
}

export async function fetchLGAPage(): Promise<LGAQueryResponse | null> {
  try {
    const { data } = await client.query<{ about: LGAQueryResponse["about"] }>({
      query: lgaQueries.root,
      fetchPolicy: "no-cache",
    });

    if (process.env.NODE_ENV === "development") {
      console.log(data.about.lgas);
    }

    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
    } else {
      console.error("Unknown error fetching LGA page:", error);
    }
    return null;
  }
}

