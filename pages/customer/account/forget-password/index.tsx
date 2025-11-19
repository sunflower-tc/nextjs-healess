import type {
  NextPageWithLayout,
  PageOptions,
} from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
const Forget = dynamic(
  () => import('@voguish/module-theme/pages/ForgetPassword')
);

const ForgetPassword: NextPageWithLayout = () => {
  return (
    <span className="md:-mt-10">
      <Forget />
    </span>
  );
};
const pageOptions: PageOptions = {
  title: 'Forgot Your Password',
  description: 'Welcome to Voguish Theme',
};
ForgetPassword.pageOptions = pageOptions;
export default ForgetPassword;
