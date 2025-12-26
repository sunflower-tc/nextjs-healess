import { PLACEHOLDER_IMG } from '@utils/Constants';
import { BannerImage } from '@voguish/module-theme/types/home-page';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import ErrorBoundary from '../../ErrorBoundary';

type props = {
  data: BannerImage;
  swiperRef?: any;
};
const ProductBanner: FC<props> = ({ swiperRef, data: bannerData }: props) => {
  return (
    <ErrorBoundary>
      {' '}
      <section className="max-w-[99vw] lg:max-w-[78rem] flex items-center md:px-16 2xl:px-2 mx-auto bg-blend-overlay min-h-full">
        <div className="flex items-center w-full">
          <div className="relative grid items-stretch w-full gap-5 md:justify-between group md:grid-cols-7 xl:grid-cols-12">
            <div className="flex items-center px-6 md:px-0 pt-[2.94rem] pb-7 md:col-span-3 lg:col-span-2 xl:col-span-5">
              <div className="place-self-center">
                <h2 className="text-[2.5rem] my-0 leading-[3.25rem] max-w-[18.4375rem] pb-[0.31rem] font-bold text-black">
                  {bannerData?.bannerTitle}
                </h2>{' '}
                {bannerData?.bannerSubtitle && (
                  <p className="pb-4 my-0 text-xl font-bold text-brand">
                    {bannerData?.bannerSubtitle}
                  </p>
                )}
                <p className="text-[0.875rem] my-0 leading-[1.25rem] max-w-[22.8125rem] font-normal pb-8 text-[#64687A]">
                  {bannerData?.bannerDesc}
                </p>
                <Link
                  href={`/catalog/${bannerData?.bannerType}/${bannerData?.urlKey}`}
                  className="decoration-[none] no-underline"
                >
                  <button className="py-3 md:py-[0.875rem]  border-0 outline-0 hover:shadow-md cursor-pointer hover:scale-[1.005] duration-300 text-base max-w-fit font-semibold text-white px-5 md:px-[2.375rem] leading-normal bg-brand hover:bg-hoverButton">
                    {bannerData?.buttonText}
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative shrink flex md:col-span-4 lg:col-span-5 xl:col-span-7 items-end justify-center md:justify-end min-h-full mx-auto md:mx-0 aspect-auto w-full md:aspect-[unset] md:h-full h-auto">
              <Image
                height={500}
                width={710}
                decoding="auto"
                loading="lazy"
                blurDataURL={PLACEHOLDER_IMG}
                src={bannerData?.url}
                alt={bannerData?.bannerTitle}
                className={`max-w-full ${
                  swiperRef
                    ? 'object-contain object-center md:object-right'
                    : 'object-contain md:object-cover object-center w-full h-auto md:object-left containerPrimary:object-contain containerPrimary:object-right'
                } `}
              />
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};
export default ProductBanner;
