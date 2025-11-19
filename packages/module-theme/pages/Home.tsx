import { isValidArray, isValidObject } from '@utils/Helper';
import { Placeholder } from '@voguish/module-catalog';
import {
  BrandCollectionPlaceHolder,
  InfoTextPlaceHolder,
  MainBannerPlaceHolder,
  PromtionPlaceHolder,
  ShoppingBannerPlaceHolder,
  SiteInfoPlaceholder,
} from '@voguish/module-theme/components';

import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { HomePageData } from '../types/home-page';
const RecentlyViewed = dynamic(
  () => import('../components/widgets/RecentlyViewed'),
  {
    loading: () => (
      <>
        <InfoTextPlaceHolder extraClasses="mx-auto" />{' '}
        <div className="2xl:max-w-[90rem] mx-auto">
          <span className="pt-4">
            <div className="hidden md:flex">
              {new Array(5).fill(0).map((item, index) => (
                <div className="w-[20%]" key={`${index + item}`}>
                  <Placeholder />
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <Placeholder />
            </div>
          </span>
        </div>
      </>
    ),
  }
);
const ExploreProducts = dynamic(
  () => import('../components/widgets/ExploreProducts'),
  {
    loading: () => (
      <>
        <InfoTextPlaceHolder extraClasses="mx-auto" />{' '}
        <div className="2xl:max-w-[90rem] mx-auto">
          <span className="pt-4">
            <div className="hidden md:flex">
              {new Array(5).fill(0).map((item, index) => (
                <div className="w-[20%]" key={`${index + item}`}>
                  <Placeholder />
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <Placeholder />
            </div>
          </span>
        </div>
      </>
    ),
  }
);
const FeatureProducts = dynamic(
  () => import('../components/widgets/FeatureProducts'),
  {
    loading: () => (
      <>
        <InfoTextPlaceHolder extraClasses="mx-auto" />{' '}
        <div className="2xl:max-w-[90rem] mx-auto">
          <span className="pt-4">
            <div className="hidden md:flex">
              {new Array(5).fill(0).map((item, index) => (
                <div className="w-[20%]" key={`${index + item}`}>
                  <Placeholder />
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <Placeholder />
            </div>
          </span>
        </div>
      </>
    ),
  }
);
const Info = dynamic(() => import('../components/elements/Info'), {
  loading: () => <InfoTextPlaceHolder />,
});
const CornerOffer = dynamic(
  () => import('../components/widgets/CornerOfferSection'),
  { loading: () => <MainBannerPlaceHolder /> }
);
const MainBanner = dynamic(
  () => import('../components/widgets/Banner/MainBanner'),
  { loading: () => <MainBannerPlaceHolder /> }
);
const SiteInfo = dynamic(() => import('../components/widgets/SiteInfo'), {
  loading: () => <SiteInfoPlaceholder />,
});
const BannerSlide = dynamic(() => import('../Layout/HomeItems/BannerSlide'), {
  loading: () => <MainBannerPlaceHolder />,
});
const PromotionBanner = dynamic(
  () => import('../components/widgets/Banner/PromotionBanner'),
  { loading: () => <PromtionPlaceHolder /> }
);
const NewCollectionBanner = dynamic(
  () => import('../components/widgets/Banner/NewCollectionBanner'),
  { loading: () => <MainBannerPlaceHolder /> }
);

const ShoppingBanner = dynamic(
  () => import('../components/widgets/Banner/ShoppingBanner'),
  { loading: () => <ShoppingBannerPlaceHolder /> }
);
const HomeOfferSection = dynamic(
  () => import('../Layout/HomeItems/HomeOfferSection'),
  { loading: () => <BrandCollectionPlaceHolder /> }
);
const HomePage = ({ pageData }: { pageData: HomePageData }) => {
  const loading: boolean = false;
  const items = pageData?.getHomePageData || [];
  const list = pageData?.getHomePageData?.sortOrder.map((item: any) => {
    if (item?.sectionId === 'mainBanner') {
      return (isValidObject(items?.mainBanner[0]) &&
        items?.mainBanner[0]?.url !== '') ||
        null ? (
        <MainBanner key={item?.sortOrder} bannerData={items?.mainBanner[0]} />
      ) : (
        <MainBannerPlaceHolder />
      );
    } else if (item?.sectionId === 'promotionBanner') {
      return (
        isValidArray(items?.promotionBanner) && (
          <PromotionBanner
            key={item?.sortOrder}
            items={items?.promotionBanner}
          />
        )
      );
    } else if (
      item?.sectionId === 'featuredProductCarousel' &&
      isValidArray(items?.featuredProductCarousel?.productList)
    ) {
      return (
        <FeatureProducts
          key={item?.sortOrder}
          data={items?.featuredProductCarousel}
          loading={loading}
        />
      );
    } else if (item?.sectionId === 'newCollectionBanner') {
      return (
        isValidObject(items?.newCollectionBanner?.[0]) && (
          <div
            key={item?.sortOrder}
            style={{
              backgroundColor: items?.newCollectionBanner?.[0]?.dominantColor,
            }}
          >
            <NewCollectionBanner bannerData={items?.newCollectionBanner[0]} />
          </div>
        )
      );
    } else if (
      item?.sectionId === 'exploreProductCarousel' &&
      isValidArray(items?.exploreProductCarousel?.topRatedProductList) &&
      isValidArray(items?.exploreProductCarousel?.hotDealsProductList) &&
      isValidArray(items?.exploreProductCarousel?.topSellingProductList)
    ) {
      return (
        <Fragment key={item?.sortOrder}>
          <ExploreProducts
            products={items?.exploreProductCarousel}
            homeLoading={loading}
          />

          {isValidArray(items?.productCollectionBanner) && (
            <BannerSlide
              loading={loading}
              items={items?.productCollectionBanner}
            />
          )}
        </Fragment>
      );
    } else if (item?.sectionId === 'shoppingCollectionBanner') {
      return (
        isValidArray(items.shoppingCollectionBanner?.items) && (
          <ShoppingBanner
            key={item?.sortOrder}
            items={items.shoppingCollectionBanner}
          />
        )
      );
    } else if (item?.sectionId === 'productCollectionBanner') {
      return (
        isValidArray(items?.productCollectionBanner) && (
          <BannerSlide
            key={item?.sortOrder}
            loading={loading}
            items={items?.productCollectionBanner}
          />
        )
      );
    } else if (item?.sectionId === 'cornerOffers') {
      return (
        isValidArray(items?.cornerOffers?.items) && (
          <div key={item?.sortOrder} className="2xl:max-w-[90rem] mx-auto">
            <div className="pl-7 lg:px-7 ">
              <Info
                className="mx-1.5 md:!mx-3 2xl:!mx-0"
                heading={items?.cornerOffers?.title}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: items?.cornerOffers?.description,
                  }}
                ></span>
              </Info>
              <div className="hidden md:flex">
                <CornerOffer items={items?.cornerOffers} />
              </div>
            </div>
            <div className="md:hidden">
              <CornerOffer items={items?.cornerOffers} />
            </div>
          </div>
        )
      );
    } else if (item?.sectionId === 'brandCollectionBanner') {
      return (
        isValidArray(items?.brandCollectionBanner?.items) && (
          <HomeOfferSection
            key={item?.sortOrder}
            brandCollectionBanner={items?.brandCollectionBanner}
            loading={loading}
          />
        )
      );
    } else if (
      item?.sectionId === 'recentlyViewedProduct' &&
      isValidArray(items?.recentlyViewedProduct?.productList)
    ) {
      return (
        <RecentlyViewed
          key={item?.sortOrder}
          products={items?.recentlyViewedProduct}
          homeLoading={loading}
        />
      );
    } else if (item?.sectionId === 'benefits') {
      return (
        isValidArray(items?.benefits) && (
          <SiteInfo key={item?.sortOrder} items={items?.benefits} />
        )
      );
    } else {
      return null;
    }
  });
  return (
    <>
      <div className="grid mx-auto bg-white gap-y-16 max-w-[125rem]">
        {list}
      </div>
    </>
  );
};

export default HomePage;
