import { Dialog, Tab, Transition } from '@headlessui/react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ChevronLeft } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { isValidArray, isValidObject } from '@utils/Helper';
import { useToken } from '@voguish/module-customer';
import CurrencySwitcher from '@voguish/module-store/CurrencySwitcher';
import StoreSwitcher from '@voguish/module-store/StoreSwitcher';
import { IconWhishList } from '@voguish/module-theme/components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { FormattedMenuItem } from './Megamenu/types';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  openSidebar?: any;
  setOpenSidebar?: any;
  sortedMenu: Record<string, FormattedMenuItem>;
};

type Category = {
  title: string;
  url_key: string;
  image_url: string;
  children?: Record<string, FormattedMenuItem>;
};

export default function SideBar({
  openSidebar,
  setOpenSidebar,
  sortedMenu,
}: Props) {
  const token = useToken();
  const categories: Category[] = isValidObject(sortedMenu)
    ? Object.values(Object.values(sortedMenu)?.[0]?.children)
    : [];
  const userName = useSelector((state: RootState) => state?.user.name);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <Transition.Root aria-label="sidebar" show={openSidebar} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setOpenSidebar}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              aria-label="sidebar-menu"
              className="relative flex flex-col w-full pb-6 overflow-y-auto bg-white shadow-xl mt-14"
            >
              <Tab.Group
                vertical
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                as="div"
                className="pb-6 mt-6"
              >
                <div className="border-b border-gray-200">
                  {selectedIndex === -1 && (
                    <div className="flex items-center justify-start w-full px-1 text-base font-semibold leading-6 text-left uppercase duration-300 border-0 rounded-md hover:bg-white hover:text-brand -tracking-wide">
                      <ChevronLeft onClick={() => setSelectedIndex(-1)} />
                      All Categories
                    </div>
                  )}
                  {isValidArray(categories) && (
                    <Tab.List className="flex flex-col-reverse -mb-px">
                      {categories.map(
                        (category) =>
                          isValidObject(category?.children) && (
                            <Tab
                              key={category?.title}
                              className={({ selected }) =>
                                classNames(
                                  selected
                                    ? ''
                                    : `text-gray-900 ${
                                        selectedIndex !== -1 && 'hidden'
                                      }`,
                                  ' mx-2 py-4 bg-white leading-6 font-semibold hover:bg-white text-left rounded-md duration-300 hover:text-brand px-1  flex items-center  border-0 text-base -tracking-wide uppercase'
                                )
                              }
                            >
                              {selectedIndex !== -1 && (
                                <div className="max-w-fit cta">
                                  <div className="flex items-center justify-start w-full cursor-pointer hover-underline-animation">
                                    <ChevronLeft
                                      onClick={() => setSelectedIndex(-1)}
                                    />

                                    <span className="mt-1">
                                      {category?.title}
                                    </span>
                                  </div>
                                </div>
                              )}
                              {selectedIndex === -1 && (
                                <div className="cursor-pointer max-w-fit cta">
                                  <div className="flex items-center justify-between w-full hover-underline-animation">
                                    <span className="mt-1">
                                      {category?.title}
                                    </span>
                                    <ChevronRightIcon />
                                  </div>
                                </div>
                              )}
                            </Tab>
                          )
                      )}
                    </Tab.List>
                  )}
                </div>
                <Tab.Panels as={Fragment}>
                  {categories.map(
                    (category) =>
                      selectedIndex >= 0 && (
                        <Tab.Panel
                          key={category.title}
                          className="px-4 space-y-5"
                        >
                          {isValidObject(category?.children) &&
                            Object.values(
                              Object.values(category?.children || {})
                            ).map((section) => (
                              <div key={section.title}>
                                <LinkItem
                                  setOpenSidebar={setOpenSidebar}
                                  page={section}
                                />
                                <ul
                                  role="list"
                                  aria-labelledby={`${category?.title}-${section.title}-heading-mobile`}
                                  className="flex flex-col mt-2 -ml-6 space-y-6"
                                >
                                  {isValidArray(
                                    Object.values(
                                      Object.values(section?.children) || {}
                                    )
                                  ) &&
                                    Object.values(
                                      Object.values(section?.children)
                                    ).map((item) => (
                                      <li
                                        key={item?.title}
                                        className="flow-root"
                                      >
                                        <LinkItem
                                          setOpenSidebar={setOpenSidebar}
                                          page={item}
                                        />
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            ))}
                        </Tab.Panel>
                      )
                  )}
                </Tab.Panels>
              </Tab.Group>
              {selectedIndex === -1 && (
                <>
                  <div className="px-4 py-8 space-y-6 border-0 border-gray-200 border-solid border-y">
                    {isValidArray(categories) &&
                      categories.map(
                        (page) =>
                          !isValidObject(page?.children) && (
                            <div key={page?.title} className="flow-root">
                              <LinkItem
                                setOpenSidebar={setOpenSidebar}
                                page={page}
                              />
                            </div>
                          )
                      )}
                  </div>
                  <div className="flex flex-col justify-end h-full">
                    <div className="border-0 border-t border-gray-200 border-solid mt-28">
                      {!token ? (
                        <div className="flex justify-center max-w-2xl gap-5 px-4 py-10 mx-auto">
                          <Link
                            href="/customer/account/login"
                            className="w-1/2"
                          >
                            <Button variant="outlined" className="w-full py-3">
                              Sign In
                            </Button>
                          </Link>
                          <Link
                            href="/customer/account/create"
                            className="w-1/2"
                          >
                            <Button variant="contained" className="w-full py-3">
                              Create Account
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href="/customer/account"
                          className="flex items-center justify-between max-w-full gap-5 px-4 py-6 mx-auto"
                        >
                          <div className="grid">
                            <Typography
                              variant="body1"
                              className="font-semibold"
                            >
                              Welcome
                            </Typography>
                            <Typography variant="h2" className="font-semibold">
                              {userName}
                            </Typography>
                          </div>
                          <ArrowForwardIosIcon />
                        </Link>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between max-w-full gap-5 px-3 mx-auto">
                        <div>
                          <StoreSwitcher />
                        </div>
                        <div className="-ml-12">
                          <CurrencySwitcher />
                        </div>
                        <button
                          aria-label="open whishlist"
                          className="relative w-8 h-8 p-0 bg-transparent border-none outline-none cursor-pointer hover:text-brand focus:ring-primary/5"
                        >
                          <Link
                            aria-label="Go to wishlist"
                            href={
                              token ? '/wishlist' : '/customer/account/login'
                            }
                          >
                            <IconWhishList />
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}
type MenuItem = {
  setOpenSidebar: any;
  page: { url_key: string; title: string };
};
function LinkItem({ setOpenSidebar, page }: MenuItem) {
  const router = useRouter();

  return (
    <>
      <Link
        onClick={() => setOpenSidebar(false)}
        href={`/catalog/category/${page.url_key}`}
        className={`block w-full p-2 -m-2 font-medium  cta ${
          router.asPath === `/catalog/category/${page.url_key}`
            ? 'text-brand'
            : 'text-gray-900'
        }`}
      >
        <div className="cta max-w-fit">
          <span className="flex w-full text-base font-semibold leading-6 uppercase hover-underline-animation -tracking-wide">
            {page.title}
          </span>
        </div>
      </Link>
    </>
  );
}
