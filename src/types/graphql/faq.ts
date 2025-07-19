export type FAQ = {
  documentId: string;
  question: string;
  faq_Published_Date: string;
  FaqAnswer: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags: {
    Name: string;
  }
  faq_category: {
    documentId: string;
    Name: string;
    Slug: string;
    Description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};
