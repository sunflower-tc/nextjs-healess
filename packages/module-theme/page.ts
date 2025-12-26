import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export interface BreadcrumbProps {
  label: string;
  url?: string;
  uid?: string;
}

/**
 * Page Options
 *
 * title: string - Title of the Page
 * description: string - Description of the Page
 * showBreadcrumb: Boolean - Configuration to show breadcrumb on Page
 * pageClassName: string - If would lie to any class name to page container
 * breadCrumbs: BreadcrumbProps - To Show Breadcrumbs in Chain
 */
export type PageOptions = {
  title?: string | any;
  canonical?: string;
  description?: string;
  showBreadcrumb?: boolean;
  pageClassName?: string;
  breadCrumbs?: BreadcrumbProps[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
};

/**
 * Next Page With Layout.
 */
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode; // eslint-disable-line no-unused-vars
  pageOptions?: PageOptions;
};

/**
 * Page Props
 */
export interface PagePaths {
  params: { [key in string]: string };
  locale?: string;
}

export type PagePathProps = PagePaths[] | CategoryPagePaths[] | [];
export interface CategoryPagePaths {
  params: { urlKey: string[] };
  locale?: string;
  ctx?: any;
}
