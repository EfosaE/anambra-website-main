// lib/types/graphql/homepage.types.ts

export type LightSectionStat = {
  id: string;
  label: string;
  value: string;
};

export type LightSectionImage = {
  url: string;
  alternativeText?: string | null;
  width: number;
  height: number;
  size: number;
  name: string;
};

export type LightSectionData = {
  stats: LightSectionStat[];
  backgroundImage: LightSectionImage;
};
