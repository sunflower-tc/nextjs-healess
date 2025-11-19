export interface CMSPageResult {
  cmsPage: CMSPage;
}

export interface CMSPage {
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  identifier: string;
  urlKey: string;
  metaKeywords: string;
  contentHeading: string;
}
