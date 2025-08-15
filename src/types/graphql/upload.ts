export interface UploadFile {
  documentId: string | null;
  name: string; // Original file name
  alternativeText: string | null; // Optional alt text
  caption: string | null; // Optional caption
  width: number | null; // Image width (px) if applicable
  height: number | null; // Image height (px) if applicable
  formats: {
    thumbnail?: StrapiFileFormat;
    small?: StrapiFileFormat;
    medium?: StrapiFileFormat;
    large?: StrapiFileFormat;
  } | null; // Generated image formats
  hash: string; // Strapi-generated hash
  ext: string | null; // File extension (e.g., ".jpg")
  mime: string; // MIME type (e.g., "image/jpeg")
  size: number; // File size in KB
  url: string; // Relative URL (prepend Strapi base URL)
  previewUrl: string | null; // Preview URL if set
  provider: string; // Storage provider (e.g., "local", "cloudinary")
  provider_metadata: Record<string, any> | null; // Provider-specific metadata
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface StrapiFileFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StateDocument {
  category: string;
  mda: string | null;
  documentId: string;
  files: UploadFile[];
}

export interface DocumentQueryResponse {
  stateDocuments: StateDocument[];
}
