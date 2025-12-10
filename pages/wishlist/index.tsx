import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import dynamic from 'next/dynamic';

const Wishlist = dynamic(
  () => import('@voguish/module-customer/Components/WishlistTab/Wishlist')
);

const Index = () => {
  return (
    <>
      <Wishlist />
    </>
  );
};

Index.pageOptions = {
  title: i18n._(t`Wishlist`),
  description: i18n._(t`Welcome to Voguish Theme`),
};
export default Index;
