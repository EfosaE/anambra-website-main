import FAQComponent from "@/components/FAQComponent";
import Hero from "@/components/Hero";
import InterfaceWithGovernment from "@/components/InterfaceWithGovernment";
import LatestNews from "@/components/LatestNews";
import LightSection from "@/components/LightSection";
import NoticeBoard from "@/components/NoticeBoard";
import SolutionAgenda from "@/components/SolutionAgenda";
import { fetchHomepageData } from "@/lib/clients/homepage.client";
import { Article } from "@/types/graphql/articles";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await fetchHomepageData();
  // console.log("homepage data", data);

  if (!data) {
    return <div>Some Important Data is Missing</div>;
  }

  const {
    FAQ_Section,
    Banner,
    SearchSection,
    News_Articles_Grid,
    AgendaSection,
  } = data;

  let latestArticles: Article[] = [];

  console.log(News_Articles_Grid)

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
      <SolutionAgenda AgendaSection={AgendaSection} />
      <NoticeBoard />
      <InterfaceWithGovernment />
      <LatestNews articles={latestArticles} />
      <FAQComponent faqs={FAQ_Section.faqs} />
    </>
  );
}
