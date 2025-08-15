import { ApolloError } from "@apollo/client";
import { HomepageQueries } from "@/lib/graphql/queries/homepage";
import client from "@/lib/http";
import { FooterQueryResponse, HomepageData } from "@/types/graphql/homepage";
import { logApolloError } from "../utils/graphqlHelpers";

export const fetchHomepageData = async (): Promise<
  HomepageData["homepage"] | null
> => {
  try {
    const { data } = await client.query<{ homepage: HomepageData["homepage"] }>(
      {
        query: HomepageQueries.root,
        // fetchPolicy: "no-cache"
      }
    );

    const { homepage } = data;

    // console.log("homepage data", homepage);

    // Validate presence of critical fields (optional)
    if (!homepage.Banner || !homepage.News_Articles_Grid) {
      console.error("Incomplete homepage data received:", homepage);
      return null;
    }

    console.log(homepage.News_Articles_Grid)

    return {
      Banner: homepage.Banner,
      News_Articles_Grid: homepage.News_Articles_Grid,
      FAQ_Section: homepage.FAQ_Section,
      SearchSection: homepage.SearchSection,
      AgendaSection: homepage.AgendaSection,
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching homepage data:", error);
    }
    return null;
  }
};

export const fetchFooterSection = async (): Promise<
  FooterQueryResponse["homepage"]["FooterSection"] | null
> => {
  try {
    const { data } = await client.query<{
      homepage: FooterQueryResponse["homepage"];
    }>({
      query: HomepageQueries.footer,
      fetchPolicy: "network-only"
    });

    // console.log("data", data);

    if (!data.homepage) {
      return null;
    }

    return data.homepage.FooterSection;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching footer section:", error);
    }
    return null;
  }
};
