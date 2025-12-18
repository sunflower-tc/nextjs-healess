import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Containers from '@packages/module-theme/components/ui/Container';
import { UserProfilePlaceHolder as UserResetPasswordPlaceholder } from '@packages/module-customer/Components/OverviewTab/PlaceHolder';
import { Suspense } from 'react';

const PasswordForm = dynamic(
  () => import('@voguish/module-customer/Components/PasswordTab/PasswordForm'),
  {
    loading: () => (
      <Containers>
        <UserResetPasswordPlaceholder />
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
          <UserResetPasswordPlaceholder />
        </Containers>
      }
    >
      <PasswordForm />
    </Suspense>
  );
};

export default Index;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Reset Password',
    description: 'Customer reset password of your login credential',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      pageOptions: pageProps,
    },
  };
};
