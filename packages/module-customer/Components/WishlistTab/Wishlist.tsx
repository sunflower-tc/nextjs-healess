import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getFormattedPrice, isValidArray, showToast } from '@utils/Helper';
import {
  NoWishlistItem,
  WishlistPlaceholder,
  useCustomerMutation,
  useCustomerQuery,
} from '@voguish/module-customer';
import React, { useState } from 'react';

import { Trans, t } from '@lingui/macro';
import GET_WISHLIST from '@voguish/module-customer/graphql/Wishlist.graphql';
import ADD_WISHLIST_PRODUCT from '@voguish/module-customer/graphql/mutation/AddWishlistItemsToCart.graphql';
import UPDATE_WISHLIST_ITEM from '@voguish/module-customer/graphql/mutation/UpdateProductsInWishlist.graphql';
import useDeleteWishlistProduct from '@voguish/module-customer/hooks/customer-handler';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Thumbnail } from '~packages/module-catalog';
import { AddCartWhish, TrashIcon, WhishlistDown } from '~packages/module-theme';
import Sidebar from '../Layout/Sidebar';

/**
 * It function to return price with valid currency
 * @param wishlist_item
 * @returns
 */
const commonStyles = {
  bgcolor: 'background.paper',
  mt: 1,
  mb: 2,
  // ml:{md:'8px' , xl:'8px' , lg:'8px' , xs:0},
  border: 1,
  borderRadius: 1,
  borderColor: 'themeAdditional.borderColor',
};
interface WishlistDataType {
  price_range: {
    minimum_price: {
      regular_price: {
        value: number;
        currency: string;
      };
    };
  };
}

const getFormattedPriceValue = (wishlist_item: WishlistDataType) => {
  const wishlistItemvalue =
    wishlist_item?.price_range?.minimum_price?.regular_price?.value;
  const wishlistcurrency =
    wishlist_item?.price_range?.minimum_price?.regular_price?.currency;
  return getFormattedPrice(wishlistItemvalue, wishlistcurrency);
};
interface WishlistItemDataType {
  product: {
    thumbnail: {
      url: string;
    };
    name: string;
    url_key: string;
    price_range: {
      minimum_price: {
        regular_price: {
          value: number;
          currency: string;
        };
      };
    };
  };
  id: number;
  quantity: number;
  __typename: string;
  description: string;
}

const Wishlist = () => {
  const { data, loading, refetch /*, error */ } = useCustomerQuery(
    GET_WISHLIST,
    {
      variables: { currentPage: 1, pageSize: 9 },
    }
  );

  const wishlistProducts = data?.customer?.wishlists[0]?.items_v2?.items;
  const wishlistId = data?.customer?.wishlists[0]?.id || 0;
  const id = data?.customer?.wishlists[0]?.id;

  const { register } = useForm();

  /**
   * Remove Item from Wishlist
   */
  const { handleDelete } = useDeleteWishlistProduct();
  /**
   * Add to cart wishlist product
   */

  const [addWishlistItemToCart] = useCustomerMutation(ADD_WISHLIST_PRODUCT);
  const handleAddtoCart = (wishlistId: number, wishlist_product_id: number) => {
    addWishlistItemToCart({
      variables: { id: wishlistId, itemIds: [wishlist_product_id] },
    })
      .then(() => {
        showToast({
          type: 'success',
          message: 'Add to cart successfully',
        });
        refetch({ currentPage: 1, pageSize: 9 });
      })
      .catch((err) => {
        showToast({ message: err.message, type: 'error' });
      });
  };
  /**
   * Update wishlist
   */
  const [commentOpen, setCommentOpen] = useState(0);
  const [updatewishlistproduct] = useCustomerMutation(UPDATE_WISHLIST_ITEM);
  refetch({ currentPage: 1, pageSize: 9 });
  return (
    <Sidebar>
      <React.Fragment>
        <Box sx={{ ml: { md: '8px', xl: '8px', lg: '8px', xs: 0 } }}>
          <Grid
            container
            sx={{ px: 2, py: 2, ...commonStyles }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h4"
                className="text-lg font-semibold uppercase"
              >
                <Trans> Wishlist</Trans>
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          {loading ? (
            <WishlistPlaceholder />
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              spacing={2}
              sx={{ my: 1 }}
            >
              {isValidArray(wishlistProducts) ? (
                wishlistProducts?.map(
                  (wishlist_item: WishlistItemDataType, index: number) => (
                    <Grid item lg={3} key={index} md={4} sm={4} xs={12}>
                      <Box
                        component="div"
                        className="border border-solid rounded border-colorBorder"
                      >
                        <Box
                          component="div"
                          className="cursor-pointer relative border-0 min-h-[15rem] bg-color border-b-[1px] border-solid border-colorBorder"
                        >
                          <Thumbnail
                            className="object-contain object-center h-full"
                            thumbnail={wishlist_item?.product?.thumbnail?.url}
                            alt={wishlist_item?.product?.name}
                            fill
                          />
                        </Box>
                        <Box
                          component="div"
                          textAlign="start"
                          className="px-2 py-1 rounded-b-md fd-cl"
                        >
                          <Typography
                            variant="body2"
                            className="font-normal Line-clamp-1"
                            sx={{ color: '#000000' }}
                            component={Link}
                            href={
                              '/catalog/product/' +
                              wishlist_item?.product?.url_key
                            }
                          >
                            {wishlist_item?.product?.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: '#000000', fontWeight: 500 }}
                          >
                            {getFormattedPriceValue(wishlist_item?.product)}
                          </Typography>
                          <Box
                            className="shadow-[unset] flex justify-between items-center"
                            component="div"
                          >
                            <div className="flex items-center justify-between w-full ">
                              <div className="flex items-center min-h-[35px] gap-2 max-w-2/3">
                                <label className="text-sm font-medium text-gray-900 text-start">
                                  <Trans>Qty</Trans>
                                </label>
                                <input
                                  id="Quantity"
                                  type="number"
                                  {...register('qty' + wishlist_item?.id, {
                                    value: wishlist_item?.quantity || 0,
                                  })}
                                  className="w-[50%] h-full text-sm text-gray-900 outline-1 outline border-transparent outline-gray-300 rounded"
                                  onBlur={(e) => {
                                    updatewishlistproduct({
                                      variables: {
                                        wishlistId: wishlistId,
                                        wishlistItems: [
                                          {
                                            wishlist_item_id: wishlist_item?.id,
                                            quantity: e.target.value,
                                          },
                                        ],
                                      },
                                    });
                                  }}
                                />
                              </div>
                              <div className="flex gap-1 max-w-1/3">
                                {wishlist_item?.__typename ===
                                'ConfigurableWishlistItem' ? (
                                  <Link
                                    href={
                                      '/catalog/product/' +
                                      wishlist_item?.product?.url_key
                                    }
                                  >
                                    <AddCartWhish />
                                  </Link>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleAddtoCart(id, wishlist_item?.id)
                                    }
                                  >
                                    <AddCartWhish />
                                  </div>
                                )}
                                <div
                                  onClick={() =>
                                    handleDelete(id, wishlist_item?.id)
                                  }
                                >
                                  <TrashIcon />
                                </div>
                              </div>
                            </div>
                          </Box>
                        </Box>
                        <Grid className="w-full px-2 transition-all bg-white rounded-md border-top-none">
                          <Grid
                            onMouseLeave={() => setCommentOpen(0)}
                            className="pb-2 group"
                          >
                            <label
                              onMouseEnter={() =>
                                setCommentOpen(wishlist_item?.id)
                              }
                              htmlFor="message"
                              className="flex items-center justify-between text-black"
                            >
                              <Trans> Comments</Trans>
                              <WhishlistDown />
                            </label>
                            {commentOpen == wishlist_item?.id && (
                              <input
                                id="message"
                                name="message"
                                className="block w-full p-2 text-sm text-gray-900 transition-opacity duration-500 border-transparent rounded outline-1 outline outline-gray-300"
                                placeholder={t`Write a comments`}
                                defaultValue={wishlist_item?.description || ''}
                                onMouseLeave={(e: any) => {
                                  updatewishlistproduct({
                                    variables: {
                                      wishlistId: wishlistId,
                                      wishlistItems: [
                                        {
                                          wishlist_item_id: wishlist_item?.id,
                                          description: e.target.value || '',
                                        },
                                      ],
                                    },
                                  });
                                }}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  )
                )
              ) : (
                <NoWishlistItem />
              )}
            </Grid>
          )}
        </Box>
      </React.Fragment>
    </Sidebar>
  );
};
export default Wishlist;
