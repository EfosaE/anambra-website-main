# GraphQL Endpoints Documentation

## Article Endpoints
### `fetchAllArticles`
- Definition: `src/lib/clients/articles.client.ts`
- Query: `articleQueries.all` in `src/lib/graphql/queries/articles.ts`
- Returns: Array of articles with title, description, slug, publish date, and cover image
- Usage: 
  - `src/components/news/RelatedNews.tsx`: Fetches articles to display related news based on tags

### `fetchArticleBySlug`
- Definition: `src/lib/clients/articles.client.ts`
- Query: `articleQueries.bySlug`
- Parameters: `slug: String!`
- Usage:
  - `src/app/news/[slug]/page.tsx`: Fetches article details for the news detail page

## Event Endpoints
### `fetchAllEvents`
- Definition: `src/lib/clients/event.client.ts`
- Query: `EventQueries.root`
- Returns: Array of events with title, date, time, location, description
- Usage:
  - `src/app/events/page.tsx`: Fetches all events for the events listing page
  - `src/components/NoticeBoard.tsx`: Fetches events for the notice board component

### `fetchEventById`
- Definition: `src/lib/clients/event.client.ts`
- Query: `EventQueries.byId`
- Parameters: `documentId: ID!`
- Usage:
  - `src/app/events/[slug]/page.tsx`: Fetches specific event details for the event detail page

### `fetchEventBySlug`
- Definition: `src/lib/clients/event.client.ts`
- Query: `EventQueries.bySlug`
- Parameters: `slug: String!`

## FAQ Endpoints
### `fetchAllFaqs`
- Definition: `src/lib/clients/faq.client.ts`
- Query: `FaqQueries.root`
- Returns: Array of FAQs with question, answer, publish date, and category
- Usage:
  - `src/components/AllFAQsComponent.tsx`: Fetches all FAQs for the FAQ listing page
  - `src/app/services/[slug]/page.tsx`: Loads FAQs for service category pages

### `fetchFaqById`
- Definition: `src/lib/clients/faq.client.ts`
- Query: `FaqQueries.byId`
- Parameters: `documentId: ID!`

### `fetchFaqBySlug`
- Definition: `src/lib/clients/faq.client.ts`
- Query: `FaqQueries.root` (filters locally)
- Parameters: `slug: String`

## Homepage Endpoints
### `fetchHomepageData`
- Definition: `src/lib/clients/homepage.client.ts`
- Query: `HomepageQueries.root`
- Returns: Homepage data including:
  - Light_Section: Banner statistics and background image
  - News_Articles_Grid: Selected news categories and articles
  - FAQ_Section: FAQ content and categories
  - SearchSection: Search placeholders and keywords
  - FooterSection: Footer configuration
  - Lens_Ease_Section: Lens section content
- Usage:
  - `src/app/page.tsx`: Main homepage - provides data for:
    * `LightSection` component (banner stats and background)
    * `LatestNews` component (news articles grid)
    * `FAQComponent` (frequently asked questions)
    * `Hero` section configuration
  - `src/app/faq/page.tsx`: Powers the FAQ page with comprehensive FAQ data
  - Used by multiple components to maintain consistent homepage sections and content
## MDA (Ministry, Department, Agency) Endpoints
### `fetchAllMdaCategories`
- Definition: `src/lib/clients/mda.client.ts`
- Query: `MdaQueries.root`
- Returns: Array of MDAs with:
  - Basic info: name, slug, creation dates
  - Mandate and Functions (rich text format)
  - Officials with contact information and images
  - Departments with name, description, and metadata
- Usage:
  - `src/components/MDA.tsx`: Powers the main MDA interface with features:
    * Category filtering (Ministries/Agencies)
    * Search functionality
    * Interactive MDA cards with modal details
    * Tabbed views for Mandate, Functions, Departments, etc.
  - `src/app/government/mdas/page.tsx`: Route handler for MDA section
  - `src/components/DocumentLibrary.tsx`: Used for MDA-based document filtering

### `fetchMdaById`
- Definition: `src/lib/clients/mda.client.ts`
- Query: `MdaQueries.byId`
- Parameters: `documentId: ID!`
- Returns: Single MDA with name, slug, mandate, functions, and metadata
- Usage:
  - Used by modal views in MDA component for detailed single-MDA information
  - Supports dynamic loading of MDA details when users click on MDA cards

## Notice Endpoints
### `fetchAllNotices`
- Definition: `src/lib/clients/notice.client.ts`
- Query: `NoticeQueries.root`
- Returns: Array of notices with title, description, date, URL, Homepage, createdAt, updatedAt, publishedAt
- Usage:
  - `src/components/NoticeBoard.tsx`: Used to display recent notices in the notice board section

### `fetchNoticeById`
- Definition: `src/lib/clients/notice.client.ts`
- Query: `NoticeQueries.byId`
- Parameters: `documentId: ID!`
- Returns: Single notice with title, description, date, URL, Homepage, createdAt, updatedAt, publishedAt

## Page Endpoints
### `fetchAllPages`
- Definition: `src/lib/clients/page.client.ts`
- Query: `PageQueries.root`
- Returns: Array of pages with Title, Slug, Content, Published_Time

### `fetchPageById`
- Definition: `src/lib/clients/page.client.ts`
- Query: `PageQueries.byId`
- Parameters: `documentId: ID!`

## Public Announcement Endpoints
### `fetchAllPublicAnnouncements`
- Definition: `src/lib/clients/public-announcement.client.ts`
- Query: `publicAnnouncementQueries.root`
- Returns: Array of announcements with documentId, title, content, priority, announcement_time, createdAt, updatedAt, publishedAt, locale

### `fetchPublicAnnouncementById`
- Definition: `src/lib/clients/public-announcement.client.ts`
- Query: `publicAnnouncementQueries.byId`
- Parameters: `documentId: ID!`
- Returns: Single announcement with documentId, title, content, priority, announcement_time, createdAt, updatedAt, publishedAt, locale

## Service Endpoints
### `fetchAllServices`
- Definition: `src/lib/clients/service.client.ts`
- Query: `serviceQueries.all`
- Returns: Array of services with name, description, details, category
- Usage:
  - `src/app/services/[slug]/page.tsx`: Fetches services to display in service category detail page

### `fetchServiceById`
- Definition: `src/lib/clients/service.client.ts`
- Query: `serviceQueries.byId`
- Parameters: `id: String!`

### `fetchServiceCategories`
- Definition: `src/lib/clients/service.client.ts`
- Query: `serviceQueries.categories`
- Usage:
  - `src/app/services/page.tsx`: Fetches service categories for the services listing page

## Tag Endpoints
### `fetchAllTags`
- Definition: `src/lib/clients/tag.client.ts`
- Query: `TagQueries.root`
- Returns: Array of tags with documentId, Name, Description, Slug, createdAt, updatedAt, publishedAt
- Usage:
  - `src/components/news/RelatedNews.tsx`: 
    * Used to filter and display related articles based on matching tags
    * Powers the related articles feature showing up to 3 articles with similar tags
  - `src/components/FAQComponent.tsx`: 
    * Organizes and categorizes FAQs using tag information
    * Shows tag information in FAQ cards for better content organization
  - Used across the application for content categorization and filtering

### `fetchTagById`
- Definition: `src/lib/clients/tag.client.ts`
- Query: `TagQueries.byId`
- Parameters: `documentId: ID!`
- Returns: Single tag with documentId, Name, Description, Slug, createdAt, updatedAt, publishedAt
- Usage:
  - Used for retrieving detailed tag information when displaying single tag views
  - Supports tag-based navigation and filtering in various components

## Upload File Endpoints
### `fetchAllUploadFiles`
- Definition: `src/lib/clients/upload.client.ts`
- Query: `UploadFileQueries.root`
- Usage Locations:
  - `src/components/Gallery.tsx`: Used to load images for the gallery
  - `src/components/DocumentLibrary.tsx`: Used to fetch documents for the library

### `fetchUploadFileById`
- Definition: `src/lib/clients/upload.client.ts`
- Query: `UploadFileQueries.byId`
- Parameters: `documentId: ID!`

## User Feedback Endpoints
### `fetchAllUserFeedbacks`
- Definition: `src/lib/clients/user-feedback.client.ts`
- Query: `UserFeedbackQueries.root`
- Returns: Array of user feedbacks with documentId, name, email, message, feedback_status, createdAt, updatedAt, publishedAt
- Usage:
  - Used for retrieving and displaying user submitted feedback and comments

### `fetchUserFeedbackById`
- Definition: `src/lib/clients/user-feedback.client.ts`
- Query: `UserFeedbackQueries.byId`
- Parameters: `documentId: ID!`
- Returns: Single user feedback with documentId, name, email, message, feedback_status, createdAt, updatedAt, publishedAt

## Global Settings Endpoints
### `fetchGlobalData`
- Definition: `src/lib/clients/global.client.ts`
- Query: `GlobalQueries.root`
- Returns: Global site settings with documentId, siteName, siteDescription, createdAt, updatedAt, publishedAt
- Usage:
  - `src/app/layout.tsx`: Provides global metadata for the site including title, description, and OpenGraph data
  - `src/components/Navbar.tsx`: Used in site-wide navigation for consistent branding and menu structure
  - `src/components/Footer.tsx`: Configures footer content and copyright information
  - Used across the application for consistent site-wide configuration
## Department Endpoints
### `fetchAllDepartments`
- Definition: `src/lib/clients/department.client.ts`
- Query: `DepartmentQueries.root`
- Returns: Array of departments with name, slug, description

### `fetchDepartmentById`
- Definition: `src/lib/clients/department.client.ts`
- Query: `DepartmentQueries.byId`
- Parameters: `documentId: ID!`

## Author Endpoints
### `fetchAllAuthors`
- Definition: `src/lib/clients/author.client.ts`
- Query: `AuthorQueries.root`
- Returns: Array of authors with name and email

### `fetchAuthorById`
- Definition: `src/lib/clients/author.client.ts`
- Query: `AuthorQueries.byId`
- Parameters: `documentId: ID!`

## About Endpoints
### `fetchAbout`
- Definition: `src/lib/clients/about.client.ts`
- Query: `aboutQueries.root`
- Returns: About page content with title and content

## Search Keyword Endpoints
### `fetchAllSearchKeywords`
- Definition: `src/lib/clients/search-keyword.client.ts`
- Query: `SearchKeywordQueries.root`
- Returns: Array of search keywords

### `fetchSearchKeywordById`
- Definition: `src/lib/clients/search-keyword.client.ts`
- Query: `SearchKeywordQueries.byId`
- Parameters: `documentId: ID!`


## Ease of Doing Business Endpoints
### `fetchAbout`
- Definition: `src/lib/clients/about.client.ts`
- Query: `aboutQueries.root`
- Returns: About page content with title and content