import client from "@/lib/http";
import { AboutQueryResponse } from "@/types/graphql/about";
import { aboutQueries } from "../graphql/queries/about";

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
    console.error("Error fetching About page:", error);
    return null;
  }
}
