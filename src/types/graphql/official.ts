// Matches the shape coming directly from the GraphQL API
export type ExecutiveCouncilQueryResponse = {
  officials: {
    designations: {
      name: string;
    }[];
    details: {
      id: string;
      name: string;
      position: string;
      Contact: {
        email: string;
      } | null;
      profile_picture: {
        url: string;
      } | null;
    };
  }[];
};

// Flattened shape you might actually use in UI
export type Official = {
  id: string;
  name: string;
  position: string;
  email: string | null;
  profile_picture: {
    url: string;
    width?: number;
    height?: number;
  } | null;
};
