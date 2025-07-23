export type GlobalQueryVariables = {
  status?: "DRAFT" | "PUBLISHED"; // From Strapi's PublicationStatus enum
};

export type GlobalQueryResponse = {
  global: {
    documentId: string;
    siteName: string;
    siteDescription: string;
    favicon: {
      url: string;
      name: string;
      height: number;
      width: number;
    } | null;
    defaultSeo: {
      metaDescription: string;
      metaTitle: string;
    } | null;
  } | null;
};
