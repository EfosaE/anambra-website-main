import client from "@/lib/http";
import { AboutQueryResponse, ExecutiveCouncilQueryResponse, LGAQueryResponse } from "@/types/graphql/about";
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

export async function fetchLGAPage(): Promise<LGAQueryResponse | null> {
  try {
    const { data } = await client.query<{ about: LGAQueryResponse["about"] }>({
      query: lgaQueries.root,
      // fetchPolicy: "no-cache",
    });

    // if (process.env.NODE_ENV === "development") {
    //   console.log(data.about.lgas);
    // }

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


export async function fetchAnsecPage(): Promise<ExecutiveCouncilQueryResponse | null> {
  try {
    const { data } = await client.query<{ about: ExecutiveCouncilQueryResponse["about"] }>({
      query: ansecQueries.root,
      // fetchPolicy: "no-cache",
    });

    // if (process.env.NODE_ENV === "development") {
    //   console.log(data.about.executive_council);
    // }

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

