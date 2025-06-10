export type UploadFile = {
  documentId: string | null;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any; // You can refine this further based on actual format structure
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any; // You can refine this further based on actual metadata structure
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};
