import { STORE_CONFIG, getKeyFromStorage } from '@store/local-storage';
import type {
  NextPageWithLayout,
  PageOptions,
} from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
const StoreList = dynamic(
  () => import('@voguish/module-marketplace/Components/StoreList')
);
const SellerList: NextPageWithLayout = () => {
  const marketplaceIsActive =
    getKeyFromStorage(STORE_CONFIG, 'marketplace_is_active') || false;
  return <>{marketplaceIsActive && <StoreList />}</>;
};

export default SellerList;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'All Sellers',
    description: 'All Sellers',
    showBreadcrumb: true,
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};
