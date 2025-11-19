import { t } from '@lingui/macro';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useCustomerQuery, useToken } from '@voguish/module-customer';
import GET_WISHLIST from '@voguish/module-customer/graphql/Wishlist.graphql';
import { useAddToWishlist } from '@voguish/module-customer/hooks/customer-handler';
import { useRemoveItemFromCart } from '@voguish/module-quote/hooks/cart-handler';
import { decode } from 'base-64';
import { useState } from 'react';
type Props = {
  productSku: string;
  card?: boolean;
  type?: string;
  detailsPage?: boolean;
  cartItemId?: string;
  view?: string | any;
};

export default function AddToWishlist({
  productSku,
  view,
  cartItemId = '',
  type,
  detailsPage = false,
  card = false,
}: Props) {
  const token = useToken();
  const { data, loading, refetch /*, error */ } =
    useCustomerQuery(GET_WISHLIST);
  const wishlistId = data?.customer?.wishlists[0]?.id || 0;
  const { addToWishlistHandler } = useAddToWishlist(refetch);
  const { removeItemFromCartHandler } = useRemoveItemFromCart();

  const [add, setAdd] = useState(false);
  const onAdd = () => {
    !add &&
      addToWishlistHandler({
        wishlistId: wishlistId,
        items: [{ sku: productSku, quantity: 1 }],
      });
    cartItemId && removeItemFromCartHandler(Number(decode(cartItemId)));

    setAdd(!add);
  };
  return (
    <>
      {!card ? (
        <Button
          aria-label="add to whishlist"
          onClick={onAdd}
          className={`z-[9] min-w-0 border-none rounded-full px-0 w-[36px] h-[36px] absolute bg-white text-sm shadow-md
           hover:shadow-lg ${
             view === 'list' ? 'bottom-4 right-4' : 'top-3 right-3 '
           }  group`}
        >
          {
            // true?(<FavoriteIcon className="text-xl duration-500 group-hover:md:scale-110"/>):(
            <>
              {!add ? (
                <FavoriteBorderIcon className="text-xl font-medium text-slate-700" />
              ) : (
                token && <FavoriteIcon className="text-xl" />
              )}
            </>
            // )
          }
        </Button>
      ) : !detailsPage ? (
        <span className="flex items-center justify-center w-full">
          {loading ? (
            <div className="flex justify-center w-full">
              <CircularProgress className="mx-auto text-xs text-brand/80" />
            </div>
          ) : (
            <Button
              onClick={onAdd}
              className=" rounded-[unset] uppercase py-3.5 px-0 w-full gap-1.5 -sm:w-full border-none text-secondary font-medium"
            >
              {!add ? (
                <FavoriteBorderIcon className="text-2xl" />
              ) : (
                <FavoriteIcon className="text-2xl" />
              )}
              <span>{type ? type : t`Add To Whishlist`}</span>
            </Button>
          )}
        </span>
      ) : (
        <span className="flex items-center justify-center md:w-full">
          {detailsPage && (
            <Button
              variant="contained"
              onClick={onAdd}
              className=" rounded-[unset] -md:max-w-fit px-3 -md:py-4 py-3.5 gap-3 flex items-center w-full  font-semibold"
            >
              {!add ? (
                <FavoriteBorderIcon className="text-2xl duration-500 group-hover:md:scale-110" />
              ) : (
                <FavoriteIcon className="text-2xl duration-500 group-hover:md:scale-110" />
              )}
              <span className="-md:hidden">
                {type ? type : t`Add To Whishlist`}
              </span>
            </Button>
          )}
        </span>
      )}
    </>
  );
}
