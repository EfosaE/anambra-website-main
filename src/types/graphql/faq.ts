export type FAQ = {
  __typename: "FAQ";
  documentId: string;
  question: string;
  // publishedAt: string;
  FaqAnswer: RichTextNode[];
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
};

export type RichTextNode = {
  type: string;
  children: {
    text: string;
    type?: string; // optional, sometimes "text", "link", etc.
    // you can add more fields like "bold", "italic", etc. if needed
  }[];
};
