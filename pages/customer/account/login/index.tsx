import dynamic from 'next/dynamic';
const LoginAccount = dynamic(
  () => import('@voguish/module-theme/pages/LoginAccount')
);
const Login = () => {
  return <LoginAccount />;
};

Login.pageOptions = {
  title: 'Customer Login',
  description: 'Welcome to Voguish Theme',
};
export default Login;
