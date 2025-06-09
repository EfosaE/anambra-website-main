//lib/clients/article.client.ts
import { articleQueries } from "@/lib/graphql/queries/articles";
import client from "@/lib/http";

export const fetchAllArticles = async () => {
  const { data } = await client.query({ query: articleQueries.all });
  return data.articles;
};

export const fetchArticleBySlug = async (slug: string) => {
  const { data } = await client.query({
    query: articleQueries.bySlug,
    variables: { slug },
  });
  return data.articles[0];
};
