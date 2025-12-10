import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import type {
  NextPageWithLayout,
  PageOptions,
} from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
const StoreList = dynamic(
  () => import('@voguish/module-marketplace/Components/StoreList')
);
const SellerList: NextPageWithLayout = () => {
  return <StoreList/>
};

const pageProps: PageOptions = {
  title: i18n._(t`All Sellers`),
  description: i18n._(t`All Sellers`),
  showBreadcrumb: true,
};

SellerList.pageOptions = pageProps;

export default SellerList;
