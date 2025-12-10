import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';

import Typography from '@mui/material/Typography';
import { FEEDS_FRACTION } from '@utils/Constants';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import {
  ConfigOptions,
  ProductItemInterface,
  ProductListViewType,
  ProductListingView,
  Thumbnail,
} from '@voguish/module-catalog';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import { HTMLRenderer, Link } from '@voguish/module-theme';
import { FormProvider, useForm } from 'react-hook-form';
import AddToWishlist from '../Detail/AddToWishlist';

export const ProductItem = ({
  product,
  config = true,
  view = ProductListViewType.GRID,
}: {
  config?: boolean;
  product: ProductItemInterface;
  view?: ProductListingView;
}) => {
  const methods = useForm<AddProductsToCartInput>();

  return (
    <Card
      className={`relative hover:shadow-lg w-full duration-500 group rounded-md ${
        view !== ProductListViewType.LIST
          ? 'flex flex-col justify-between'
          : 'grid md:flex md:items-center md:p-4'
      }`}
      variant="outlined"
      sx={{
        minHeight: '100%',
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
          className={`h-full object-contain relative object-bottom ${
            view !== ProductListViewType.LIST
              ? 'w-full md:w-64 min-h-[10rem] h-40 sm:h-80'
              : 'w-full md:w-56 min-h-[20rem] md:min-h-[11rem] h-80 md:h-44 md:aspect-square md:truncate'
          } text-center`}
        >
          <Link className="-z-10" href={`/catalog/product/${product?.url_key}`}>
            <Thumbnail
              className={`object-center aspect-square ${
                view !== ProductListViewType.LIST ? '' : 'rounded-md '
              } group-hover:scale-105 object-contain truncate duration-300 `}
              thumbnail={product.thumbnail?.url}
              fill
              alt={product?.name}
            />
          </Link>
        </CardMedia>
      </CardActionArea>
      <AddToWishlist productSku={product.sku} view={view} />
      <div
        className={`w-full p-4
        ${
          view !== ProductListViewType.LIST
            ? 'grid items-center gap-4 content-between grid-rows-[min-content,43px,1fr]'
            : 'flex justify-start md:justify-center gap-4 w-full flex-col'
        }
     `}
      >
        <div
          className={`${
            view !== ProductListViewType.LIST ? 'hidden' : 'px-3 hidden md:flex'
          } flex items-center justify-end mt-0.5 gap-1`}
        >
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
          <p className="mt-0.5 text-neutral-900 text-sm sm:text-[1.25rem] my-0 font-normal leading-[1.58rem] tracking-[0.0425rem]">
            {((product?.rating_summary || 0) / FEEDS_FRACTION).toFixed(1)}
          </p>
        </div>
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
        <Link
          className="w-full h-full"
          href={`/catalog/product/${product?.url_key}`}
          underline="none"
        >
          <Typography
            variant="CartItemPrice"
            className="max-w-[80%] flex items-start font-normal line-clamp-2 leading-normal lg:leading-[1.55rem]"
          >
            <HTMLRenderer htmlText={product?.name || ''}></HTMLRenderer>
          </Typography>
        </Link>
        <footer className="flex items-center justify-between w-full">
          <p className="text-black my-0 text-lg sm:text-[1.375rem] font-semibold leading-[1.97rem]">
            {getFormattedPrice(
              product?.price_range?.maximum_price?.final_price?.value,
              product?.price_range?.maximum_price?.final_price?.currency
            )}
          </p>
          <div
            className={`${
              view !== ProductListViewType.LIST
                ? ''
                : 'px-2 ltr:px-3 md:px-14 md:hidden'
            } flex items-center md:mt-0.5 lt:gap-1`}
          >
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
