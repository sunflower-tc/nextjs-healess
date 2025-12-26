import { Popover, Transition } from '@headlessui/react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { classNames, isValidArray, isValidObject } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { FormattedMenuItem } from './Megamenu/types';

type Props = {
  sortedMenu: Record<string, FormattedMenuItem>;
};

type Category = {
  title: string;
  url_key: string;
  image_url: string;
  children?: Record<string, FormattedMenuItem>;
};

export default function PopOver({ sortedMenu }: Props) {
  const router = useRouter();
  const categories: Category[] = isValidObject(sortedMenu)
    ? Object.values(Object.values(sortedMenu)?.[0]?.children)
    : [];
  return (
    <ErrorBoundary>
      <Popover.Group
        aria-label="menu"
        className="hidden lg:ml-4 lg:block lg:self-stretch z-[999]"
      >
        <div
          aria-label="menu-panel"
          className="flex flex-row-reverse items-center h-full space-x-8 group"
        >
          {isValidArray(categories) &&
            categories.map((category) =>
              isValidObject(category?.children) ? (
                <Popover
                  key={category.title}
                  aria-label={category?.title}
                  className="flex first:pl-7"
                >
                  {({ open }) => (
                    <ErrorBoundary>
                      <span className="cta">
                        <div
                          aria-label={category?.title}
                          className="relative flex items-center justify-center hover-underline-animation"
                        >
                          <Link
                            href={`/catalog/category/${category?.url_key}`}
                            className={`relative z-10 font-semibold bg-white flex items-center transition-colors ease-out duration-200 text-[1rem] cursor-pointer -mb-px pt-px ${
                              router.asPath ===
                                `/catalog/category/${category?.url_key}` &&
                              ' text-brand'
                            }`}
                          >
                            {category?.title}
                          </Link>
                          <Popover.Button
                            className={classNames(
                              open
                                ? ' text-brand border-transparent fa-arrow-down'
                                : 'border-transparent text-gray-700 hover:text-gray-800 fa-arrow-down-close',
                              'flex items-center bg-transparent text-[1rem] cursor-pointer '
                            )}
                          >
                            <KeyboardArrowDown
                              aria-label={category?.title}
                              aria-hidden={false}
                            />
                          </Popover.Button>
                        </div>
                      </span>
                      <Transition
                        as={Fragment}
                        enter="transition ease-in duration-300"
                        enterFrom="-translate-y-[20%] opacity-0"
                        enterTo="translate-y-0 opacity-100"
                        leave="transition ease-out duration-300"
                        leaveFrom="translate-y-0 opacity-100"
                        leaveTo="-translate-y-[20%] opacity-0"
                      >
                        <Popover.Panel className="absolute inset-x-0 z-10 text-sm text-gray-500 shadow-xl top-full">
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            className="absolute inset-0 bg-white shadow top-1/2"
                            aria-hidden="true"
                          />

                          <div className="relative py-5 bg-white">
                            <div className="px-8 mx-auto max-w-7xl">
                              <div className="grid grid-cols-2 py-8 group gap-y-10">
                                <div className="grid grid-cols-2">
                                  {isValidObject(category?.children) &&
                                    Object.values(
                                      Object.values(category?.children || {})
                                    ).map((section) => (
                                      <div key={section?.title}>
                                        <span className="cta group-first:ml-4">
                                          <Link
                                            href={`/catalog/category/${section?.url_key}`}
                                            id={`${section?.title}-heading`}
                                            className={`font-bold text-[1rem] hover-underline-animation ${
                                              router.asPath ===
                                              `/catalog/category/${section?.url_key}`
                                                ? 'text-brand'
                                                : ' text-gray-900 '
                                            }`}
                                          >
                                            {section?.title}
                                          </Link>
                                        </span>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.title}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {isValidArray(
                                            Object.values(
                                              Object.values(
                                                section?.children
                                              ) || {}
                                            )
                                          ) &&
                                            Object.values(
                                              Object.values(section?.children)
                                            ).map((item) => (
                                              <li
                                                key={item?.title}
                                                className="flex mt-8 -ml-[1.9rem] cta"
                                              >
                                                <Link
                                                  href={`/catalog/category/${item.url_key}`}
                                                  className={`hover:text-gray-800 text-[0.9rem] font-medium hover-underline-animation ${
                                                    router.asPath ===
                                                      `/catalog/category/${item?.url_key}` &&
                                                    ' text-brand'
                                                  }`}
                                                >
                                                  {item?.title}
                                                </Link>
                                              </li>
                                            ))}
                                        </ul>
                                      </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2">
                                  {category.image_url !== '' && (
                                    <div className="grid">
                                      <Link
                                        href={`/catalog/category/${category?.url_key}`}
                                      >
                                        <Image
                                          decoding="auto"
                                          className="object-cover object-top rounded-md"
                                          alt={category?.title}
                                          height={200}
                                          width={200}
                                          src={category.image_url}
                                        />
                                      </Link>
                                      <span className="mt-4 -ml-0.5 cta">
                                        <Link
                                          href={`/catalog/category/${category?.url_key}`}
                                          id={`${category?.title}-heading`}
                                          className={`font-bold text-gray-900 text-[1rem] hover-underline-animation ${
                                            router.asPath ===
                                              `/catalog/category/${category?.url_key}` &&
                                            ' text-brand'
                                          }`}
                                        >
                                          {category?.title}
                                        </Link>
                                      </span>
                                    </div>
                                  )}
                                  {isValidObject(category?.children) &&
                                    Object.values(
                                      Object.values(category?.children || {})
                                    ).map(
                                      (section) =>
                                        section.image_url !== '' && (
                                          <div
                                            className="grid"
                                            key={section?.title}
                                          >
                                            <Link
                                              href={`/catalog/category/${section?.url_key}`}
                                            >
                                              <Image
                                                decoding="auto"
                                                className="object-cover object-top rounded-md"
                                                alt={section?.title}
                                                height={200}
                                                width={200}
                                                src={section.image_url || ''}
                                              />
                                            </Link>
                                            <span className="mt-4 -ml-0.5 cta">
                                              <Link
                                                href={`/catalog/category/${section?.url_key}`}
                                                id={`${section?.title}-heading`}
                                                className={`font-bold text-gray-900 text-[1rem] hover-underline-animation ${
                                                  router.asPath ===
                                                    `/catalog/category/${section?.url_key}` &&
                                                  ' text-brand'
                                                }`}
                                              >
                                                {section?.title}
                                              </Link>
                                            </span>
                                          </div>
                                        )
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </ErrorBoundary>
                  )}
                </Popover>
              ) : (
                <Link
                  aria-label={category?.title}
                  key={category?.title}
                  href={`/catalog/category/${category?.url_key}`}
                  className={`flex items-center cta font-semibold text-gray-700 text-[1rem] hover:text-gray-800 ${
                    router.asPath ===
                      `/catalog/category/${category?.url_key}` && ' text-brand'
                  } `}
                >
                  <span className="px-2 hover-underline-animation">
                    {category?.title}
                  </span>
                </Link>
              )
            )}
        </div>
      </Popover.Group>
    </ErrorBoundary>
  );
}
