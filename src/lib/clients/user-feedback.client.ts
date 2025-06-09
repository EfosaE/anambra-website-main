// lib/clients/userFeedback.client.ts
import { UserFeedbackQueries } from "@/lib/graphql/queries/user-feedback";
import client from "@/lib/http";

export const fetchAllUserFeedbacks = async () => {
  const { data } = await client.query({
    query: UserFeedbackQueries.root,
  });
  return data.userFeedbacks;
};

export const fetchUserFeedbackById = async (documentId: string) => {
  const { data } = await client.query({
    query: UserFeedbackQueries.byId,
    variables: { documentId },
  });
  return data.userFeedback;
};
