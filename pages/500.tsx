import { PageOptions } from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
const Server = dynamic(() => import('@voguish/module-theme/pages/Server'));

export default function ServerError() {
  return <Server />;
}
const pageProps: PageOptions = {
  title: 'Server Error - Voguish',
  description: 'Welcome to Voguish Theme',
  showBreadcrumb: false,
};
ServerError.pageOptions = pageProps;
