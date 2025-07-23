// types/graphql/mda.ts

export interface Mda {
  __typename: "Mda";
  documentId: string;
  name: string;
  Slug: string;
  Mandate?: RichTextBlock[];
  Functions?: RichTextBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  websitelink?: string;

  Officials?: {
    designation: string;
    name: string;
    Contact: {
      email: string;
      phone: string;
    };
  }[];

  MdaContact?: {
    address: string;
    email: string;
    phone: string;
  }

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
