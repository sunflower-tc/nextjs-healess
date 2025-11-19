import { isValidObject } from '@utils/Helper';
import { Thumbnail } from '@voguish/module-catalog';
import { BannerImage } from '@voguish/module-theme/types/home-page';
import Link from 'next/link';
import { MainBannerPlaceHolder } from '../placeholders';

const MainBanner = ({ bannerData }: { bannerData: BannerImage }) => {
  return (
    <>
      {isValidObject(bannerData) ? (
        <div
          style={{ backgroundColor: bannerData?.dominantColor }}
          className="relative flex items-center justify-between w-full px-6 mx-auto truncate py-7 md:py-11"
        >
          <div className="md:border-2 md:border-[#BBD8DE] py-8 md:px-5 md:border-solid md:bg-[#fff] w-full">
            <h2 className="text-2xl md:text-5xl my-0 lg:text-[3.44rem] font-semibold leading-6 md:leading-[3.5625rem] text-black">
              {bannerData?.bannerTitle}
            </h2>
            <h2 className="text-base md:text-[2rem] my-0 font-normal mt-3.5 md:mt-7 uppercase leading-normal text-[#262441]">
              {bannerData?.bannerSubtitle}
            </h2>
            <h2 className="text-[#163564] text-xl my-0 md:text-6xl lg:text-8xl font-extrabold leading-6 md:leading-[4.375rem] md:mt-0.5">
              {bannerData?.bannerDesc}
            </h2>
            <Link
              href={`/catalog/${bannerData?.bannerType}/${bannerData?.urlKey}`}
              className="decoration-[none] no-underline"
            >
              <button className="py-3 border-0 hover:bg-blend-darken cursor-pointer hover:shadow-lg hover:scale-[1.005] duration-200 md:py-3.5 text-base font-semibold mt-1 md:mt-4 leading-normal text-white px-6 md:px-9 bg-brand hover:bg-hoverButton">
                {bannerData?.buttonText}
              </button>
            </Link>
          </div>
          <div
            style={{ backgroundColor: bannerData?.dominantColor }}
            className="absolute right-0 outline-0 flex w-full hover:shadow-md hover:scale-[1.01] duration-300 max-w-[75%] md:max-w-[62%] h-full translate-x-28 xl:translate-x-36 skew-x-[-26deg] shadow-[0px_-16px_15px_rgba(0,_0,_0,_0.2)]"
          >
            <Thumbnail
              alt={bannerData?.bannerTitle}
              fill
              loading="eager"
              priority={true}
              thumbnail={bannerData.url}
              className="object-contain aspect-video max-w-[58.8%] mx-5 sm:mx-8 md:mx-16 skew-x-[27deg] p-4 md:p-12 h-[88%]"
            />
          </div>
        </div>
      ) : (
        <MainBannerPlaceHolder />
      )}
    </>
  );
};
export default MainBanner;
