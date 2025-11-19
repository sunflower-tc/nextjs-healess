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
  title: 'Reset Password',
  description: 'Customer reset passsword of your login credential',
};
export default Index;
