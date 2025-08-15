// types/graphql/about.types.ts

export type AboutQueryResponse = {
  about: {
    title: string;
    main_page: AboutBlock[];
  };
};

export type AboutBlock =
  | ComponentSharedRichText
  | ComponentSharedMedia
  | ComponentSharedSlider;

export type ComponentSharedRichText = {
  __typename: "ComponentSharedRichText";
  body: string;
};

export type ComponentSharedMedia = {
  __typename: "ComponentSharedMedia";
  file: {
    url: string;
    width: number;
    height: number;
    mime: string;
  };
};

export type ComponentSharedSlider = {
  __typename: "ComponentSharedSlider";
  files: {
    url: string;
    width: number;
    height: number;
  }[];
};

export type LGA = {
  name: string;
  towns: string[];
};

export type LgaPageQueryResponse = {
  lgaPage: {
    lgas: {
      lgas: LGA[];
    };
  };
};


// export type AboutData = {
//   executive_council: ExecutiveCouncilMember[];
// };


