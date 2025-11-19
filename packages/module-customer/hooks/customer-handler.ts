import { useQuery } from '@apollo/client';
import { COUNTRIES, setLocalStorage } from '@store/local-storage';
import { isValidArray, showToast } from '@utils/Helper';
import GET_COUNTERIES from '@voguish/module-customer/graphql/GetCountries.graphql';
import AddProductsToWishlist from '@voguish/module-customer/graphql/mutation/AddProductsToWhishlist.graphql';
import REMOVE_WISHLIST_PRODUCT from '@voguish/module-customer/graphql/mutation/RemoveProductsFromWishlist.graphql';
import { CountriesQueryResult } from '@voguish/module-store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCustomerMutation } from './useCustomerMutation';
import { useToken } from './useToken';

interface AddToWishListReturnType {
  addToWishlistHandler: ({
    wishlistId,
    items,
  }: {
    wishlistId: string;
    items: [] | any;
  }) => void;
  loading: boolean;
}

/**
 * Use add to cart handler.
 *! It will return a callback function
 *
 * @returns {AddToWishListReturnType} - {sku, qty}
 */
export const useAddToWishlist = (refetch: any): AddToWishListReturnType => {
  const userData = useToken();
  const token = userData || null;
  const [addToWishlist, { data, loading, error }] = useCustomerMutation(
    AddProductsToWishlist
  );
  const route = useRouter();
  useEffect(() => {
    if (data && data?.addProductsToWishlist) {
      showToast({ message: 'Product added to wishlist.', type: 'success' });
      refetch();
    }
  }, [data, refetch]);

  if (error) {
    showToast({ message: error.message, type: 'error' });
  }

  const addToWishlistHandler = ({
    wishlistId,
    items,
  }: {
    wishlistId: string;
    items: [];
  }) => {
    try {
      if (!token) {
        showToast({ message: 'You need to log in first.', type: 'error' });
        route.push('/customer/account/login');
        return false;
      }
      addToWishlist({
        variables: { id: wishlistId, items: items },
      });
    } catch (error) {
      showToast({ message: 'Try again!', type: 'error' });
    }
  };

  return { addToWishlistHandler, loading };
};

export const useSetAddressCountries = () => {
  const { data, loading, error } =
    useQuery<CountriesQueryResult>(GET_COUNTERIES);

  useEffect(() => {
    const countryObj = data?.countries || [];
    if (isValidArray(countryObj)) {
      setLocalStorage(COUNTRIES, countryObj);
    }
    if (error) {
      showToast({ message: error.message, type: 'error' });
    }
  }, [data, loading, error]);
};

const useDeleteWishlistProduct = () => {
  const [removeItemFromWishlist, { loading, error, data }] =
    useCustomerMutation(REMOVE_WISHLIST_PRODUCT);

  const handleDelete = (wishlistId: number, wishlist_product_id: number) => {
    removeItemFromWishlist({
      variables: { id: wishlistId, wishlistItemsIds: wishlist_product_id },
    })
      .then(() => {
        // Show success message and refetch data
        showToast({
          type: 'success',
          message: 'Wishlist Product deleted successfully',
        });
      })
      .catch((err) => {
        // Show error message
        showToast({ message: err.message, type: 'error' });
      });
  };

  return { handleDelete, loading, error, data };
};

export default useDeleteWishlistProduct;
