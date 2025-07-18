import FAQComponent from "@/components/FAQComponent";
import Hero from "@/components/Hero";
import InterfaceWithGovernment from "@/components/InterfaceWithGovernment";
import LatestNews from "@/components/LatestNews";
import LightSection from "@/components/LightSection";
import NoticeBoard from "@/components/NoticeBoard";
import { fetchHomepageData } from "@/lib/clients/homepage.client";
export const dynamic = "force-dynamic";

export default async function Home() {
  const homepage = await fetchHomepageData();

  const grid = homepage.News_Articles_Grid;

  let latestArticles: any[] = [];

  if (grid.news_selection_criteria === "Latest") {
    latestArticles = grid.selected_category
      .flatMap((category) => {
        console.log(category.articles);
        return category.articles.map((article: any) => ({
          ...article,
          categoryName: category.name,
        }));
      })
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }

  

  const { faqs } = homepage.FAQ_Section;
  const { backgroundImage, stats } = homepage.Light_Section;
  const { search_keywords } = homepage.SearchSection;

  return (
    <>
      <Hero keywords={search_keywords} />
      <LightSection backgroundImage={backgroundImage} stats={stats} />
      <NoticeBoard />
      <InterfaceWithGovernment />
      <LatestNews articles={latestArticles} />
      <FAQComponent faqs={faqs} />
    </>
  );
}
