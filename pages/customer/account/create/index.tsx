import type { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Containers from '@packages/module-theme/components/ui/Container';
import { AuthPlaceholder } from '@packages/placeholder/ProductDetail';

const CreateAccount = dynamic(
  () => import('@voguish/module-theme/pages/CreateAccount'),
  {
    loading: () => (
      <Containers>
        <AuthPlaceholder />
      </Containers>
    ),
    ssr: false,
  }
);
const SignUp = () => {
  return (
    <Suspense
      fallback={
        <Containers>
          <AuthPlaceholder />
        </Containers>
      }
    >
      <CreateAccount />
    </Suspense>
  );
};

export default SignUp;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Create New Account',
    description: 'Welcome to Voguish Theme',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      pageOptions: pageProps,
    },
  };
};
