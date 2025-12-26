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
  open_new_tab?: boolean;
  url_key: string;
};
