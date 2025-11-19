import { STORE_CONFIG, getKeyFromStorage } from '@store/local-storage';
import { isValidArray } from '@utils/Helper';
import { useToken } from '@voguish/module-customer';
import { Cart } from '@voguish/module-quote';
import CurrencySwitcher from '@voguish/module-store/CurrencySwitcher';
import {
  IconAccount,
  IconBag,
  IconSearch,
  IconSell,
  IconWhishList,
  Link,
  SearchPopOver,
} from '@voguish/module-theme';
import { useCart } from '@voguish/module-theme/components/ui/hooks/ExtraHooks';
import { useState } from 'react';
export interface HeaderTypes {
  profileUrl: string;
  length?: [] | any;
  isAccountLoggedIn: boolean;
}
const HeaderIcons = ({
  profileUrl,
  length,
  isAccountLoggedIn,
}: HeaderTypes) => {
  const [search, setSearch] = useState(false);
  const handleSearch = () => setSearch(!search);
  const [cartOpen, toggleCart] = useCart({ right: false });
  const requiredKey = 'marketplace_is_active';
  const storeData = getKeyFromStorage(STORE_CONFIG, requiredKey) || false;
  const token = useToken() || isAccountLoggedIn;
  return (
    <>
      <div className="flex items-center justify-center gap-x-2 md:gap-x-3 xl:gap-x-4">
        {storeData && (
          <button
            aria-label="Go to marketplace"
            className="relative w-8 h-8 p-0 bg-transparent border-none outline-none cursor-pointer group hover:text-brand focus:ring-primary/5"
          >
            <Link aria-label="Got to marketplace" href="/marketplace">
              <IconSell hover="stroke-black group-hover:stroke-brand duration-150" />
            </Link>
          </button>
        )}
        <button
          aria-label="Search"
          onClick={handleSearch}
          className="relative w-8 h-8 p-0 bg-transparent border-none outline-none cursor-pointer group hover:text-brand focus:ring-primary/5"
        >
          <IconSearch hover="fill-black group-hover:fill-brand duration-150" />
        </button>
        <div className="relative flex justify-center w-8 h-8 p-0 bg-transparent border-none outline-none cursor-pointer -lg:hidden hover:text-brand focus:ring-primary/5">
          <CurrencySwitcher />
        </div>
        <button
          aria-label="Go to account"
          className="relative w-8 h-8 p-0 bg-transparent border-none outline-none cursor-pointer group hover:text-brand focus:ring-primary/5"
        >
          <Link aria-label="Go to account" href={profileUrl}>
            <IconAccount hover="stroke-black group-hover:stroke-brand duration-150" />
          </Link>
        </button>
        {token && (
          <button
            aria-label="open whishlist"
            className="relative w-8 h-8 p-0 bg-transparent border-none outline-none cursor-pointer group -lg:hidden hover:text-brand focus:ring-primary/5"
          >
            <Link aria-label="Go to wishlist" href="/wishlist">
              <IconWhishList hover="stroke-black group-hover:stroke-brand duration-150" />
            </Link>
          </button>
        )}
        <button
          aria-describedby="cart open"
          aria-label={`Cart contains ${
            isValidArray(length) ? length?.length : 0
          } items open to view them`}
          onClick={toggleCart(true)}
          className="relative w-8 h-8 p-0 bg-transparent border-none outline-none cursor-pointer -bottom-1 hover:text-brand focus:ring-primary/5"
        >
          <p className="sr-only">Cart Open</p>
          <IconBag />
          {isValidArray(length) && (
            <span
              aria-label="Cart Count"
              className="absolute -right-[5px] -top-[5px] px-2 text-xs py-0.5 text-green-100 rounded-full bg-brand"
            >
              {length?.length}
            </span>
          )}
        </button>
        {!cartOpen ? (
          ''
        ) : (
          <Cart toggleDrawer={toggleCart} cartOpen={cartOpen} />
        )}
      </div>
      <SearchPopOver open={search} handleSearch={handleSearch} />
    </>
  );
};
export default HeaderIcons;
