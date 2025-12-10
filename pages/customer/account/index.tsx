import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import dynamic from 'next/dynamic';

const UserInfo = dynamic(
  () => import('@voguish/module-customer/Components/OverviewTab/UserInfo')
);

const OverView = () => {
  return (
    <>
      <UserInfo />
    </>
  );
};

OverView.pageOptions = {
  title: i18n._(t`Overview`),
  description: i18n._(t`Welcome to Voguish customer account`),
};
export default OverView;
