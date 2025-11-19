export interface StoresData {
  total_count: number;
  items: Items[];
}

export interface IStoreProps {
  store: Items;
}

export interface Items {
  banner_pic: string;
  seller_id: string;
  store_id: string;
  is_seller: boolean;
  logo_pic: string;
  privacy_policy: string;
  return_policy: string;
  shipping_policy: string;
  shop_title: string;
  shop_url: string;
  contact_number: string;
  seller_rating: string;
  product_count: string;
  order_count: string;
  email: string;
}

/**
 *types and interfaces of Review Component SellerReview Query
 */

export interface ISellerReviews {
  items: ISellerReviewsItems[];
  total_count: number;
  page_size: number;
  total_pages: number;
  current_page: number;
  // __typename:string;
}
export interface ISellerReviewsItems {
  admin_notification: string;
  buyer_email: string;
  buyer_id: string;
  created_at: string;
  entity_id: string;
  feed_nickname: string | null;
  feed_price: string;
  feed_quality: string;
  feed_review: string;
  feed_summary: string;
  feed_value: string;
  seller_id: string;
  seller_pending_notification: string;
  status: string;
  updated_at: string;
  rating?: number;
}

export interface IProps {
  id: number;
  reviews?: ISellerReviewsItems;
  totalRating: string;
}

export interface FilteredArrays {
  [key: number]: number;
}

/**
 *types and interfaces of Marketplace Landing Page/SellerIndexPage
 */
export type IMPProcess = {
  image: string;
  label: string;
};

export interface IMPBannerProps {
  bannerData: IBanner[];
  theme: boolean;
}

export interface IBanner {
  content: string;
  label: string;
  image: string;
}

/**
 *types and interfaces of SellerProfile Component
 */

export interface IProfileBannerProps {
  id: string;
  banner: string;
  logo: string;
  name: string;
  rating: string;
  orderCount: string;
  productCount: string;
}

// Profile Module in SellerProfile
export interface IProfileProps {
  id: number;
  rating: string;
  reviews?: ISellerReviews;
  returnPolicy: string;
  shippingPolicy: string;
  contactNumber: string;
  email: string;
  loading?: any;
}

/**
 *types and interfaces of [shop_url] page
 */

export interface IStore {
  shop_url: string;
}

export interface IParams {
  params: { shop_url: string };
}

export interface IPageData {
  data: { sellerData: ISellerReviews };
}
