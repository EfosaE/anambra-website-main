//lib/clients/article.client.ts
import { articleQueries } from "@/lib/graphql/queries/articles";
import client from "@/lib/http";
import { handleError } from "../utils/graphqlHelpers";
import { ApolloError } from "@apollo/client";

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
      handleError(error);
    } else {
      console.error("Unknown error fetching articles:", error);
    }
    return null;
  }
};

export const fetchArticleBySlug = async (slug: string) => {
  try {
    const { data } = await client.query({
      query: articleQueries.bySlug,
      variables: { slug },
    });
    return data.articles[0];
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
    } else {
      console.error("Unknown error fetching article by slug:", error);
    }
    return null;
  }
};
