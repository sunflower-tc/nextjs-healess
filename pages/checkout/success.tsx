import { PageOptions } from '@voguish/module-theme';
import dynamic from 'next/dynamic';
const CheckoutSuccessPage = dynamic(
  () => import('@voguish/module-quote/pages/SuccessPage')
);

const CheckoutSuccess = () => {
  return <CheckoutSuccessPage />;
};
const pageProps: PageOptions = {
  title: 'Order Placed',
};
CheckoutSuccess.pageOptions = pageProps;
export default CheckoutSuccess;
