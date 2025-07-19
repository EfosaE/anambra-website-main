import { Article } from "./articles";
import { FAQ } from "./faq";
import { LightSectionData } from "./homepage.types";

export type HomepageData = {
  homepage: {
    Banner: {
      id: string;
      title: string;
      subtitle: string;
      Statistics: {
        id: string;
        label: string;
        value: string;
      }[];
    };
    FAQ_Section: {
      id: string;
      faq_selection_criteria: string;
      faqs: FAQ[];
    };
    SearchSection: {
      id: string;
      search_placeholder: string;
      search_keywords: {
        documentId: string;
        keyword: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      }[];
    };
    News_Articles_Grid: {
      id: string;
      news_selection_criteria: "Latest" | "Most Viewed" | "By Tag";
      selected_category: {
        documentId: string;
        name: string;
        slug: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        articles: Article[];
      }[];
    };
  };
};

export type FooterQueryResponse = {
  homepage: {
    documentId: string;
    FooterSection: {
      FooterLinks: {
        link: string;
        name: string;
        category: string;
      }[];
    };
  };
};
