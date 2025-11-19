import { Trans } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import { ProductItemInterface, Thumbnail } from '@voguish/module-catalog';
import { useRelatedProductsQuery } from '@voguish/module-catalog/hooks';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Placeholder } from './Item';
// Import Swiper styles
import { Rating } from '@mui/material';
import { FEEDS_FRACTION } from '@utils/Constants';
import { HTMLRenderer } from '@voguish/module-theme';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AddToWishlist from './Detail/AddToWishlist';

const RelatedProducts = ({ productSku }: { productSku: string }) => {
  const swiperRef = useRef<any>();

  const { data, loading } = useRelatedProductsQuery({ sku: productSku });
  const products = data?.products?.items?.[0]?.related_products || [];
  // Placeholders for Product List
  const placeHolders = new Array(12).fill(0);
  return (
    <Stack
      className={
        '-mb-5 max-w-[95vw] max-w-[95dvw] product_card related_products '
      }
      paddingY={1}
    >
      {!isValidArray(products) && (
        <Typography variant="h2" className="pb-2">
          <Trans>Related Products</Trans>
        </Typography>
      )}

      {loading ? (
        <Grid container spacing={4}>
          {placeHolders.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={`${index + item}`}>
              <Placeholder />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="w-full mx-auto product_card related_products ">
          {isValidArray(products) && (
            <div className="relative flex items-center h-full py-0 mx-0 overflow-hidden cursor-pointer sm:px-6 md:px-0 md:mx-auto">
              {products.length > 3 && (
                <button
                  aria-label="slide left"
                  aria-describedby="left arrow"
                  className="relative z-10 items-center justify-center hidden w-12 px-2 bg-white border-0 rounded-full shadow-md cursor-pointer h-11 max-w-min left-4 md:flex max-h-fit"
                  onClick={() => swiperRef.current.slidePrev()}
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

              <Swiper
                observeParents={true}
                observer={true}
                rewind={true}
                navigation={false}
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={30}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                breakpoints={{
                  100: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                  },
                  375: {
                    slidesPerView: 1.5,
                    spaceBetween: 16,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  // when window width is >= 1060px
                  1060: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                className="px-0 mx-0 mySwiper"
              >
                {products?.map((item: ProductItemInterface) => (
                  <SwiperSlide key={item.id}>
                    <article
                      className="grid cursor-pointer group hover:shadow-[0px_4px_24px_0px_rgba(0,_0,_0,_0.11)] duration-300 -z-10 border-solid grid-rows-[min-content,1fr] text-left bg-[#fff] rounded-md border gap-4 w-[20.425rem] min-h-full
                   border-[#D2D2D2]"
                    >
                      <div className="w-full border-b border-solid border-0 border-[#D2D2D2] relative h-[19.8rem] aspect-square truncate rounded-t-md">
                        <Link href={`/catalog/product/${item?.url_key}`}>
                          <Thumbnail
                            alt={item?.name}
                            thumbnail={item?.thumbnail?.url}
                            fill
                            className="object-contain object-center max-w-full truncate transition duration-500 cursor-pointer max-h-fit aspect-square md:object-scale-down group-hover:scale-110 rounded-t-md"
                          />
                        </Link>
                        <div className="">
                          <AddToWishlist productSku={item?.sku} />
                        </div>
                      </div>
                      <div className="flex items-start px-4">
                        <p className=" text-black text-lg my-0 font-normal leading-[1.56rem] max-w-[90%] max-h-fit line-clamp-2">
                          <HTMLRenderer
                            className="my-0"
                            htmlText={item?.name}
                          />
                        </p>
                      </div>
                      <footer className="flex items-center justify-between px-4 pb-4">
                        <p className="text-black my-0 text-[1.375rem] font-semibold leading-[1.97rem]">
                          {getFormattedPrice(
                            item?.price_range?.maximum_price?.final_price
                              ?.value,
                            item?.price_range?.maximum_price?.final_price
                              ?.currency
                          )}
                        </p>
                        <div className="flex items-center mt-0.5 gap-1">
                          <Rating
                            size="medium"
                            className="text-brand"
                            max={1}
                            defaultValue={
                              item?.rating_summary
                                ? item?.rating_summary / 100
                                : 0
                            }
                            precision={0.1}
                            readOnly
                          />

                          <p className="mt-0.5 text-neutral-900 text-[1.25rem] my-0 font-normal leading-[1.58rem] tracking-[0.0425rem]">
                            {(
                              (item?.rating_summary || 0) / FEEDS_FRACTION
                            ).toFixed(1)}
                          </p>
                        </div>
                      </footer>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
              {products.length > 3 && (
                <button
                  aria-label="slide right"
                  aria-describedby="right arrow"
                  className="relative z-10 items-center justify-center hidden px-2 py-0 mx-0 bg-white border-0 rounded-full shadow-md cursor-pointer h-11 w-14 max-w-min right-4 md:flex max-h-fit"
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
          )}
        </div>
      )}

      {!isValidArray(products) && (
        <Typography className="mt-1">
          <Trans>No Products yet!!</Trans>
        </Typography>
      )}
    </Stack>
  );
};

export default RelatedProducts;
