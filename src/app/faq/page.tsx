// app/faq/page.tsx

import AllFAQsComponent from "@/components/AllFAQsComponent";
import FAQComponent from "@/components/FAQComponent";
import { fetchHomepageData } from "@/lib/clients/homepage.client";

export default async function FAQPage() {
  const homepage = await fetchHomepageData();

  const allArticles = homepage.News_Articles_Grid.selected_category.flatMap(
    (category) =>
      category.articles.map((article) => ({
        ...article,
        categoryName: category.name,
      }))
  );

  const { faqs } = homepage.FAQ_Section;

  return (
    <main className="max-w-7xl mx-auto px-4 pt-[50px] pb-20">
      {/* <FAQComponent faqs={faqs} /> */}
      <AllFAQsComponent />
    </main>
  );
}
