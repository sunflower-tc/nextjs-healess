import type { PageOptions } from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
const CreateAccount = dynamic(
  () => import('@voguish/module-theme/pages/CreateAccount')
);
const SignUp = () => {
  return <CreateAccount />;
};
// SignUp.pageOptions = pageOptions;
const pageOptions: PageOptions = {
  title: 'Create Account',
  description: 'Welcome to Voguish Theme',
};
SignUp.pageOptions = pageOptions;
export default SignUp;
