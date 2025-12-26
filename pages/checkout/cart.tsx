import { Suspense } from 'react';
import { CheckoutCartPlaceholder } from '@voguish/module-marketplace/Components/Placeholder';
import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const CartPage = dynamic(() => import('@voguish/module-quote/pages/CartPage'), {
  ssr: false,
  loading: () => <CheckoutCartPlaceholder />,
});

export function Cart() {
  return (
    <Suspense fallback={<CheckoutCartPlaceholder />}>
      <CartPage />
    </Suspense>
  );
}

export default Cart;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Shopping Cart',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};
