// lib/api/endpoints/government.ts
export const governmentEndpoints = {
  ministries: "/api/government/ministries",
  executiveOfficials: "/api/government/executive-officials",
  legislativeOfficials: "/api/government/legislative-officials",
  judiciaryOfficials: "/api/government/judiciary-officials",
  localGovernmentAreas: "/api/government/local-government-areas",
};

export const articleEndpoints = {
  all: "/articles",
  byId: (id: string) => `/articles/${id}`,
};

export const authorEndpoints = {
  all: "/authors",
  byId: (id: string) => `/authors/${id}`,
};

export const categoryEndpoints = {
  all: "/categories",
  byId: (id: string) => `/categories/${id}`,
};

export const aboutEndpoints = {
  root: "/about",
};

export const departmentEndpoints = {
  all: "/departments",
  byId: (id: string) => `/departments/${id}`,
};

export const eventEndpoints = {
  all: "/events",
  byId: (id: string) => `/events/${id}`,
};

export const faqEndpoints = {
  all: "/faqs",
  byId: (id: string) => `/faqs/${id}`,
};

export const faqCategoryEndpoints = {
  all: "/faq-categories",
  byId: (id: string) => `/faq-categories/${id}`,
};

export const globalEndpoints = {
  root: "/global",
};

export const homepageEndpoints = {
  root: "/homepage",
};

export const mdaEndpoints = {
  all: "/mdas",
  byId: (id: string) => `/mdas/${id}`,
};

export const noticeEndpoints = {
  all: "/notices",
  byId: (id: string) => `/notices/${id}`,
};

export const pageEndpoints = {
  all: "/pages",
  byId: (id: string) => `/pages/${id}`,
};

export const publicAnnouncementEndpoints = {
  all: "/public-announcements",
  byId: (id: string) => `/public-announcements/${id}`,
};

export const searchKeywordEndpoints = {
  all: "/search-keywords",
  byId: (id: string) => `/search-keywords/${id}`,
};

export const serviceEndpoints = {
  all: "/services",
  byId: (id: string) => `/services/${id}`,
};

export const serviceCategoryEndpoints = {
  all: "/service-categories",
  byId: (id: string) => `/service-categories/${id}`,
};

export const serviceDetailEndpoints = {
  all: "/services-details",
  byId: (id: string) => `/services-details/${id}`,
};

export const tagEndpoints = {
  all: "/tags",
  byId: (id: string) => `/tags/${id}`,
};

export const userFeedbackEndpoints = {
  all: "/user-feedbacks",
  byId: (id: string) => `/user-feedbacks/${id}`,
};

export const uploadEndpoints = {
  root: "/upload",
  byId: (id: string) => `/upload/files/${id}`,
  all: "/upload/files",
};
