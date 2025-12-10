import { useLazyQuery, useMutation } from '@apollo/client';
import { setCart } from '@store/cart';
import {
  setOrderId,
  setShippingAddressFromCartData,
  setShippingMethod,
} from '@store/checkout';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  GUEST_CART,
  getLocalStorage,
  setLocalStorage,
} from '@store/local-storage';
import { isValidArray, isValidObject, showToast } from '@utils/Helper';
import {
  useCustomerMutation,
  useCustomerQuery,
} from '@voguish/module-customer';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import CART_QUERY from '@voguish/module-quote/graphql/cart/Cart.graphql';
import CustomerCartQuery from '@voguish/module-quote/graphql/cart/CustomerCart.graphql';
import AddProductsToCart from '@voguish/module-quote/graphql/mutation/AddProductsToCart.graphql';
import ApplyCouponToCart from '@voguish/module-quote/graphql/mutation/ApplyCouponToCart.graphql';
import ClearCustomerCart from '@voguish/module-quote/graphql/mutation/ClearCustomerCart.graphql';
import CreateEmptyCartQuery from '@voguish/module-quote/graphql/mutation/CreateEmptyCart.graphql';
import PlaceOrder from '@voguish/module-quote/graphql/mutation/PlaceOrder.graphql';
import RemoveCouponFromCart from '@voguish/module-quote/graphql/mutation/RemoveCouponFromCart.graphql';
import RemoveItemFromCart from '@voguish/module-quote/graphql/mutation/RemoveItemFromCart.graphql';
import SetBillingAddressOnCart from '@voguish/module-quote/graphql/mutation/SetBillingAddressOnCart.graphql';
import SetGuestEmailOnCart from '@voguish/module-quote/graphql/mutation/SetGuestEmailOnCart.graphql';
import SetShippingAddressesOnCart from '@voguish/module-quote/graphql/mutation/SetShippingAddressesOnCart.graphql';
import SetShippingMethodsOnCart from '@voguish/module-quote/graphql/mutation/SetShippingMethodsOnCart.graphql';
import SetShippingPaymentOnCart from '@voguish/module-quote/graphql/mutation/SetShippingPaymentOnCart.graphql';
import UpdateCartItems from '@voguish/module-quote/graphql/mutation/UpdateCartItems.graphql';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Logout, RootState } from 'store';
import {
  AddProductsToCartInput,
  AddProductsToCartOutput,
  CartInterface,
  RemoveItemFromCartOutput,
  SetBillingAddressOnCartInput,
  SetBillingAddressesOnCartOutput,
  SetPaymentMethodOnCartInput,
  SetPaymentMethodOnCartOutput,
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartOutput,
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartOutput,
} from '../types';
import { useSession } from 'next-auth/react';
import { AUTHORIZED, errorAuthentication, errorCat } from '~utils/Constants';
import { graphqlMutate, graphqlRequest  } from '@utils/Fetcher';


// fetchTranslations("product");

/**
 * Creating Guest Empty Cart.
 *
 * @returns boolean
 */
export const useCreateEmptyCartForGuest = () => {
  const [createEmptyCart, { data }] = useMutation(CreateEmptyCartQuery, {
    fetchPolicy: 'network-only',
  });
  const [cartId, setCartId] = useState();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state?.user);
  useEffect(() => {
    if (user && user.email) {
      return cartId;
    }
    const cartData = getLocalStorage(GUEST_CART, true);
    if (isValidObject(cartData) && cartData.isGuest === true) {
      setCartId(cartData.id);
    } else {
      if (!cartId) {
        createEmptyCart();
      }
      if (data && typeof data !== 'undefined' && data.createEmptyCart) {
        setLocalStorage(
          GUEST_CART,
          JSON.stringify({
            id: data.createEmptyCart,
            isGuest: true,
          })
        );
        setCartId(data.createEmptyCart);
      }
    }
    if (cartId) {
      const afterFetchingCart = async (cartData: CartInterface) => {
        dispatch(setCart({ ...cartData, isGuest: true }));
      };
      fetchCartData(cartId, afterFetchingCart, '');
    }
  }, [data, user, cartId, createEmptyCart, dispatch]);
  return cartId;
};

/**
 * Customer Cart
 *! if Customer does not have any Cart it will create one and return the Details
 * * If Customer has cart it will fetch the data.
 *
 * @param {String} token
 * @returns
 */
export const useCustomerCart = () => {
  /**
   * To Dispatch the state for Redux
   */
  const dispatch = useAppDispatch();
  const { data } = useCustomerQuery(CustomerCartQuery, {
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    if (
      data &&
      typeof data !== 'undefined' &&
      data.customerCart &&
      data.customerCart.id
    ) {
      dispatch(setCart({ ...data.customerCart, isGuest: false }));
    }
  }, [data, dispatch]);
};
/**
 * Use Add To Cart
 * @returns
 */
export const useAddToCart = () => {
  const userData = useToken();
  const token = userData || null;
  const dispatch = useAppDispatch();
  const [isInProcess, setIsInProcess] = useState(false);
  const cartId = useSelector((state: RootState) => state?.cart?.id);

  const [addToCart, { data, loading, error }] =
    useCustomerMutation<AddProductsToCartOutput>(AddProductsToCart);

  useEffect(() => {
    setIsInProcess(loading);
    if (data && data.addProductsToCart) {
      const {
        addProductsToCart: { user_errors = [], cart = null },
      } = data;
      if (isValidArray(user_errors)) {
        showToast({
          message: data?.addProductsToCart?.user_errors?.[0]?.message,
          type: 'error',
        });
      }

      if (isValidObject(cart) && cart?.id) {
        dispatch(setCart({ ...cart, isGuest: token ? false : true }));
        showToast({
          message: 'Product added to cart successfully!!',
          type: 'success',
        });
      }
    }
    if (error) {
      // console.error('message:', error.message);
    }
  }, [data, loading, error, cartId, token, dispatch]);

  const doAddToCart = async (cartData: AddProductsToCartInput) => {
    try {
      await addToCart({
        variables: {
          cartItems: [cartData],
          cartId: cartId,
        },
      });
    } catch (error: any) {
      showToast({ message: error.message, type: 'error' });
    }
  };

  return { doAddToCart, isInProcess };
};

/**
 * Remove Item from cart handler.
 * @returns {CallBackFunction, boolean}
 */
export const useRemoveItemFromCart = () => {
  const dispatch = useAppDispatch();
  const [isInProcess, setIsInProcess] = useState(false);
  const token = useToken();
  const cartId = useSelector((state: RootState) => state?.cart?.id);
  const [removeItemFromCart, { data, loading, error }] =
    useCustomerMutation<RemoveItemFromCartOutput>(RemoveItemFromCart);

  useEffect(() => {
    setIsInProcess(loading);
    if (data && data.removeItemFromCart) {
      const cart = data.removeItemFromCart.cart;

      if (isValidObject(cart)) {
        dispatch(setCart({ ...cart, isGuest: !token }));
        showToast({
          message: 'Item remove from cart successfully!!',
          type: 'success',
        });
      }
    }
    if (data && data.errors) {
      showToast({
        message: data.errors
          .map((error: { message: string }) => error.message)
          .join('\n'),
        type: 'error',
      });
    }
    if (error) {
      showToast({ message: error.message, type: 'error' });
    }
  }, [data, loading, error, dispatch, token]);
  const removeItemFromCartHandler = async (cartItemId: string | number) => {
    try {
      await removeItemFromCart({
        variables: { cartItemId: cartItemId, cartId: cartId },
      });
    } catch (error) {
      // console.warn(error, typeof error);
    }
  };

  return { removeItemFromCartHandler, isInProcess };
};
/**
 * Update Items in cart handler.
 * @returns {CallBackFunction, boolean}
 *
 */
export const useUpdateCartItems = () => {
  const dispatch = useAppDispatch();
  const token = useToken() || null;
  const [isInProcess, setIsInProcess] = useState(false);
  const cartId = useSelector<RootState>(
    (state: { cart: { id: string } }) => state?.cart?.id
  );
  const [updateCartItems, { data, loading, error }] =
    useCustomerMutation(UpdateCartItems);
  useEffect(() => {
    setIsInProcess(loading);
    const cartData = data?.updateCartItems?.cart || null;
    if (cartData) {
      dispatch(setCart({ ...cartData, isGuest: token ? false : true }));
    }
    if (error) {
      // console.log('message:', error.message);
    }
  }, [data, loading, error, dispatch, token]);

  /**
   * Do add to cart callback function.
   * @param {Array} cartItems - Cart Items to be updated
   */
  const updateCartItemsHandler = async (
    cartItems: { cartItemId?: string | number } | any
  ) => {
    if (typeof cartItems.cartItemId === 'string')
      cartItems.cartItemId = parseInt(cartItems.cartItemId);
    try {
      const { data } = await updateCartItems({
        variables: { cartItems: cartItems, cartId: cartId },
      });
      if (data && data.updateCartItems) {
        dispatch(
          setCart({
            ...data.updateCartItems.cart,
            isGuest: token ? false : true,
          })
        );
        showToast({ message: 'Item updated successfully!!', type: 'success' });
      }
    } catch (error: any) {
      showToast({ message: error.message, type: 'error' });
    }
  };

  return { updateCartItemsHandler, isInProcess };
};

/**
 * Clear cart handler.
 * @returns {CallBackFunction, boolean}
 */
export const useClearCart = () => {
  const dispatch = useAppDispatch();

  const [isInProcess, setIsInProcess] = useState(false);
  const token = useToken() || null;
  const cartId = useSelector<RootState>(
    (state: { cart: { id: string } }) => state?.cart?.id
  );
  const [clearCart, { data, loading, error }] =
    useCustomerMutation(ClearCustomerCart);
  useEffect(() => {
    setIsInProcess(loading);
    if (data && data.clearCustomerCart) {
      dispatch(
        setCart({
          ...data.clearCustomerCart,
          isGuest: token ? false : true,
        })
      );
    }
    if (error) {
      // console.log('message:', error.message);
    }
  }, [data, loading, error, dispatch, token]);

  /**
   *
   * /**
   * Do clear cart callback function.
   */
  const clearCartHandler = async () => {
    try {
      const { data } = await clearCart({
        variables: { cartId: cartId },
      });
      if (data && data.clearCustomerCart) {
        dispatch(
          setCart({
            ...data.clearCustomerCart,
            isGuest: token ? false : true,
          })
        );
        showToast({ message: 'Cart clear successfully!!', type: 'success' });
      }
    } catch (error: any) {
      showToast({ message: error.message, type: 'error' });
    }
  };

  return { clearCartHandler, isInProcess };
};

/**
 * Fetch cart
 * @param {String} cartId
 * @param {Function} callback
 */
export const fetchCartData = async (
  cartId: string,
  callback: Function,
  token?: string
) => {
  const data = await graphqlRequest({
    query: CART_QUERY,
    variables: { cartId: cartId },
    options: {
      fetchPolicy: 'network-only',
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    },
  });
  if (isValidObject(data) && data.cart && data.cart.id) {
    callback(data.cart);
  }
};

/**
 * Set Guest Email Address hook
 *
 * {CallBackFunction, boolean}
 */
export const useSetGuestEmailOnCart = (cartId: string) => {
  const dispatch = useAppDispatch();
  const [isInProcess, setIsInProcess] = useState(false);
  const [setGuestEmail, { data, loading, error }] =
    useMutation(SetGuestEmailOnCart);
  useEffect(() => {
    setIsInProcess(loading);
    const cartData = data?.setGuestEmailOnCart?.cart || null;
    if (cartData) {
      dispatch(setCart({ ...cartData, isGuest: true }));
      showToast({ message: 'Email address updated successfully!!' });
    }
    if (error) {
      showToast({ message: error.message, type: 'error' });
    }
  }, [data, loading, error, dispatch]);

  /**
   * Do set guest email address callback function.
   * @param {String|null} email - Guest Email Address.
   */
  const setGuestEmailHandler = async (email: string) => {
    await setGuestEmail({
      variables: {
        cartId: cartId,
        email: email,
      },
    });
  };

  return { setGuestEmailHandler, isInProcess };
};

/**
 * Set Shipping Address hook
 *
 * {CallBackFunction, boolean}
 */
export const useSetShippingAddressOnCart = () => {
  const dispatch = useAppDispatch();
  const token = useToken() || null;
  const [isInProcess, setIsInProcess] = useState(false);
  const [setShippingAddress, { data, loading, error }] =
    useCustomerMutation<SetShippingAddressesOnCartOutput>(
      SetShippingAddressesOnCart
    );
  useEffect(() => {
    setIsInProcess(loading);
    const cartData = data?.setShippingAddressesOnCart?.cart || null;
    if (cartData) {
      dispatch(setCart({ ...cartData, isGuest: token ? false : true }));
      dispatch(setShippingAddressFromCartData(cartData));
      showToast({ message: 'Shipping Address updated successfully!!' });
    }
    if (error) {
      showToast({ message: error.message, type: 'error' });
    }
  }, [data, loading, error, dispatch, token]);

  /**
   * Do set shipping address callback function.
   * @param {SetShippingAddressesOnCartInput} addressInput - Shipping Address
   */
  const setShippingAddressHandler = async (
    addressInput: SetShippingAddressesOnCartInput
  ) => {
    await setShippingAddress({ variables: addressInput });
  };

  return { setShippingAddressHandler, isInProcess };
};

/**
 * Set Billing Address hook
 *
 * {CallBackFunction, boolean}
 */
export const useSetBillingAddressOnCart = () => {
  const dispatch = useAppDispatch();
  const token = useToken() || null;
  const [isInProcess, setIsInProcess] = useState(false);
  const [setBillingAddress, { data, loading, error }] =
    useCustomerMutation<SetBillingAddressesOnCartOutput>(
      SetBillingAddressOnCart
    );
  useEffect(() => {
    setIsInProcess(loading);
    const cartData = data?.setBillingAddressOnCart?.cart || null;
    if (cartData) {
      setCart({ ...cartData, isGuest: token ? false : true });
      showToast({ message: 'Billing Address updated successfully!!' });
    }
    if (error) {
      showToast({ message: error.message, type: 'error' });
    }
  }, [data, loading, error, dispatch, token]);

  /**
   * Do set billing address callback function.
   */
  const setBillingAddressHandler = async (
    input: SetBillingAddressOnCartInput
  ) => {
    try {
      await setBillingAddress({
        variables: input,
      });
    } catch (error) {
      // showToast({ message: error.message, type: 'error' });
    }
  };

  return { setBillingAddressHandler, isInProcess };
};

/**
 * Set Shipping Method hook
 *
 * {CallBackFunction, boolean}
 */
export const useSetShippingMethodOnCart = () => {
  const dispatch = useAppDispatch();
  const token = useToken() || null;
  const [isInProcess, setIsInProcess] = useState(false);
  const [setShippingMethodHandler, { data, loading, error }] =
    useCustomerMutation<SetShippingMethodsOnCartOutput>(
      SetShippingMethodsOnCart
    );
  useEffect(() => {
    setIsInProcess(loading);
    const cartData = data?.setShippingMethodsOnCart?.cart || null;
    if (cartData) {
      dispatch(setCart({ ...cartData, isGuest: token ? false : true }));
      dispatch(setShippingMethod(cartData));
      showToast({ message: 'Shipping method updated successfully!!' });
    }
    if (error) {
      showToast({ message: error.message, type: 'error' });
    }
  }, [data, loading, error, dispatch, token]);

  /**
   * Do set shipping address callback function.
   * @param {SetShippingAddressesOnCartInput} addressInput - Shipping Address
   */
  const setShippingMethodsHandler = async (
    input: SetShippingMethodsOnCartInput
  ) => {
    await setShippingMethodHandler({ variables: input });
  };

  return { setShippingMethodsHandler, isInProcess };
};

/**
 * Set Shipping Method hook
 *
 * {CallBackFunction, boolean}
 */
export const useSetPaymentMethodOnCart = () => {
  const dispatch = useAppDispatch();
  const token = useToken() || null;
  const [isInProcess, setIsInProcess] = useState(false);
  const [setPaymentMethodHandler, { data, loading, error }] =
    useCustomerMutation<SetPaymentMethodOnCartOutput>(SetShippingPaymentOnCart);
  useEffect(() => {
    setIsInProcess(loading);
    const cartData = data?.setPaymentMethodOnCart?.cart || null;
    if (cartData) {
      dispatch(setCart({ ...cartData, isGuest: token ? false : true }));
      showToast({ message: 'Payment method updated successfully!!' });
    }
    if (error) {
      showToast({ message: error.message, type: 'error' });
    }
  }, [data, loading, error, dispatch, token]);

  /**
   * Do set Payment address callback function.
   * @param {SetPaymentAddressesOnCartInput} addressInput - Payment Address
   */
  const setPaymentMethodsHandler = async (
    input: SetPaymentMethodOnCartInput
  ) => {
    await setPaymentMethodHandler({ variables: input });
  };

  return { setPaymentMethodsHandler, isInProcess };
};

/**
 * Coupon applier
 * @returns {CallBackFunction, boolean}
 */
export const useApplyCoupon = () => {
  const dispatch = useAppDispatch();

  const [isInProcess, setIsInProcess] = useState(false);
  const token = useToken() || null;
  const cartId = useSelector<RootState>(
    (state: { cart: { id: string } }) => state?.cart?.id
  );
  const [applyCoupon, { data, loading, error }] =
    useCustomerMutation(ApplyCouponToCart);
  useEffect(() => {
    setIsInProcess(loading);
    const cartData = data?.applyCouponToCart?.cart || null;
    if (cartData) {
      dispatch(setCart({ ...cartData, isGuest: token ? false : true }));
      showToast({ message: 'Coupon applied successfully!!', type: 'success' });
    }
    if (error) {
      showToast({ message: error.message, type: 'error' });
    }
  }, [data, loading, error, dispatch, token]);

  /**
   * Do apply coupon callback function.
   * @param {String} couponCode - Coupon code
   */
  const applyCouponHandler = (couponCode: string) => {
    try {
      applyCoupon({
        variables: { couponCode: couponCode, cartId: cartId },
      });
    } catch (error: any) {
      showToast({ message: error.message, type: 'error' });
    }
  };

  return { applyCouponHandler, isInProcess };
};

/**
 * Place Order handler
 */
export const usePlaceOrder = () => {
  const [isInProcess, setIsInProcess] = useState(false);

  const [placeOrder, { data, loading, error }] =
    useCustomerMutation(PlaceOrder);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsInProcess(loading);

    if (data?.placeOrder?.order?.order_number) {
      const orderNumber = data.placeOrder.order.order_number;
      dispatch(setOrderId(orderNumber));
      showToast({ message: 'Order Placed successfully!!' });
    } else if (error) {
      showToast({ message: error.message, type: 'error' });
    }
  }, [data, error, dispatch, loading]);

  const placeOrderHandler = async (cartId: string) => {
    try {
      await placeOrder({
        variables: {
          cartId,
        },
      });
    } catch (error: any) {
      showToast({ message: error.message, type: 'error' });
    }
  };
  return { placeOrderHandler, isInProcess };
};

/**
 * Remove coupon from cart.
 *
 * @returns {CallBackFunction, boolean}
 */
export const useRemoveCouponFromCart = () => {
  const dispatch = useAppDispatch();
  const token = useToken() || null;
  const [isInProcess, setIsInProcess] = useState(false);
  const cartId = useSelector<RootState>(
    (state: { cart: { id: string } }) => state.cart?.id
  );
  const [removeCoupon, { data, loading, error }] =
    useCustomerMutation(RemoveCouponFromCart);
  useEffect(() => {
    setIsInProcess(loading);
    const cartData = data?.removeCouponFromCart?.cart || null;
    if (cartData) {
      dispatch(setCart({ ...cartData, isGuest: token ? false : true }));
    }
    if (error) {
      // console.log('message:', error.message);
    }
  }, [data, loading, error, dispatch, token]);

  /**
   * Do remove coupon callback function.
   * @param {String} couponCode - Coupon code
   */
  const removeCouponHandler = () => {
    try {
      removeCoupon({
        variables: { cartId: cartId },
      });
      showToast({ message: 'Coupon removed from cart!!', type: 'success' });
    } catch (error: any) {
      showToast({ message: error.message, type: 'error' });
    }
  };

  return { removeCouponHandler, isInProcess };
};

export const createEmptyCart = async (
  token: string = '',
  callback: (cartData: CartInterface) => void // eslint-disable-line
) => {
  if (token) {
    createCustomerCart(token, callback);
  } else {
    createGuestCart(callback);
  }
};

const createGuestCart = async (
  callback: (cartData: CartInterface) => void // eslint-disable-line
) => {
  const data = await graphqlRequest({
    query: CreateEmptyCartQuery,
    options: {
      fetchPolicy: 'network-only',
    },
  });

  if (data && data.createEmptyCart) {
    fetchCartData(data.createEmptyCart, callback);
  }
};

const createCustomerCart = async (
  token: string = '',
  callback: (cartData: CartInterface) => void // eslint-disable-line
) => {
  const customerData = await graphqlRequest({
    query: CustomerCartQuery,
    options: {
      fetchPolicy: 'network-only',
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    },
  });

  if (customerData && customerData.customerCart) {
    callback(customerData.customerCart);
  }
};

export const useCreateEmptyCart = (checkout = false) => {
  const { status, data: session } = useSession();
  const [updateCart] = useLazyQuery(CART_QUERY, {
    fetchPolicy: 'no-cache',
  });
  // Create the hook but it won't execute unless explicitly called
  const [customerCart, { refetch }] = useLazyQuery(CustomerCartQuery, {
    fetchPolicy: 'no-cache',
  });
  const dispatch = useAppDispatch();
  const quote = useAppSelector((state) => state?.cart);
  const storeCode = process.env.DEFAULT_STORE_CODE;

  const [createEmptyCart, { loading: newCartLoad }] = useMutation(
    CreateEmptyCartQuery,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const emptyCart = () => {
    if (session?.user?.token && (status === AUTHORIZED)) {
      customerCart({
        context: {
          headers: {
            Authorization: `Bearer ${session?.user?.token ?? ''}`,
            Store: storeCode,
          },
        },
      })
        .then((res) => {
          const data = res?.data?.customerCart;
          if (isValidObject(data) && data && data.id) {
            dispatch(setCart({ ...data }));
          }
        })
        .catch((error) => {
          if (
            error.graphQLErrors?.some(
              (err: {
                extensions: { category: string };
                message: string | string[];
              }) =>
                errorCat.includes(err.extensions?.category) ||
                errorAuthentication.includes(
                  err.extensions?.category as string
                ) ||
                err.message.includes(
                  'The current user cannot perform operations on cart'
                )
            )
          ) {
            Logout();
          } else if (error.message.includes("The cart isn't active.")) {
            refetch().then((res) => {
              const data = res?.data?.customerCart;
              if (isValidObject(data) &&
                data?.cart &&
                data.cart.id) {
                dispatch(setCart({ ...data }));
              }
            });
          }
        });
    }
    else if (
      !newCartLoad || checkout
    ) {
      createEmptyCart().then((res) => {
        if (res?.data?.createEmptyCart) {
          updateCart({
            variables: { cartId: res?.data?.createEmptyCart || '' },
          }).then((res) => {
            const data = res?.data?.cart;
            if (isValidObject(data) &&
              data &&
              data.id) {
              dispatch(setCart({ ...data, isGuest: true }));
            }
          });
          const newCartData = {
            id: res?.data?.createEmptyCart,
            isGuest: true,
          };
          setLocalStorage(GUEST_CART, JSON.stringify(newCartData));
        }
      });
    } else {
      updateCart({
        variables: { cart_id: quote?.id || '' },
      }).then((res) => {
        const data = res?.data?.cart;
        if (isValidObject(data) &&
          data &&
          data.id) {
          dispatch(setCart({ ...data, isGuest: true }));

        }
      });
    }
  };
  return emptyCart;
};


/**
 * Create empty guest cart for logout scenario
 * This function creates a new guest cart and updates the Redux store
 */
export const createEmptyGuestCartOnLogout = async () => {
  try {
    const locale = getLocalStorage('current_store');

    const data = await graphqlMutate({
      mutation: CreateEmptyCartQuery,
      options: {
        Store:  locale,
      },
    });

    if (data && data.createEmptyCart) {
      // Fetch the cart data and update the store
      const cartData = await graphqlRequest({
        query: CART_QUERY,
        variables: { cartId: data.createEmptyCart },
        options: {
          context: {
            headers: {
              Store:  locale ?? process.env.DEFAULT_STORE_CODE,
            },
          },
        },
      });

      if (isValidObject(cartData) && cartData.cart && cartData.cart.id) {
        // Import store dynamically to avoid circular dependency
        const { store } = await import('store');
        const { setCart } = await import('@store/cart');

        store.dispatch(setCart({ ...cartData.cart, isGuest: true }));

        // Also update local storage
        const newCartData = {
          id: data.createEmptyCart,
          isGuest: true,
        };
        setLocalStorage(GUEST_CART, JSON.stringify(newCartData));
      }
    }
  } catch (error) {
    console.error('Failed to create empty cart on logout:', error);
  }
};

