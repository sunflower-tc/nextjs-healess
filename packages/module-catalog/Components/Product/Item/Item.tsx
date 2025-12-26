import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { FEEDS_FRACTION } from '@utils/Constants';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import {
  ProductItemInterface,
  ProductListViewType,
  ProductListingView,
} from '@voguish/module-catalog/types';
import useDeviceDetection from '@voguish/module-compare/Hooks/useDeviceType';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { HTMLRenderer } from '@voguish/module-theme/components/HTMLRenderer';
import Link from 'next/link';
import { decode } from 'base-64';
import dynamic from 'next/dynamic';
import { FormProvider, useForm } from 'react-hook-form';
import ConfigOptions from './ConfigOptions';
import Thumbnail from './Thumbnail';
const Rating = dynamic(() => import('@mui/material/Rating'), {
  loading: () => (
    <div className="w-3 h-3 mr-1 bg-gray-200 rounded-sm animate-pulse" />
  ),
  ssr: false,
});
const AddToWishlist = dynamic(() => import('../Detail/AddToWishlist'));
const AddToCompare = dynamic(
  () => import('@voguish/module-compare/Components/AddToCompare')
);

export const ProductItem = ({
  product,
  config = true,
  view = ProductListViewType.GRID,
  index,
}: {
  config?: boolean;
  product: ProductItemInterface;
  view?: ProductListingView;
  index?: number;
}) => {
  const methods = useForm<AddProductsToCartInput>();
  const device = useDeviceDetection();
  return (
    <Card
      className={`relative cursor-pointer col-span-1 !z-0 max-h-[30rem] hover:shadow-lg w-full duration-500 group rounded-md ${
        view !== ProductListViewType.LIST
          ? 'flex flex-col justify-between'
          : 'grid md:flex md:items-center md:p-4'
      }`}
      variant="outlined"
      sx={{
        height: '100%',
        paddingBottom: 0,
      }}
    >
      <CardActionArea
        className={`truncate object-contain mx-auto flex items-center justify-center ${
          view !== ProductListViewType.LIST
            ? 'w-full truncate border-commonBorder  border-b border-0 border-solid'
            : 'w-full md:w-56 md:h-44 rounded-md border-commonBorder md:aspect-square border border-solid'
        }`}
      >
        <CardMedia
          className={`h-full object-contain relative aspect-square object-bottom ${
            view !== ProductListViewType.LIST
              ? 'w-full md:w-64 min-h-[10rem] h-40 sm:h-80'
              : 'w-full md:w-56 min-h-[20rem] md:min-h-[11rem] h-80 md:h-44 md:aspect-square md:truncate'
          } text-center`}
        >
          <ErrorBoundary>
            <Link
              className="-z-10"
              href={`/catalog/product/${product?.url_key}`}
            >
              <Thumbnail
                // decoding="sync"
                // @ts-ignore
                quality={true}
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className={`object-center ${
                  view !== ProductListViewType.LIST ? '' : 'rounded-md'
                } group-hover:scale-105 object-contain truncate duration-300`}
                thumbnail={product.thumbnail?.url}
                fill
                alt={product?.name}
              />
            </Link>
          </ErrorBoundary>
        </CardMedia>
      </CardActionArea>
      <div
        className={`duration-500 ease-in-out ${
          device === 'Desktop' && 'group-hover:xl:opacity-100 xl:opacity-0'
        }`}
      >
        <ErrorBoundary>
          <AddToCompare
            productId={product?.uid && parseInt(decode(`${product?.uid}`))}
            productSku={product?.sku}
            detailsPage={false}
            view={view}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <AddToWishlist productSku={product.sku} view={view} />
        </ErrorBoundary>
      </div>
      <div
        className={`w-full p-4
          ${
            view !== ProductListViewType.LIST
              ? 'grid items-center gap-4 content-between grid-rows-[min-content,43px,1fr]'
              : 'flex justify-start md:justify-center gap-4 w-full flex-col'
          }
       `}
      >
        {' '}
        <div
          className={`${
            view !== ProductListViewType.LIST ? 'hidden' : 'px-3 hidden md:flex'
          } flex items-center justify-end mt-0.5 gap-1`}
        >
          <ErrorBoundary>
            <Rating
              size="medium"
              className="hidden text-brand sm:flex"
              max={1}
              defaultValue={
                product?.rating_summary ? product?.rating_summary / 100 : 0
              }
              precision={0.1}
              readOnly
            />
            <Rating
              size="small"
              className="flex text-brand sm:hidden"
              max={1}
              defaultValue={
                product?.rating_summary ? product?.rating_summary / 100 : 0
              }
              precision={0.1}
              readOnly
            />
          </ErrorBoundary>
          <p className="mt-0.5 text-neutral-900 text-sm sm:text-[1.25rem] my-0 font-normal leading-[1.58rem] tracking-[0.0425rem]">
            {((product?.rating_summary || 0) / FEEDS_FRACTION).toFixed(1)}
          </p>
        </div>
        <ErrorBoundary>
          {config && (
            <div className="flex items-center border">
              {isValidArray(product?.configurable_options) && (
                <FormProvider {...methods}>
                  <form>
                    <ConfigOptions
                      configurableOptions={product.configurable_options}
                    />
                  </form>
                </FormProvider>
              )}
            </div>
          )}
        </ErrorBoundary>{' '}
        <ErrorBoundary>
          <Link
            href={`/catalog/product/${product?.url_key}`}
            className="w-full h-full no-underline"
          >
            <Typography
              variant="CartItemPrice"
              className="max-w-[80%] flex items-start font-normal line-clamp-2 leading-normal lg:leading-[1.55rem]"
            >
              <HTMLRenderer htmlText={product?.name || ''}></HTMLRenderer>
            </Typography>
          </Link>
        </ErrorBoundary>
        <footer className="flex items-center justify-between w-full">
          <ErrorBoundary>
            <p className="text-black my-0 text-lg sm:text-[1.375rem] font-semibold leading-[1.97rem]">
              {getFormattedPrice(
                product?.price_range?.minimum_price?.final_price?.value,
                product?.price_range?.minimum_price?.final_price?.currency
              )}
            </p>
          </ErrorBoundary>
          <div
            className={`${
              view !== ProductListViewType.LIST
                ? ''
                : 'px-2 ltr:px-3 md:px-14 md:hidden'
            } flex items-center md:mt-0.5 lt:gap-1`}
          >
            <ErrorBoundary>
              <Rating
                size="medium"
                className="text-brand rtl:flex rtl:flex-row-reverse rtl:ml-5"
                max={1}
                defaultValue={
                  product?.rating_summary ? product?.rating_summary / 100 : 0
                }
                precision={0.1}
                readOnly
              />
            </ErrorBoundary>

            <p className="mt-0.5 text-neutral-900 text-[1.25rem] my-0 font-normal leading-[1.58rem] tracking-[0.0425rem]">
              {((product?.rating_summary || 0) / FEEDS_FRACTION).toFixed(1)}
            </p>
          </div>
        </footer>
      </div>
    </Card>
  );
};

export default ProductItem;
