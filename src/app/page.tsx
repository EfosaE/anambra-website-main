import FAQComponent from "@/components/FAQComponent";
import Hero from "@/components/Hero";
import InterfaceWithGovernment from "@/components/InterfaceWithGovernment";
import LatestNews from "@/components/LatestNews";
import LightSection from "@/components/LightSection";
import NoticeBoard from "@/components/NoticeBoard";
import { fetchHomepageData } from "@/lib/clients/homepage.client";



export default async function Home() {
  const homepage = await fetchHomepageData();

  const allArticles = homepage.News_Articles_Grid.selected_category.flatMap(
    (category) =>
      category.articles.map((article) => ({
        ...article,
        categoryName: category.name,
      }))
  );

  const { faqs } = homepage.FAQ_Section;
  const { backgroundImage, stats } = homepage.Light_Section;

  return (
    <>
      <Hero />
      <LightSection backgroundImage={backgroundImage} stats={stats} />
      <NoticeBoard />
      <InterfaceWithGovernment />
      <LatestNews articles={allArticles} />
      <FAQComponent faqs={faqs} />
    </>
  );
}
