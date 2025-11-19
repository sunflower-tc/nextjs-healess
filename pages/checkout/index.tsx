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
  title: 'Checkout',
};
Checkout.pageOptions = pageProps;

export default Checkout;
