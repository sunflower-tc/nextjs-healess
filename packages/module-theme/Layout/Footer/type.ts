export interface FooterLinksResult {
  footerLinks: [FooterLink];
}

export interface FooterLink {
  title: string;
  uid: string;
  subLinks: [SubLinks];
}

export type SubLinks = {
  title: string;
  uid: string;
  type: string;
  url_key: string;
};
