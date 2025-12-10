import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import type { PageOptions } from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
const NewPassword = dynamic(
  () => import('@voguish/module-theme/pages/NewPassword')
);
const CreateNewPassword = () => {
  return <NewPassword />;
};
const pageOptions: PageOptions = {
  title: i18n._(t`Set New Password`),
  description: i18n._(t`Welcome to Voguish Theme`),
};
CreateNewPassword.pageOptions = pageOptions;
export default CreateNewPassword;
