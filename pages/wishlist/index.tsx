import { Suspense } from 'react';
import { WishlistPlaceholder } from '@voguish/module-marketplace/Components/Placeholder';
import Containers from '@voguish/module-theme/components/ui/Container';
import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const Wishlist = dynamic(
  () => import('@voguish/module-customer/Components/WishlistTab/Wishlist'),
  {
    loading: () => (
      <Containers>
        <WishlistPlaceholder />
      </Containers>
    ),
  }
);

const Index = () => {
  return (
    <Suspense
      fallback={
        <Containers>
          <WishlistPlaceholder />
        </Containers>
      }
    >
      <Wishlist />
    </Suspense>
  );
};

export default Index;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Wishlist-Voguish',
    description: 'Welcome to Voguish theme',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};
