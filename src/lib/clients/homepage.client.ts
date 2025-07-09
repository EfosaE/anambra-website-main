import { HomepageQueries } from "@/lib/graphql/queries/homepage";
import client from "@/lib/http";
import { LightSectionData } from "../../types/graphql/homepage.types";
import { Article } from "@/types/graphql/articles";





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

export const fetchHomepageData = async (): Promise<HomepageData> => {
  const { data } = await client.query({
    query: HomepageQueries.root,
    fetchPolicy: "no-cache",
  });

  const banner = data.homepage.Banner;

  // console.log("Banner Data:", banner.banner_image[0]);
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
};
