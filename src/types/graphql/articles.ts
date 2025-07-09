// /types/graphql/article.d.ts
export interface Article {
  __typename: string;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  Article_publish_date: string;
  is_featured: boolean;
  cover: {
    url: string;
    alternativeText?: string;
  };
  category: {
    name: string;
  };
  tags: {
    Name: string;
    Slug?: string;
    Description?: string;
    documentId?: string;
    services?: {
      Name: string;
    }[];
  }[];
}
