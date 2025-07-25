//lib/clients/article.client.ts
import { articleQueries } from "@/lib/graphql/queries/articles";
import client from "@/lib/http";
import { logApolloError } from "../utils/graphqlHelpers";
import { ApolloError } from "@apollo/client";
import { Article } from "@/types/graphql/articles";

// export const fetchAllArticles = async () => {
//   const { data } = await client.query({ query: articleQueries.all });
//   return data.articles;
// };

// export const fetchArticleBySlug = async (slug: string) => {
//   const { data } = await client.query({
//     query: articleQueries.bySlug,
//     variables: { slug },
//   });
//   return data.articles[0];
// };

export const fetchAllArticles = async () => {
  try {
    const { data } = await client.query({ query: articleQueries.all });
    return data.articles;
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching articles:", error);
    }
    return null;
  }
};

export const fetchArticleBySlug = async (slug: string): Promise<Article> => {
  try {
    const { data } = await client.query({
      query: articleQueries.bySlug,
      variables: { slug },
    });
    return data.articles[0];
  } catch (error) {
    if (error instanceof ApolloError) {
      logApolloError(error);
    } else {
      console.error("Unknown error fetching article by slug:", error);
    }
    return null;
  }
};
