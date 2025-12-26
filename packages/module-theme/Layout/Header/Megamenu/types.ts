export interface MenuItem {
  url_key: string;
  title: string;
  item_id: string;
  position: number;
  parent_id: number;
  path: string;
  category_id: number;
  display_mode: string;
  image_url: string;
  include_in_menu?: string;
}

export interface MegaMenuQueryResult {
  megaMenu: MenuItem[];
}

export type Merge<A, B> = Omit<A, keyof B> & B;
export type FormattedMenuItem = Merge<
  Omit<MenuItem, 'category_id' | 'display_mode'>,
  {
    url_key: string;
    children: Record<string, FormattedMenuItem>;
    name?: string;
  }
>;
