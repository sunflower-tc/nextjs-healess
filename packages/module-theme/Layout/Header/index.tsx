import { useQuery } from '@apollo/client';
import { useAppSelector } from '@store/hooks';
import { STORE_CONFIG, getLocalStorage } from '@store/local-storage';
import MenuHelper from '@utils/Menu';
import { HeaderPlaceHolder } from '@voguish/module-theme/components';
import MEGAMENU_QUERY from '@voguish/module-theme/graphql/MegaMenu.graphql';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { RootState } from 'store';
import { Burger } from './HamburgerMenu';
import HeaderIcons from './HeaderIcons';
import MegaMenu from './Megamenu';
import { MegaMenuQueryResult } from './Megamenu/types';
import SideBar from './SideBar';

//font and icon in ulr key filter

const Header = ({ isAccountLoggedIn }: { isAccountLoggedIn: boolean }) => {
  const [activeMenuPath, setActiveMenuPath] = useState<string>('/');
  const { data, loading } = useQuery<MegaMenuQueryResult>(MEGAMENU_QUERY);
  const quote = useAppSelector((state: RootState) => state.cart?.quote || null);
  const {
    query: { urlKey = '/' },
  } = useRouter();

  useEffect(() => {
    if (data?.megaMenu) {
      const menu = data.megaMenu;
      const activeMenu = menu.find((menu) => urlKey === menu.url_key);
      const path =
        activeMenu?.path && activeMenu.path !== '/'
          ? activeMenu.path.slice(4)
          : '';
      setActiveMenuPath(path);
    }
  }, [urlKey, data]);

  const cartItems = quote?.items || [];
  let profileUrl = '/customer/account/login';
  if (isAccountLoggedIn) {
    profileUrl = '/customer/account/';
  }
  const sortedMenu = MenuHelper.reduce(data?.megaMenu || []);
  const storeData = getLocalStorage(STORE_CONFIG, true) || {};

  const baseUrl = storeData?.base_url;
  const logoUrl = storeData?.header_logo_src;

  const activeMenus = activeMenuPath.split('/');

  const [open, setOpen] = useState(false);
  const node = useRef<any>();

  return (
    <>
      {loading ? (
        <header className="sticky top-0 w-full bg-white shadow-lg">
          <HeaderPlaceHolder />
        </header>
      ) : (
        <div
          aria-label="navigation-menu"
          className="fixed top-0 z-[999] w-full bg-white"
        >
          {/* Mobile menu */}

          <header className="w-full bg-white shadow-lg">
            <nav
              aria-label="Top"
              className="px-4 mx-auto sm:px-6 max-w-[125rem] lg:px-8"
            >
              <div className="flex items-center justify-between w-full h-16 gap-4 mx-auto -3xs:gap-1.5">
                <span className="sr-only lg:hidden">open sidebar</span>
                <div ref={node} className="lg:hidden">
                  <div className="relative flex items-center cursor-pointer max-w-fit max-h-fit">
                    <Burger open={open} setOpen={setOpen} />
                  </div>
                  <SideBar
                    openSidebar={open}
                    setOpenSidebar={setOpen}
                    sortedMenu={sortedMenu}
                  />
                </div>
                <div aria-label="voguish">
                  <Link aria-label="Go to Voguish Home Page" href="/">
                    <Image
                      priority={true}
                      loading="eager"
                      src={baseUrl ? `${baseUrl}media/logo/${logoUrl}` : ''}
                      alt={storeData?.logo_alt || 'voguish'}
                      height={28}
                      width={88}
                    />
                  </Link>
                </div>
                {/* Flyout menus */}

                <MegaMenu menuItems={sortedMenu} activeMenus={activeMenus} />

                <div
                  aria-label="header-icons"
                  className="flex items-center ml-auto"
                >
                  <HeaderIcons
                    isAccountLoggedIn={isAccountLoggedIn}
                    length={cartItems}
                    profileUrl={profileUrl}
                  />
                </div>
              </div>
            </nav>
          </header>
        </div>
      )}
    </>
  );
};
export default Header;
