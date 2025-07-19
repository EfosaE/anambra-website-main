import FAQComponent from "@/components/FAQComponent";
import Hero from "@/components/Hero";
import InterfaceWithGovernment from "@/components/InterfaceWithGovernment";
import LatestNews from "@/components/LatestNews";
import LightSection from "@/components/LightSection";
import NoticeBoard from "@/components/NoticeBoard";
import { fetchHomepageData } from "@/lib/clients/homepage.client";
import { Article } from "@/types/graphql/articles";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await fetchHomepageData();

  if (!data) {
    return <div>Some Important Data is Missing</div>;
  }

  const { FAQ_Section, Banner, SearchSection, News_Articles_Grid } = data;

  let latestArticles: Article[] = [];

  if (News_Articles_Grid.news_selection_criteria === "Latest") {
    const seen = new Set<string>();

    latestArticles = News_Articles_Grid.selected_category
      .flatMap((category) =>
        category.articles.map((article) => ({
          ...article,
          categoryName: category.name,
        }))
      )
      .filter((article) => {
        const key = article.documentId;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.Article_publish_date).getTime() -
          new Date(a.Article_publish_date).getTime()
      );
  }

  return (
    <>
      <Hero keywords={SearchSection.search_keywords} />
      <LightSection stats={Banner.Statistics} />
      <NoticeBoard />
      <InterfaceWithGovernment />
      <LatestNews articles={latestArticles} />
      <FAQComponent faqs={FAQ_Section.faqs} />
    </>
  );
}
