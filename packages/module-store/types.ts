export interface StoreConfigQueryResult {
  storeConfig: StoreConfigInterface;
  availableStores?: any;
}

export interface Region {
  code: string;
  id: number;
  name: string;
}

export interface Country {
  available_regions: Region[];
  full_name_english: string;
  full_name_locale: string;
  id: string;
  three_letter_abbreviation: string;
  two_letter_abbreviation: string;
}

export interface CountryQueryResult {
  country: Country;
}

export interface CountriesQueryResult {
  countries: Country[];
}

export interface StoreConfigInterface {
  setOpenCart?: boolean;
  base_currency_code?: string;
  base_url?: string;
  catalog_default_sort_by?: string;
  category_url_suffix?: string;
  copyright?: string;
  customer_token_lifetime: string;
  default_description?: string;
  default_display_currency_code?: string;
  default_keywords?: string;
  default_title?: string;
  grid_per_page?: number;
  grid_per_page_values?: string;
  head_includes?: string;
  head_shortcut_icon?: string;
  header_logo_src?: string;
  is_default_store?: boolean;
  list_mode?: string;
  list_per_page?: number;
  list_per_page_values?: string;
  locale?: string;
  logo_alt?: string;
  logo_height?: number;
  logo_width?: number;
  marketplace_is_active?: string;
  minimum_password_length?: string;
  product_url_suffix?: string;
  show_cms_breadcrumbs?: number;
  store_code?: string;
  store_group_name?: string;
  store_name?: string;
  title_prefix?: string;
  title_separator?: string;
  title_suffix?: string;
  welcome?: string;
  currentStore?: any;
  countries?: Country[];
  currentCurrency?: any;
  setProduct?: object | any;
}
