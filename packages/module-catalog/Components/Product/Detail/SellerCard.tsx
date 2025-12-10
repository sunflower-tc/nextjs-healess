import { useQuery } from '@apollo/client';
import { Trans } from '@lingui/macro';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { isValidObject } from '@utils/Helper';
import Get_Seller from '@voguish/module-catalog/graphql/GetSeller.graphql';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
const Inventory2OutlinedIcon = dynamic(
  () => import('@mui/icons-material/Inventory2Outlined')
);
const SellerReview = dynamic(() => import('./SellerReview'));

const ContactSeller = dynamic(() => import('./ContactSeller'));

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

  return (
    <React.Fragment>
      {card &&
        (loading ? (
          <Grid
            className="w-full mt-10 border border-solid rounded-md border-commonBorder"
            gap={1}
            width={400}
          >
            <Grid className="px-4 py-2 border-0 border-b border-solid border-commonBorder">
              <Skeleton className="animate-pulse" height={30} width={100} />
            </Grid>
            <div className="flex items-center justify-between px-4 py-2 ">
              <Grid className="flex items-center justify-center gap-4">
                <Skeleton className="flex w-10 rounded-full py-7 aspect-square animate-pulse" />
                <Grid className="flex flex-col items-center justify-center">
                  <Skeleton className="animate-pulse" height={30} width={100} />
                  <Skeleton className="animate-pulse" height={30} width={100} />
                </Grid>
              </Grid>
              <Grid className="flex flex-col items-center justify-center">
                <Skeleton className="animate-pulse" height={60} width={80} />
              </Grid>
            </div>
          </Grid>
        ) : (
          isValidObject(sellerData) && (
            <>
              <Grid className="w-full px-4 mt-10 space-y-2 border border-solid border-commonBorder">
                <span className="flex pl-0.5 items-center justify-between py-2 border-0 border-b border-solid rounded border-commonBorder">
                  <Typography className="text-[16px]  font-semibold ">
                    <Trans>Sold by</Trans>
                  </Typography>
                </span>
                <Box className="grid items-center px-1 py-4 sm:grid-cols-12 -sm:gap-4">
                  <div className="flex items-center col-span-7 gap-4">
                    <Grid className="grid justify-end gap-3">
                      <Link
                        passHref
                        href={`/marketplace/seller/profile/shop/${sellerData.shop_url}`}
                      >
                        {sellerData?.logo_pic ? (
                          <Avatar
                            alt="Remy Sharp"
                            className="w-[50px] h-[50px]   mx-auto"
                            src={sellerData?.logo_pic}
                          />
                        ) : (
                          <Avatar className="mx-auto " />
                        )}
                      </Link>
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
                      <span className="flex gap-1 text-sm sm:gap-2 text-brand">
                        <Inventory2OutlinedIcon className="text-lg" />
                        <Typography className="font-medium  text-sm text-[#252525]">
                          {sellerData?.product_count}
                          &nbsp;<Trans>Products</Trans>
                        </Typography>
                      </span>
                    </Grid>
                  </div>
                  <div className="flex items-start justify-end h-full -sm:col-span-12 sm:col-span-5">
                    <Button
                      variant="outlined"
                      onClick={sellerHandler}
                      className=" rounded-[unset] px-3 -sm:w-full border-secondary text-secondary font-semibold"
                    >
                      <Trans>Contact Seller</Trans>
                    </Button>
                  </div>
                </Box>
              </Grid>

              <ContactSeller
                open={open}
                handleClose={sellerHandler}
                id={sellerData?.seller_id}
              />
              {isValidObject(sellerData) && !card && (
                <span>
                  <Typography className="font-semibold">
                    <Trans>Sold By</Trans>
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
            </>
          )
        ))}
    </React.Fragment>
  );
}
