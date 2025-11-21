import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import dynamic from 'next/dynamic';

const PasswordForm = dynamic(
  () => import('@voguish/module-customer/Components/PasswordTab/PasswordForm')
);
const Index = () => {
  return (
    <>
      <PasswordForm />
    </>
  );
};
Index.pageOptions = {
  title: i18n._(t`Reset Password`),
  description: i18n._(t`Customer reset password of your login credential`),
};
export default Index;
