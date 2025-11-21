import { ConfigurableProductOption } from './Components/Product/Item/ConfigOptions/types';

/**
 * Products List
 */
export interface ProductsInterface {
  title?: string;
  showLayeredNavigation?: boolean;
  showToolBar?: boolean;
  showPagination?: boolean;
  productsInput?: ProductsQueryInput;
  showCount?: boolean;
  openSortby?: boolean;
  activePageFilter?: string | null;
  activePageFilterValue?: string | null;
  search?: string;
  subCategoryItem?: CategoryItem;
}

/**
 * Page Info
 */
interface PageInfoInterface {
  current_page: number;
}

/**
 * Options with value and label
 */
type Options = {
  label: string;
  value: string;
};

/**
 * Sort Fields
 */
export type SortFields = {
  default: string;
  options: Options[];
};

/**
 * Layered Navigation Options
 */
type LayeredNavigationOptions = {
  count: number;
  label: string;
  value: string;
};

/**
 * Aggregation
 */
export interface AggregationInterface {
  attribute_code: string;
  count: number;
  label: string;
  position: number;
  options: LayeredNavigationOptions[];
}

/**
 * Applied Layer Filter
 */
export type AppliedLayerFilter = {
  attribute_code: string;
  label: string;
  value: string;
  options: Options[];
};

export interface ProductsResultInterface {
  items: ProductItemInterface[];
  aggregations: AggregationInterface[];
  applied_filters: AppliedLayerFilter[];
  page_info: PageInfoInterface;
  sort_fields: SortFields;
  total_count: number;
}

/**
 * Products List
 */
export interface ProductsListInterface {
  products: ProductsResultInterface;
}

export interface RelatedProductItemInterface {
  related_products: ProductItemInterface[];
}

export type RelatedProductsResultInterface = Omit<
  ProductsResultInterface,
  'items'
> & { items: RelatedProductItemInterface[] };

export interface RelatedProductsListInterface {
  products: RelatedProductsResultInterface;
}

/**
 * Product Thumbnail
 */
interface ProductThumbnail {
  id: string;
  label: string;
  url: string;
  __typename: string;
}

/**
 * Money
 */
export interface Money {
  currency: string;
  value: number;
}

/**
 * Discount
 */
interface Discount {
  amount_off: number;
  percent_off: number;
}

/**
 * Product Price
 */
export interface ProductPrice {
  discount: Discount;
  final_price: Money;
  regular_price: Money;
  minimumPrice?: PriceRange;
}

/**
 * Price Range
 */
interface PriceRange {
  maximum_price: ProductPrice;
  minimum_price: ProductPrice;
}

/**
 * HTML Content
 */
export type HTMLContent = {
  html: string;
};

/**
 * Product Item
 */
export interface ProductItemInterface {
  id: string | number;
  name: string;
  loading?: boolean;
  sku: string;
  url_key: string;
  __typename: 'SimpleProduct' | 'ConfigurableProduct';
  thumbnail?: ProductThumbnail;
  image?: ProductImage;
  configurable_options: ConfigurableProductOption[];
  price_range: PriceRange;
  meta_description: string;
  meta_keyword: string;
  stock_status: 'IN_STOCK' | 'OUT_OF_STOCK';
  meta_title: string;
  short_description: HTMLContent;
  description: HTMLContent;
  review_count: number;
  variants?: ConfigurableVariant[];
  rating_summary: number;
  formattedPrice?: string;
  canonical_url?: string;
  media_gallery?: MediaGallery[];
  reviews: ProductReviews;
}

export interface ProductImage {
  label: string;
  path: string;
  url: string;
}

export type ConfigurableAttributeOption = {
  code: string;
  label: string;
  uid: string;
  value_index: number;
};

export interface ConfigurableVariant {
  product: ProductItemInterface;
  attributes: ConfigurableAttributeOption[];
}

export interface ProductPageProps {}
/**
 * Filter Equal Type
 */
export type FilterEqualTypeInput = {
  // eslint-disable-next-line no-unused-vars
  [key in 'eq' | 'in']?: string | string[];
};

export type TabsProp = {
  id: number;
  name: string;
  render: () => React.ReactElement; // eslint-disable-line
};

export interface DetailProp {
  product: ProductItemInterface;
  loading?: boolean;
}

export type ProductReviewRatingValueMetadata = {
  value: string;
  value_id: string;
};

export type ProductReviewRatingMetadata = {
  id: string;
  name: string;
  values: ProductReviewRatingValueMetadata[];
};

export type ProductReviewRatingsMetadata = {
  productReviewRatingsMetadata: {
    items: ProductReviewRatingMetadata[];
  };
};

// export interface data {
//   id?: number | string;
//   sku?: string;
//   qty?: number | string;
// }

export interface Category {
  available_sort_by: string;
  children?: object | [];
  canonical_url: string;
  children_count: string;
  custom_layout_update_file: string;
  default_sort_by: string;
  description: string;
  display_mode: string;
  filter_price_range: string;
  image: string;
  include_in_menu: number;
  is_anchor: number;
  landing_page: number;
  level: number;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  name: string;
  path: string;
  path_in_store: string;
  position: number;
  product_count: number;
  uid: string;
  url_key: string;
  url_path: string;
  url_suffix: string;
}

export interface MediaGallery {
  disabled?: boolean;
  label?: string;
  position?: number;
  url?: string;
  map?: any;
  originalAlt?: string;
  name?: string;
  originalTitle?: string;
  thumbnailAlt?: string;
}

export interface ProductReviews {
  items: ProductReview[];
}

export interface ProductReviewRating {
  name: string;
  value: string;
}

export interface ProductReview {
  average_rating: number;
  created_at: string;
  nickname: string;
  ratings_breakdown: ProductReviewRating[];
  summary: string;
  text: string;
}

/**
 * Filter Match
 */
export type FilterMatchTypeInput = {
  match: string;
};

/**
 * Filter Range
 */
export type FilterRangeTypeInput = {
  from: string;
  to: string;
};

/**
 * Product Attribute Filter
 */
export type ProductAttributeFilterInput = {
  [key: string]:
    | FilterEqualTypeInput
    | FilterMatchTypeInput
    | FilterRangeTypeInput;
};

/**
 * Sort Options
 */
export type SortOptions = 'name' | 'price' | 'position' | 'relevance';

/**
 * Product Attribute Sort
 */
type ProductAttributeSortInput = {
  // eslint-disable-next-line no-unused-vars
  [key in SortOptions]?: 'ASC' | 'DESC';
};

/**
 * Products Inout
 */
export interface ProductsQueryInput {
  search?: string;
  sku?: string;
  filters?: ProductAttributeFilterInput;
  pageSize?: number;
  currentPage?: number;
  sort?: ProductAttributeSortInput;
}

/**
 * Products Inout
 */
export interface RelatedProductsQueryInput {
  sku: string;
  pageSize?: number;
  currentPage?: number;
  sort?: ProductAttributeSortInput;
}

/**
 * Configurable Product Options Values
 */
// export type ConfigurableProductOptionsValues = {
//   value_index: number;
//   swatch_data?: {
//     __typename: 'TextSwatchData' | 'ColorSwatchData' | 'DropdownData';
//     value: string;
//   };
//   uid: string;
//   label: string;
// };

/**
 * Configurable Product Options
 */
// export type ConfigurableProductOption = {
//   attribute_code: string;
//   uid: string;
//   label: string;
//   swatchType: 'TextSwatchData' | 'ColorSwatchData' | 'DropdownData';
//   position: number;
//   values: ConfigurableProductOptionsValues[];
// };

/**
 * Pagination Action
 */
export enum PaginationActionType {
  PAGE = 'page', // eslint-disable-line
  LIMIT = 'limit', // eslint-disable-line
}

/**
 * Toolbar Action
 */
export enum ToolbarActionType {
  SORT = 'sort', // eslint-disable-line
  VIEW = 'view', // eslint-disable-line
}

/**
 * Products List Action Type
 */
export type ProductsActionType =
  | PaginationActionType
  | ToolbarActionType
  | 'filter'
  | 'search'
  | 'limit'
  | 'removeFilter';

/**
 * Products Action
 */
export type ProductsAction = {
  type: ProductsActionType;
  payload: string | number | ProductAttributeFilterInput;
};

/**
 * Product List View Type
 */
export enum ProductListViewType {
  GRID = 'grid', // eslint-disable-line
  LIST = 'list', // eslint-disable-line
}

/**
 * Product Listing View
 */
export type ProductListingView = ProductListViewType;

/**
 * Toolbar Props
 */
export type ToolbarProps = {
  sortFields: SortFields | undefined;
  view: ProductListingView;
  sort: string;
  manageToolbarAction: ({
    action, // eslint-disable-line
    payload, // eslint-disable-line
  }: {
    action: ToolbarActionType;
    payload: string | ProductListingView;
  }) => void;
};
/**
 * Toolbar Props
 */
export type SortModal = {
  sortFields: SortFields | undefined;
  sort: string;
  open: any;
  sortHandler: any;

  manageToolbarAction: ({
    action, // eslint-disable-line
    payload, // eslint-disable-line
  }: {
    action: ToolbarActionType;
    payload: string | ProductListingView;
  }) => void;
};

/**
 * Categories
 */
export interface CategoryItemPaths {
  url_key: string;
}

export interface CategoryBreadcrumb {
  category_level: number;
  category_name: string;
  category_uid: string;
  category_url_key: string;
  category_url_path: string;
}

export interface CategoryItem extends CategoryItemPaths {
  name: string;
  description: string;
  uid: string;
  breadcrumbs: CategoryBreadcrumb[];
  product_count: number;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
}

export interface CategoriesQueryResult {
  categoryList: CategoryItem[];
}

export interface CategoriesPaths {
  uid: string;
  url_key: string;
}

// eslint-disable-next-line
export type ReviewBreakdown = { [key in string]: number };
