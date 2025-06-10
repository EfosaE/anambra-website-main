// app/globalsearch/page.tsx
import GlobalSearch from "@/components/GlobalSearch";
import { fetchAllArticles } from "@/lib/clients/articles.client";
import { Article } from "@/types/graphql/articles";

export default async function GlobalSearchPage() {
  const articles: Article[] = await fetchAllArticles();

  return <GlobalSearch articles={articles} />;
}
