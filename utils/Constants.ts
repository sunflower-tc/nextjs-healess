import { t } from '@lingui/macro';

export const MODE = 'development';
export const BASE_URL = 'http://localhost:3000';
export const MAGENTO_URL = 'https://devmagento.webkul.com/voguish/pub/';
export const MAGENTO_REST_API_URL = MAGENTO_URL + 'rest/V1/';

export const PLACEHOLDER_IMG = '/assets/img/products/placeholder.jpg';
export const BANNERPLACEHOLDER_IMG =
  '/assets/img/dummy/sellers/banner-image-placeholder.png';
export const Pattern = '/assets/img/bgpattern.jpg';
export const top_selling = 1;
export const top_rated = 2;
export const top_brand = 3;
export const LOADING = 'loading';

export const TABS = [
  { id: top_selling, title: t`Top Selling` },
  { id: top_rated, title: t`Top Rated` },
  { id: top_brand, title: t`Top Deals` },
];

export const limiter = [9, 27, 54, 72, 100];

export const searchAction = 'search';
export const sortByAction = 'sortBy';
export const sortDirAction = 'sortDir';
export const sortAction = 'sort';
export const resetAction = 'reset';
export const viewAction = 'view';
export const priceRangeFilterAction = 'price';
export const colorFilterAction = 'color';
export const categoryIDFilterAction = 'category_id';
export const filterAction = 'filter';

export const LAYOUT_1 = 1;
export const LAYOUT_2 = 2;
export const LAYOUT_3 = 3;

export const FEEDS_FRACTION = 20;
export const authorizationErr = t`The current customer is not authorized.`;
