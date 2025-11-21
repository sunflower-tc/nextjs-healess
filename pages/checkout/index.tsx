import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { PageOptions } from '@voguish/module-theme';
import dynamic from 'next/dynamic';
const CheckoutHome = dynamic(
  () => import('@voguish/module-quote/pages/CheckoutHome')
);

const Checkout = () => {
  return (
    <>
      <CheckoutHome />
    </>
  );
};

const pageProps: PageOptions = {
  title: i18n._(t`Checkout`),
};
Checkout.pageOptions = pageProps;

export default Checkout;
