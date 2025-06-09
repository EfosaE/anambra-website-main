// lib/types/graphql/mda.ts

export interface Mda {
  documentId: string;
  name: string;
  Slug: string;
  Mandate?: RichTextBlock[];
  Functions?: RichTextBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  Officials?: {
    Contact?: {
      image?: {
        file?: {
          alternativeText?: string;
          url?: string;
          width?: number;
          height?: number;
        };
      };
    };
  }[];

  departments?: {
    name: string;
    Description?: string;
    documentId: string;
    Slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }[];
}

interface RichTextBlock {
  type: string;
  children: { text: string; type: string }[];
}
