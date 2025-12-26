import { useQuery } from '@apollo/client';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { isValidObject } from '@utils/Helper';
import Get_Seller from '@voguish/module-catalog/graphql/GetSeller.graphql';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import ContactSeller from './ContactSeller';
import SellerCardPlaceHolder from './placeholder/SellerCardPlaceHolder';
import SellerReview from './SellerReview';

export default function SellerCard({
  productId,
  card = true,
}: {
  productId?: number | string;
  card?: boolean;
}) {
  const { data: contact, loading } = useQuery(Get_Seller, {
    variables: {
      productSku: productId,
    },
  });
  const [open, setOpen] = useState(false);
  const sellerHandler = () => {
    setOpen(!open);
  };

  const sellerData = contact?.sellerByProductSku?.seller;
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      {card &&
        (loading ? (
          <SellerCardPlaceHolder />
        ) : (
          isValidObject(sellerData) && (
            <ErrorBoundary>
              <Grid className="w-full px-4 mt-10 space-y-2 border border-solid border-commonBorder">
                <span className="flex pl-0.5 items-center justify-between py-2 border-0 border-b border-solid rounded border-commonBorder">
                  <Typography className="text-[16px]  font-semibold ">
                    {t('Sold by')}
                  </Typography>
                </span>
                <Box className="grid items-center px-1 py-4 sm:grid-cols-12 -sm:gap-4">
                  <div className="flex items-center col-span-7 gap-4">
                    <Grid className="grid justify-end gap-3">
                      <ErrorBoundary>
                        <Link
                          passHref
                          href={`/marketplace/seller/profile/shop/${sellerData.shop_url}`}
                        >
                          {sellerData?.logo_pic ? (
                            <Avatar
                              alt="Remy Sharp"
                              className="w-[50px] h-[50px] mx-auto"
                              src={sellerData?.logo_pic}
                            />
                          ) : (
                            <Avatar className="mx-auto" />
                          )}
                        </Link>
                      </ErrorBoundary>
                    </Grid>
                    <Grid className="grid gap-1">
                      <Link
                        passHref
                        href={`/marketplace/seller/profile/shop/${sellerData.shop_url}`}
                      >
                        <Typography className="text-base font-bold text-brand">
                          {sellerData?.shop_title}
                        </Typography>
                      </Link>
                      <ErrorBoundary>
                        <span className="flex space-x-1 text-brand">
                          <Tooltip
                            title={
                              <SellerReview
                                totalRating={sellerData?.seller_rating}
                              />
                            }
                            placement="top"
                            arrow
                          >
                            <span className="flex items-center gap-1 text-sm font-medium cursor-pointer sm:gap-2 text-primary">
                              <Rating
                                className="text-base text-brand"
                                defaultValue={1}
                                precision={1}
                                readOnly={true}
                                max={1}
                              />
                              {parseFloat(sellerData?.seller_rating).toFixed(1)}
                            </span>
                          </Tooltip>
                        </span>
                      </ErrorBoundary>
                      <span className="flex gap-1 text-sm sm:gap-2 text-brand">
                        <Inventory2OutlinedIcon className="text-lg" />
                        <Typography className="font-medium  text-sm text-[#252525]">
                          {sellerData?.product_count}
                          &nbsp;{t('Products')}
                        </Typography>
                      </span>
                    </Grid>
                  </div>
                  <div className="flex items-start justify-end h-full -sm:col-span-12 sm:col-span-5">
                    <ErrorBoundary>
                      <Button
                        variant="outlined"
                        onClick={sellerHandler}
                        className=" rounded-[unset] px-3 -sm:w-full border-secondary text-secondary font-semibold"
                      >
                        {t('Contact Seller')}
                      </Button>
                    </ErrorBoundary>
                  </div>
                </Box>
              </Grid>

              <ErrorBoundary>
                <ContactSeller
                  open={open}
                  handleClose={sellerHandler}
                  id={sellerData?.seller_id}
                />
              </ErrorBoundary>
              {isValidObject(sellerData) && !card && (
                <span>
                  <Typography className="font-semibold">
                    {t('Sold By')}
                  </Typography>
                  <Link
                    passHref
                    href={`/marketplace/seller/profile/shop/${sellerData.shop_url}`}
                  >
                    <Typography className="font-semibold text-brand">
                      {sellerData?.shop_title}
                    </Typography>
                  </Link>
                </span>
              )}
            </ErrorBoundary>
          )
        ))}
    </ErrorBoundary>
  );
}
