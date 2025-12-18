import { Suspense } from 'react';
import { CheckoutCartPlaceholder } from '@packages/module-marketplace/Components/Placeholder';
import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const CheckoutHome = dynamic(
  () => import('@voguish/module-quote/pages/CheckoutHome'),
  {
    ssr: false,
    loading: () => <CheckoutCartPlaceholder />,
  }
);

const Checkout = () => {
  return (
    <Suspense fallback={<CheckoutCartPlaceholder />}>
      <CheckoutHome />
    </Suspense>
  );
};

export default Checkout;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Cart Checkout',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      pageOptions: pageProps,
    },
  };
};
