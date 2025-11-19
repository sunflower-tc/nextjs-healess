import { useEffect, useState } from 'react';

export const useCart = (initialCartState: any) => {
  const [cartOpen, setCartOpen] = useState(initialCartState);

  const toggleCart = (open: boolean) => () => {
    setCartOpen({ ...cartOpen, right: open });
  };

  return [cartOpen, toggleCart];
};

export function useShowWishlistLoadingButton(loading: any) {
  const [showWishlistLoadingButton, setShowWishlistLoadingButton] =
    useState(false);

  useEffect(() => {
    if (loading) {
      setShowWishlistLoadingButton(true);
    } else {
      setTimeout(() => {
        setShowWishlistLoadingButton(false);
      }, 1000);
    }
  }, [loading]);

  return showWishlistLoadingButton;
}
