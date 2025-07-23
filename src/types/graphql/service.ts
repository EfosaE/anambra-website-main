export type Service = {
  __typename: "Service";
  Name: string;
  Description: string;
  documentId: string;
  ServicesDetails: ServiceDetail[] | null;
  WebsiteLink: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ServiceDetail = ParagraphBlock | ListBlock;

type ParagraphBlock = {
  type: "paragraph";
  children: TextChild[];
};

type ListBlock = {
  type: "list";
  format: "unordered" | "ordered";
  children: ListItem[];
};

type ListItem = {
  type: "list-item";
  children: TextChild[];
};

type TextChild = {
  type: "text";
  text: string;
};
