export interface Article {
  __typename: "Article";
  documentId: string;
  title: string;
  slug: string;
  description: string;
  Article_publish_date: string;
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
  blocks: ArticleBlock[];
}

// Union type for the different block components
export type ArticleBlock =
  | RichTextBlock
  | QuoteBlock
  | MediaBlock;

export interface RichTextBlock {
  __typename?: 'ComponentSharedRichText';
  body: string;
}

export interface QuoteBlock {
  __typename?: 'ComponentSharedQuote';
  body: string;
}

export interface MediaBlock {
  __typename?: 'ComponentSharedMedia';
  file: {
    url: string;
  };
}

//it can have a slider