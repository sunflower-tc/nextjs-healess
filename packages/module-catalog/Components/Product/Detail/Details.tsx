import { Trans } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { STORE_CONFIG, getKeyFromStorage } from '@store/local-storage';
import { FEEDS_FRACTION } from '@utils/Constants';
import { DetailProp, Price, ProductPrice } from '@voguish/module-catalog';
import { HTMLRenderer } from '@voguish/module-theme';
import { useState } from 'react';
import AddToCart from './AddToCart';
import SellerCard from './SellerCard';

export function Details(props: DetailProp) {
  const { product } = props;
  const { rating_summary } = product;
  const [productSku, setProductSku] = useState<string>(product.sku);
  const [productPrice, setProductPrice] = useState<ProductPrice>(
    product.price_range.minimum_price
  );

  const setProductPriceHandler = (priceRange: ProductPrice) => {
    setProductPrice(priceRange);
  };

  const setProductSkuHandler = (sku: string) => {
    setProductSku(sku);
  };

  const marketplaceIsActive =
    getKeyFromStorage(STORE_CONFIG, 'marketplace_is_active') || false;
  return (
    <div className="flex flex-col max-w-full gap-2 lg:col-span-6 -lg:w-full">
      <div className="flex flex-col gap-2">
        <Typography component="h1" variant="ProfileName">
          <HTMLRenderer
            htmlText={product.name || ''}
            className="leading-normal lg:leading-[1.5rem]"
          ></HTMLRenderer>
        </Typography>
        <Typography
          variant="filter"
          className="text-hoverEffect leading-normal pb-2 lg:leading-[1.25rem]"
          dangerouslySetInnerHTML={{
            __html:
              product.short_description?.html ||
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt reprehenderit possimus tenetur adipisci eaque eum.',
          }}
        ></Typography>
      </div>
      <Price
        className="text-price leading-normal font-normal lg:leading-[2.125rem]"
        minimumPrice={productPrice}
      />
      <Grid
        display="flex"
        justifyContent="space-between"
        className="pt-2 "
        alignItems="start"
      >
        <Grid className="flex items-center">
          <Grid className="flex items-center">
            <Rating
              size="small"
              className="text-brand"
              max={1}
              defaultValue={rating_summary ? rating_summary / 100 : 0}
              precision={0.1}
              readOnly
            />
            <Typography
              variant="filter"
              className="leading-normal pt-0.5 lg:leading-[1.25rem]"
            >
              {((rating_summary || 0) / FEEDS_FRACTION).toFixed(1)}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" className="uppercase ">
          <Trans>Sku :</Trans> {productSku}
        </Typography>
      </Grid>
      <AddToCart
        setProductPrice={setProductPriceHandler}
        setProductSku={setProductSkuHandler}
        product={product}
      />
      {marketplaceIsActive && <SellerCard productId={product.sku} />}
    </div>
  );
}
export default Details;
