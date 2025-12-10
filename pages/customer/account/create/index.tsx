import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import type { PageOptions } from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
const CreateAccount = dynamic(
  () => import('@voguish/module-theme/pages/CreateAccount')
);
const SignUp = () => {
  return <CreateAccount />;
};
const pageOptions: PageOptions = {
  title: i18n._(t`Create Account`),
  description: i18n._(t`Welcome to Voguish Theme`),
};
SignUp.pageOptions = pageOptions;
export default SignUp;
