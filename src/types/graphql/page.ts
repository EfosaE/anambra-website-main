// Root response type
export interface FetchDynamicPagesResponse {
  data: {
    pages: Page[];
  };
}

// Page structure
export interface Page {
  SEO: SEO[];
  Title: string;
  content: PageContent[];
}

// SEO metadata
export interface SEO {
  metaDescription: string;
  metaTitle: string;
}

// Union of possible content blocks
export type PageContent =
  | ComponentSharedRichText
  | ComponentSharedMedia
  | ComponentAboutPageGovernors
  | ComponentAboutPageKeyLandmarks;

// Rich Text
export interface ComponentSharedRichText {
  body: string;
  __typename?: "ComponentSharedRichText";
}

// Media (e.g., image or file)
export interface ComponentSharedMedia {
  file: {
    url: string;
  };
  __typename?: "ComponentSharedMedia";
}

// Governors section
export interface ComponentAboutPageGovernors {
  Party: string;
  bio: string;
  image: {
    url: string;
  };
  name: string;
  year: string;
  __typename?: "ComponentAboutPageGovernors";
}

// Key Landmarks section
export interface ComponentAboutPageKeyLandmarks {
  name: string;
  openTime: string;
  description: string;
  image: {
    url: string;
  };
  __typename?: "ComponentAboutPageKeyLandmarks";
}
