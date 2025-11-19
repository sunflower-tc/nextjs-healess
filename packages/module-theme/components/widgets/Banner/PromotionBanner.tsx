import { Thumbnail } from '@voguish/module-catalog';
import { BannerImage } from '@voguish/module-theme/types/home-page';
import { Link } from '../../ui';
const PromotionBanner = ({ items }: { items: BannerImage[] }) => {
  return (
    <div className="2xl:max-w-[90rem] mx-auto">
      <div className="grid gap-5 px-6 lg:grid-cols-2 group">
        {items.map((item, index) => (
          <div
            style={{ backgroundColor: item?.dominantColor }}
            className="flex items-baseline cta w-full h-full [&:nth-child(2)]:min-h-[16.68rem] justify-between last:min-h-[16.68rem] grid-rows-2 first:row-span-2"
            key={item?.id}
          >
            <div className="flex items-center hover:scale-[1.005] duration-300 justify-between w-full h-full gap-8 py-8 group-first:py-6 group-first:px-6 px-7 columns-4">
              <div className="flex flex-col cta justify-center h-full w-[56.5%] ">
                <h2
                  className={`text-[1.375rem] line-clamp-2 mt-0 md:text-[2.5rem] leading-6 md:leading-[4.5rem] ${
                    index === 0 ? 'mb-2 md:mb-[1.31rem]' : 'mb-2 md:mb-3'
                  } font-bold text-black`}
                >
                  {item?.bannerTitle}
                </h2>
                <p
                  className={`${
                    index === 0
                      ? 'mb-2 md:mb-[1.81rem]'
                      : 'mb-2 md:mb-[0.87rem]'
                  } text-sm text-[#64687A] my-0 font-normal line-clamp-4`}
                >
                  {item?.bannerDesc}
                </p>
                <Link
                  className="text-base leading-[1.375rem] no-underline hover-underline-animation max-w-fit my-0 line-clamp-1 font-semibold text-brand"
                  href={`/catalog/${item.bannerType}/${item?.urlKey}`}
                >
                  {item?.buttonText}
                </Link>
              </div>
              <div className="flex relative items-end justify-end shrink-0 min-h-[11.5rem] max-h-[24rem] md:min-h-full w-[43.5%]">
                <Thumbnail
                  loading="lazy"
                  alt={item?.bannerTitle}
                  fill
                  className="object-contain"
                  thumbnail={item.url}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PromotionBanner;
