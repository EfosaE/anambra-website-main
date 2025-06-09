import { HomepageQueries } from "@/lib/graphql/queries/homepage";
import client from "@/lib/http";
import { LightSectionData } from "../types/graphql/homepage.types";

export type HomepageData = {
  Light_Section: LightSectionData;
  News_Articles_Grid: {
    selected_category: {
      name: string;
      articles: any[];
    }[];
  };
  FAQ_Section: {
    faqs: any[];
  };
};

export const fetchHomepageData = async (): Promise<HomepageData> => {
  const { data } = await client.query({
    query: HomepageQueries.root,
  });

  const banner = data.homepage.Banner;

  return {
    Light_Section: {
      stats: banner.Statistics,
      backgroundImage: banner.banner_image[0],
    },
    News_Articles_Grid: data.homepage.News_Articles_Grid,
    FAQ_Section: data.homepage.FAQ_Section,
  };
};
