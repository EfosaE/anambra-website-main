// Council Member
export interface CouncilMember {
  name: string;
  position: string;
  profile_picture: Image;
}

// Image
export interface Image {
  url: string;
}

// Contact Info
export interface ContactInfo {
  address: string;
  email: string;
  id: string;
  phone: string;
}

// Fee
export interface Fee {
  Estate: string;
  LGA: string;
  cost: FeeCost[];
}

export interface FeeCost {
  price: number;
  type: "residential" | "commercial";
  id: string;
}

// Saber Official
export interface SaberOfficial {
  designation_eodb: string;
  designation_state: string;
  id: string;
  name: string;
  type: string;
}

// Requirements
export interface Requirement {
  heading: string;
  information: string | null;
  documentId: string;
  mda: Mda | null;
  steps: RequirementStep[];
}

export interface Mda {
  name: string;
  Slug: string;
}

export interface RequirementStep {
  number: number;
  heading: string;
  content: string;
}

// Stimulator
export interface Stimulator {
  extras: string;
  highlight: string;
  id: string;
}

// Business Page
export interface BusinessPage {
  Title: string;
  councilMembers: CouncilMember[];
  introduction: string;
  frontliners: string;
  mandate: string;
  objectives: string;
  spotlight: string;
  contactinfo: ContactInfo;
  documentId: string;
  fees: Fee[];
  saberOfficials: SaberOfficial[];
  requirement: Requirement;
  mdaProcesses: Requirement[];
  stimulators: Stimulator[];
}




// Root Query Response
export interface BusinessPageQuery {
  businessPage: BusinessPage;
}

export type BusinessPageOverview = Pick<
  BusinessPage,
  | "introduction"
  | "objectives"
  | "spotlight"
  | "councilMembers"
  | "frontliners"
  | "mandate"
>;

export type BusinessPageStimulator = Pick<BusinessPage, "stimulators">;

// export type BusinessPageMdaProcesses = Pick<BusinessPage, "mdaProcesses" | "saberOfficials" | "fees">;
export type BusinessPageMdaProcesses = Pick<BusinessPage, "mdaProcesses">;