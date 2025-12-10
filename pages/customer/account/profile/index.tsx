import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import dynamic from 'next/dynamic';

const Profile = dynamic(
  () => import('@voguish/module-customer/Components/ProfileTab/Profile')
);
function Index() {
  return (
    <>
      <Profile />
    </>
  );
}
Index.pageOptions = {
  title: i18n._(t`Profile`),
  description: i18n._(t`Customer profile`),
};
export default Index;
