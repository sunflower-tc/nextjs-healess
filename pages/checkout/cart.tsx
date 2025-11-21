import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
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
  title: i18n._(t`Shopping Cart`),
};
Cart.pageOptions = pageProps;

export default Cart;
