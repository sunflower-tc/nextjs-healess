import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { PageOptions } from '@voguish/module-theme';
import dynamic from 'next/dynamic';
const CheckoutSuccessPage = dynamic(
  () => import('@voguish/module-quote/pages/SuccessPage')
);

const CheckoutSuccess = () => {
  return <CheckoutSuccessPage />;
};
const pageProps: PageOptions = {
  title: i18n._(t`Order Placed`),
};
CheckoutSuccess.pageOptions = pageProps;
export default CheckoutSuccess;
