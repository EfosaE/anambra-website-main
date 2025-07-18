import { HomepageQueries } from "@/lib/graphql/queries/homepage";
import client from "@/lib/http";
import { ApolloError } from "@apollo/client";

import { LightSectionData } from "../../types/graphql/homepage.types";
import { Article } from "@/types/graphql/articles";
import { handleError } from "../utils/graphqlHelpers";

export type HomepageData = {
  Light_Section: LightSectionData;
  News_Articles_Grid: {
    news_selection_criteria: "Latest" | "Most Viewed" | "By Tag";
    selected_category: {
      name: string;
      slug: string;
      description: string;
      articles: Article[];
    }[];
  };
  FAQ_Section: {
    faqs: any[];
  };
  SearchSection: {
    search_keywords: {
      keyword: string;
    }[];
  };
};

export const fetchHomepageData = async (): Promise<HomepageData | null> => {
  try {
    const { data } = await client.query({
      query: HomepageQueries.root,
      fetchPolicy: "no-cache",
    });

    const banner = data.homepage.Banner;

    return {
      Light_Section: {
        stats: banner.Statistics,
        backgroundImage: banner.banner_image[0],
      },
      News_Articles_Grid: data.homepage.News_Articles_Grid,
      FAQ_Section: data.homepage.FAQ_Section,
      SearchSection: {
        search_keywords: data.homepage.SearchSection.search_keywords,
      },
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error); // ✅ your clean GraphQL logging
    } else {
      console.error("Unknown error fetching homepage data:", error);
    }
    return null; // ✅ fallback value to prevent app crash
  }
};
