import client from "@/lib/http";
import { CategoryQueries } from "@/lib//graphql/queries/category";
import { ApolloError } from "@apollo/client";
import { handleError } from "../utils/graphqlHelpers";

export const fetchAuthor = async () => {
  try {
    const { data } = await client.query({ query: CategoryQueries.root });
    return data.categories;
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
    } else {
      console.error("Unknown error fetching categories:", error);
    }
    return null;
  }
};

export const fetchAuthorById = async (id: string) => {
  try {
    const { data } = await client.query({
      query: CategoryQueries.byId,
      variables: { id },
    });
    return data.category;
  } catch (error) {
    if (error instanceof ApolloError) {
      handleError(error);
    } else {
      console.error("Unknown error fetching category by id:", error);
    }
    return null;
  }
};
