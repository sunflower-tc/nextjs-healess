import { STORE_CONFIG, getKeyFromStorage } from '@store/local-storage';
import type {
  NextPageWithLayout,
  PageOptions,
} from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
const StoreList = dynamic(
  () => import('@voguish/module-marketplace/Components/StoreList')
);
const SellerList: NextPageWithLayout = () => {
  const marketplaceIsActive =
    getKeyFromStorage(STORE_CONFIG, 'marketplace_is_active') || false;
  return <>{marketplaceIsActive && <StoreList />}</>;
};

const pageProps: PageOptions = {
  title: 'All Sellers',
  description: 'All Sellers',
  showBreadcrumb: true,
};

SellerList.pageOptions = pageProps;

export default SellerList;
