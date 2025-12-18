import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Containers from '@packages/module-theme/components/ui/Container';
import { UserProfilePlaceHolder as UserOderPlaceholder } from '@packages/module-customer/Components/OverviewTab/PlaceHolder';
import { Suspense } from 'react';
const OrderProduct = dynamic(
  () => import('@voguish/module-customer/Components/OrderTab/OrderProduct'),
  {
    loading: () => (
      <Containers>
        <UserOderPlaceholder />
      </Containers>
    ),
    ssr: false,
  }
);

const Order = () => {
  return (
    <Suspense
      fallback={
        <Containers>
          <UserOderPlaceholder />
        </Containers>
      }
    >
      <OrderProduct />
    </Suspense>
  );
};

export default Order;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Order List - Voguish',
    description: 'Voguish product order',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};
