import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { PLACEHOLDER_IMG } from '@utils/Constants';
import { isValidArray } from '@utils/Helper';
import {
  MediaGallery,
  ProductItemInterface,
} from '@voguish/module-catalog/types';
import { Autoplay, FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { useAppSelector } from '@store/hooks';
import { useCallback, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Thumbnail from '../Item/Thumbnail';
export interface ReactImage {
  originalAlt?: string;
  originalTitle?: string;
  thumbnail?: string;
  original?: string;
  thumbnailAlt?: string;
  originalWidth?: number;
  originalHeight?: number;
  thumbnailHeight?: number;
  thumbnailWidth?: number;
}
export function ProductImageGallery(props: {
  name: string;
  product: ProductItemInterface;
}) {
  let { name, product } = props;
  let currentThumbail = useAppSelector(
    (state) => state?.storeConfig?.setProduct
  );
  const mediaGalleryProduct =
    product?.__typename === 'ConfigurableProduct'
      ? currentThumbail?.product
      : product;
  let images: ReactImage[] = mediaGalleryProduct?.media_gallery?.map(
    (image: MediaGallery) => ({
      original: image.url || PLACEHOLDER_IMG,
      thumbnail: image?.url,
      originalAlt: currentThumbail?.name,
      thumbnailAlt: currentThumbail?.name,
      originalTitle: currentThumbail?.name,
      originalWidth: 350,
      originalHeight: 330,
      thumbnailHeight: 144,
      thumbnailWidth: 144,
    })
  ) || [
    {
      original: currentThumbail?.product?.image?.url || PLACEHOLDER_IMG,
      thumbnail: currentThumbail?.product?.image?.url,
      originalAlt: currentThumbail?.product?.name,
      thumbnailAlt: currentThumbail?.product?.name,
      originalTitle: currentThumbail?.product?.name,
      originalWidth: 350,
      originalHeight: 330,
      thumbnailHeight: 144,
      thumbnailWidth: 144,
    },
  ];

  if (!isValidArray(images)) {
    images = [
      {
        original: PLACEHOLDER_IMG,
        thumbnail: PLACEHOLDER_IMG,
        originalAlt: name,
        thumbnailAlt: name,
        originalTitle: name,
        originalWidth: 350,
        originalHeight: 330,
        thumbnailHeight: 144,
        thumbnailWidth: 144,
      },
    ];
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null) as any;
  const sliderRef = useRef(null) as any;

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="product_slider">
      <Swiper
        ref={sliderRef}
        spaceBetween={10}
        navigation={false}
        loop={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Autoplay, FreeMode, Thumbs]}
        className="relative truncate border border-solid mySwiper2 border-commonBorder"
      >
        {images.map((item, index: number) => (
          <SwiperSlide
            className="max-h-[30rem] min-h-[20rem] aspect-square"
            key={index * 3 + index + 1}
          >
            <div className="swiper-zoom-container">
              <Thumbnail
                priority={true}
                fill
                className="object-contain object-center rounded-lg aspect-square max-h-fit"
                alt={`image-${item?.originalAlt || '' + item?.originalTitle} `}
                thumbnail={item?.thumbnail || PLACEHOLDER_IMG}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`flex items-center -lg:hidden ${
          images.length > 1 ? 'justify-between' : 'justify-center'
        } mt-6`}
      >
        {images.length > 1 && (
          <button
            aria-label="previous-slide"
            className="flex items-center justify-center p-2 bg-white border-0 rounded-full cursor-pointer"
            onClick={handlePrev}
          >
            <ArrowRightIcon className="text-4xl text-brand rotate-180" />
          </button>
        )}
        <div className="flex min-w-[80%]">
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            modules={[Autoplay, FreeMode, Thumbs]}
            className="flex justify-center w-full gap-5 -lg:hidden mySwiper max-h-fit"
          >
            {images.map((item, index: number) => (
              <SwiperSlide
                className=" border border-solid rounded-md z-30 min-w-fit cursor-pointer truncate !mr-0 border-commonBorder max-w-fit"
                style={{ width: '70px', height: '70px' }}
                key={index * 4 + index + 1}
              >
                <Thumbnail
                  priority={true}
                  width={70}
                  className="object-contain p-1 rounded-lg aspect-square first:rtl:mr-0 first:ltr:ml-0"
                  height={70}
                  alt={`image-${
                    item?.originalAlt ||
                    '' + index * index + item?.originalTitle
                  } `}
                  thumbnail={item?.thumbnail || PLACEHOLDER_IMG}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {images.length > 1 && (
          <button
            aria-label="next-slide"
            className="flex items-center justify-center bg-white border-0 rounded-full cursor-pointer"
            onClick={handleNext}
          >
            <ArrowRightIcon className="text-4xl text-brand" />
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductImageGallery;
