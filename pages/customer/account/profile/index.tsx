import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Containers from '@packages/module-theme/components/ui/Container';
import { UserProfilePlaceHolder } from '@packages/module-customer/Components/OverviewTab/PlaceHolder';
import { Suspense } from 'react';

const Profile = dynamic(
  () => import('@voguish/module-customer/Components/ProfileTab/Profile'),
  {
    loading: () => (
      <Containers>
        <UserProfilePlaceHolder />
      </Containers>
    ),
    ssr: false,
  }
);
function ProfilePage() {
  return (
    <Suspense
      fallback={
        <Containers>
          <UserProfilePlaceHolder />
        </Containers>
      }
    >
      <Profile />
    </Suspense>
  );
}

export default ProfilePage;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Customer Profile',
    description: 'Customer profile',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};
