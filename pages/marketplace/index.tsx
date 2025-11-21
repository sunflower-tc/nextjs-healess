import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import Main from '@voguish/module-marketplace/pages/Main';
import { NextPageWithLayout, PageOptions } from '@voguish/module-theme';

const SellerIndex: NextPageWithLayout = () => {
  return <Main />;
};

export default SellerIndex;

const pageProps: PageOptions = {
  title: i18n._(t`Turn Your Passion Into a Business`),
  description: i18n._(t`Turn Your Passion Into a Business`),
  showBreadcrumb: false,
};

SellerIndex.pageOptions = pageProps;
