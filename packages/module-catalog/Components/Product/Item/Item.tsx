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
        view === ProductListViewType.GRID
          ? 'flex flex-col justify-between'
          : 'grid md:flex md:p-4'
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
          view === ProductListViewType.GRID
            ? 'w-full truncate border-commonBorder  border-b border-0 border-solid'
            : 'w-56 h-44 rounded-md border-commonBorder aspect-square border border-solid'
        }`}
      >
        <CardMedia
          className={` object-contain relative object-bottom ${
            view === ProductListViewType.GRID
              ? 'w-full md:w-64 h-80'
              : 'w-full md:w-56 h-44 aspect-square truncate'
          } text-center max-h-fit`}
        >
          <Link className="-z-10" href={`/catalog/product/${product?.url_key}`}>
            <Thumbnail
              priority={true}
              loading="eager"
              className={`object-bottom aspect-square ${
                view === ProductListViewType.GRID ? '' : 'rounded-md '
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
            view === ProductListViewType.GRID
              ? 'grid items-center gap-4 content-between grid-rows-[min-content,43px,1fr]'
              : 'flex justify-start md:justify-center gap-4 w-full flex-col'
          }
       `}
      >
        {config && (
          <div className="flex items-center border-[1px]">
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
        <div>
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
        </div>
        <footer className="flex items-center justify-between w-full">
          <p className="text-black my-0 text-[1.375rem] font-semibold leading-[1.97rem]">
            {getFormattedPrice(
              product?.price_range?.maximum_price?.final_price?.value,
              product?.price_range?.maximum_price?.final_price?.currency
            )}
          </p>
          <div
            className={`${
              view === ProductListViewType.GRID ? '' : 'px-14'
            } flex items-center mt-0.5 gap-1`}
          >
            <Rating
              size="medium"
              className="text-brand"
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
