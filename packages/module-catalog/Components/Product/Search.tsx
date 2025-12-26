import Typography from '@mui/material/Typography';
import Style from '@styles/BackButton.module.css';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
  EmptyPageIcon,
  SearchPage,
} from '@packages/module-theme/components/elements/Icon';
import { getLocalStorage, setLocalStorage } from '@store/local-storage';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import { useSearchProductsQuery } from '@voguish/module-catalog/hooks/useProductsQuery';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Thumbnail from './Item/Thumbnail';
const Search = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const storedValue = getLocalStorage('search-value');
  const [searchField, setSearchField] = useState<string>(storedValue || '');
  const [debouncedSearch, setDebouncedSearch] = useState<string>(searchField);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchField);
      setLocalStorage('search-value', searchField);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchField]);

  const { data, loading } = useSearchProductsQuery({
    search: debouncedSearch,
    pageSize: 4,
  });
  const products = data?.products?.items ?? [];
  const methods = useForm<AddProductsToCartInput>();
  const { handleSubmit } = methods;

  const arr = new Array(4).fill(0);

  const handleChange = (e: any) => {
    e.stopPropagation();
    setSearchField(e.target.value);
  };

  const submitForm = () => {
    router.push(`/catalogsearch/results/searchField/${searchField}`);
  };
  return (
    <div className="flex flex-col items-center justify-center max-w-xl gap-4 px-4 pb-20 mx-auto mt-8 lg:mt-10 md:mt-10">
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center justify-between">
          <h1 className="my-0 text-xl font-bold leading-6 text-[#222529] md:text-2xl">
            {t('Search')}
          </h1>
          <div
            onClick={() => router.back()}
            className={`cursor-pointer flex gap-1  items-center ${Style.back_button}`}
          >
            <div className="grid">
              <KeyboardArrowLeftIcon className="m-auto" />
            </div>
            <div className="font-semibold uppercase">{t('Go back')} </div>
          </div>
        </div>
        <ErrorBoundary>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-nowrap"
          >
            <input
              className="relative flex-shrink-0 w-full px-5 py-3 text-base font-semibold leading-3 text-black border-none rounded border-searchBorderColor bg-testimonialBg outline outline-1 outline-brand placeholder:text-secondary"
              type="search"
              placeholder={t('Search')}
              name="searchField"
              value={searchField}
              autoFocus
              onChange={handleChange}
              required
            />
            <div
              aria-label="search"
              className={`relative cursor-pointer ltr:right-10 rtl:left-10 flex items-center ${
                searchField !== '' ? 'invisible' : ''
              }`}
            >
              <SearchPage />
            </div>
          </form>
        </ErrorBoundary>
      </div>
      <div className="grid w-full gap-2 pt-6">
        <h2 className="my-0 text-base font-semibold leading-5 text-black md:text-lg">
          {t('Products')}
        </h2>
        <section className="grid w-full gap-6">
          {!loading ? (
            isValidArray(products) ? (
              products?.map((item: any, index: number) => (
                <Link
                  className="no-underline"
                  key={item?.uid + `${index}`}
                  href={`/catalog/product/${item?.url_key}`}
                >
                  <ErrorBoundary>
                    <figure className="flex items-center w-full gap-6 m-0">
                      <div className="relative w-20 h-20 overflow-hidden border border-solid rounded-md lg:w-32 lg:h-32 md:w-32 md:h-32 border-commonBorder shrink-0">
                        <Thumbnail
                          className="object-cover"
                          thumbnail={item?.thumbnail?.url}
                          fill
                          alt="Product"
                        />
                      </div>
                      <figcaption className="grid h-full gap-1">
                        <h2 className="m-0 text-lg font-normal leading-6 text-black">
                          {item?.thumbnail?.label}
                        </h2>

                        <p className="mt-auto text-lg font-normal leading-6 text-black">
                          {getFormattedPrice(
                            item?.price_range?.minimum_price?.final_price
                              ?.value,
                            item?.price_range?.minimum_price?.final_price
                              ?.currency
                          )}
                        </p>
                      </figcaption>
                    </figure>
                  </ErrorBoundary>
                </Link>
              ))
            ) : (
              <ErrorBoundary>
                <div className="h-full gap-4 py-10 mx-auto text-center">
                  <EmptyPageIcon />
                  <span className="grid py-6">
                    <Typography variant="ErrorHeading" className="-xs:text-lg">
                      {t('Oops! There are no products')}
                    </Typography>
                    <Typography
                      variant="ErrorSubHeading"
                      className="-xs:text-base"
                    >
                      {t('Please search any-other thing.')}
                    </Typography>
                  </span>
                </div>
              </ErrorBoundary>
            )
          ) : (
            arr.map((index, item) => (
              <div key={index + item} className="grid gap-5">
                <div className="flex gap-6">
                  <div className="w-32 h-24 rounded-md animate-pulse bg-neutral-300" />
                  <div className="flex flex-col justify-center w-full gap-2">
                    <div className="w-full h-2 rounded-md animate-pulse bg-neutral-300" />
                    <div className="w-1/2 h-2 rounded-md animate-pulse bg-neutral-300" />
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Search;
