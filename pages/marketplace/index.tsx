import Main from '@voguish/module-marketplace/pages/Main';
import { NextPageWithLayout, PageOptions } from '@voguish/module-theme';

const SellerIndex: NextPageWithLayout = () => {
  return <Main />;
};

export default SellerIndex;

const pageProps: PageOptions = {
  title: 'Turn Your Passion Into a Business',
  description: 'Turn Your Passion Into a Business',
  showBreadcrumb: false,
};

SellerIndex.pageOptions = pageProps;
