import { PageOptions } from '@voguish/module-theme';
import dynamic from 'next/dynamic';

const CartPage = dynamic(() => import('@voguish/module-quote/pages/CartPage'));

export function Cart() {
  return (
    <>
      <CartPage />
    </>
  );
}
const pageProps: PageOptions = {
  title: 'Shopping Cart',
};
Cart.pageOptions = pageProps;

export default Cart;
