// lib/clients/faq.client.ts
import { FaqQueries } from "@/lib/graphql/queries/faq";
import client from "@/lib/http";

export const fetchAllFaqs = async () => {
  const { data } = await client.query({
    query: FaqQueries.root,
  });
  return data.faqs;
};

export const fetchFaqById = async (documentId: string) => {
  const { data } = await client.query({
    query: FaqQueries.byId,
    variables: { documentId },
  });
  return data.faq;
};

export const fetchFaqBySlug = async (slug: string) => {
  const { data } = await client.query({
    query: FaqQueries.root, // fetch all
  });

  // filter locally
  const match = data.faqs.find((faq: any) => faq.faq_category.Slug === slug);
  return match || null;
};
