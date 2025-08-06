export type FAQ = {
  __typename: "Faq";
  documentId: string;
  question: string;
  // publishedAt: string;
  faqAnswer: RichTextNode[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags: {
    Name: string;
  };
  faq_category: {
    documentId: string;
    Name: string;
    Slug: string;
    Description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  Action: { name: string; url: string } | null;
};

export type RichTextNode = {
  type: string;
  children: {
    text: string;
    type?: string; // optional, sometimes "text", "link", etc.
    // you can add more fields like "bold", "italic", etc. if needed
  }[];
};
