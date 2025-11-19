import { PageOptions } from '@voguish/module-theme';
import dynamic from 'next/dynamic';
const NotFoundError = dynamic(
  () => import('@voguish/module-theme/pages/NotFound')
);

export default function NotFound() {
  return (
    <>
      <NotFoundError />
    </>
  );
}
const pageProps: PageOptions = {
  title: 'Not Found',
};
NotFound.pageOptions = pageProps;
