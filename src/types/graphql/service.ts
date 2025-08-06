export type Service = {
  __typename: "Service";
  Name: string;
  Description: string;
  documentId: string;
  ServicesDetails: ServiceDetail[] | null;
  websiteLink: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  service_category: ServiceCategory | null;

  contactInfo?: ContactInfo | null;
};

// New type for the service_category object
export type ServiceCategory = {
  documentId: string;
  Name: string;
  Slug: string;
  Description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

// New type for the contactInfo object
export type ContactInfo = {
  email: string | null;
  phone: string | null;
  address: string | null;
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
