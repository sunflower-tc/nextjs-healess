import { UserProfilePlaceHolder } from '@packages/module-customer/Components/OverviewTab/PlaceHolder';
import Containers from '@packages/module-theme/components/ui/Container';
import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AddressList = dynamic(
  () => import('@voguish/module-customer/Components/AddressTab/AddressList'),
  {
    loading: () => (
      <Containers>
        <UserProfilePlaceHolder />
      </Containers>
    ),
    ssr: false,
  }
);

const Index = () => {
  return (
    <Suspense
      fallback={
        <Containers>
          <UserProfilePlaceHolder />
        </Containers>
      }
    >
      <AddressList />
    </Suspense>
  );
};

export default Index;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Customer Address',
    description: 'Customer Address List',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};
