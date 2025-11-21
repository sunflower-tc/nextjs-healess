import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import dynamic from 'next/dynamic';
const LoginAccount = dynamic(
  () => import('@voguish/module-theme/pages/LoginAccount')
);
const Login = () => {
  return <LoginAccount />;
};

Login.pageOptions = {
  title: i18n._(t`Customer Login`),
  description: i18n._(t`Welcome to Voguish Theme`),
};
export default Login;
