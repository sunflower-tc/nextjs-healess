import type { PageOptions } from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
const NewPassword = dynamic(
  () => import('@voguish/module-theme/pages/NewPassword')
);
const CreateNewPassword = () => {
  return <NewPassword />;
};
// CreateNewPassword.pageOptions = pageOptions;
const pageOptions: PageOptions = {
  title: 'Set New Password',
  description: 'Welcome to Voguish Theme',
};
CreateNewPassword.pageOptions = pageOptions;
export default CreateNewPassword;
