// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import ProductBanner from '@voguish/module-theme/components/widgets/Banner/ProductBanner';
import { BannerImage } from '@voguish/module-theme/types/home-page';
import { useRef } from 'react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
export default function BannerSlide({
  items,
}: {
  loading: boolean;
  items: BannerImage[];
}) {
  const swiperRef = useRef<any>();
  const pagination = {
    el: '.swiper-custom-pagination',
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<div class="${className}">Custom Pagination ${index + 1}</div>`;
    },
  };

  return (
    <ErrorBoundary>
      {' '}
      <div className="relative flex justify-center w-full mt-6 mb-3 overflow-hidden">
        <Swiper
          rewind={true}
          effect={'fade'}
          creativeEffect={{
            prev: {
              opacity: 0,
            },
            next: { opacity: 1 },
          }}
          fadeEffect={{ crossFade: true }}
          modules={[EffectFade, Navigation, Autoplay]}
          pagination={pagination}
          slidesPerView={1}
          spaceBetween={8}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full h-full mySwiper group"
        >
          {items?.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{ backgroundColor: item?.dominantColor }}
              className="bg-[#f9f9f9] w-full flex justify-center items-center"
            >
              {({ isActive }) => (
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 1 }}
                >
                  <ProductBanner data={item} swiperRef={swiperRef} />{' '}
                </motion.div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-[47%] max-w-[90rem] max-h-fit mx-auto bottom-0 px-3 z-10 flex items-center justify-between w-full">
          {items.length >= 2 && (
            <button
              aria-label="slide left"
              aria-describedby="left arrow"
              className="relative items-center justify-center hidden w-12 h-12 duration-300 bg-white border-0 rounded-full cursor-pointer rtl:mr-1 rtl:rotate-180 ltr:ml-1 hover:scale-105 hover:shadow-xl 2xl:rtl:-mr-1 2xl:rtl:-ml-1 md:flex"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4771_10398"
                  maskUnits="userSpaceOnUse"
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                >
                  <rect x="2" y="2" width="20" height="20" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_4771_10398)">
                  <path
                    d="M9.83471 18.5L3 11.75M3 11.75L9.83471 5M3 11.75H21"
                    stroke="#5C5C5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
          )}
          {items.length >= 2 && (
            <button
              aria-label="slide right"
              aria-describedby="right arrow"
              className="hidden bg-white rounded-full hover:scale-105 duration-300 rtl:rotate-180 hover:shadow-xl items-center justify-center h-12 w-12 cursor-pointer rtl:mr-1.5 2xl:rtl:ml-6  ltr:mr-1.5 2xl:ltr:ml-6 border-0 top-2.5 md:flex"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_4771_10404"
                  maskUnits="userSpaceOnUse"
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                >
                  <rect
                    width="20"
                    height="20"
                    transform="matrix(-1 0 0 1 22 2)"
                    fill="#D9D9D9"
                  />
                </mask>
                <g mask="url(#mask0_4771_10404)">
                  <path
                    d="M14.1653 18.5L21 11.75M21 11.75L14.1653 5M21 11.75H3"
                    stroke="#5C5C5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
          )}
        </div>
        <div className="swiper-custom-pagination"></div>
      </div>
    </ErrorBoundary>
  );
}
