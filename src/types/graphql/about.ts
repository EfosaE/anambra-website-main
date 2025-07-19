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

export type LGAQueryResponse = {
  about: {
    lgas: {
      "anambra state": {
        lga: string;
        towns: string[];
      }[];
    };
  };
};

export type ExecutiveCouncilMember = {
  designation: string;
  name: string;
  profile_picture: {
    url: string;
    width: number;
    height: number;
  } | null; // In case some members have no image
};

export type AboutData = {
  executive_council: ExecutiveCouncilMember[];
};

export type ExecutiveCouncilQueryResponse = {
  about: AboutData;
};
