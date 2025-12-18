import Thumbnail from '@voguish/module-catalog/Components/Product/Item/Thumbnail';
import { CategoryItem } from '@voguish/module-catalog/types';
import Link from 'next/link';
import ErrorBoundary from '../ErrorBoundary';
import { useTranslation } from 'next-i18next';

export default function CategoryList({ category }: { category: CategoryItem }) {
  const { t } = useTranslation('common');
  return (
    <ErrorBoundary>
      <div className="lg:mt-6 lg:col-span-3 mt-4 sm:mt-6">
        <div className="border-solid lg:divide-x-0 border divide-y rounded-md border-commonBorder divide-commonBorder lg:divide-solid">
          <div className="flex-col w-full gap-4 pt-3 px-6">
            <p className="text-xl font-semibold">
              {t('Shop By')} {t('Categories')}
            </p>
            <p className="text-base hidden font-medium">{t('Categories')}</p>
          </div>
          <ul
            className="
              list-none !pl-0  w-full max-w-[99vw] mb-0 divide-x-0 divide-y gap-x-6
              overflow-x-auto overflow-hidden divide-commonBorder divide-solid
              flex items-center flex-col   rtl:!pr-0
              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
            "
            aria-label="Category List"
          >
            {category?.children?.map((item) => (
              <li
                key={item?.url_key}
                className="w-full pt-3 px-6 h-fit py-4 flex-shrink-0 flex-shrink-auto"
              >
                <ErrorBoundary>
                  <Link
                    className="w-full my-auto appearance-none h-fit"
                    href={item?.url_key || ''}
                  >
                    <div className="flex  w-full max-w-[80%] h-fit gap-4 items-center lg:flex-row">
                      <div className="relative flex-shrink-0 w-8 h-8">
                        <Thumbnail
                          className="rounded-full"
                          thumbnail={item?.image}
                          alt={item?.name}
                          fill
                        />
                      </div>
                      <div className="flex flex-wrap items-center justify-between min-w-full gap-x-6 gap-y-1 max-h-fit w-fit lg:gap-4">
                        <p className="text-lg font-medium text-gray-900 whitespace-nowrap truncate max-w-[150px] lg:max-w-none">
                          {item?.name}
                        </p>
                        <div className="inline-flex items-center text-sm font-semibold text-gray-900">
                          {item?.product_count}
                        </div>
                      </div>
                    </div>{' '}
                  </Link>
                </ErrorBoundary>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ErrorBoundary>
  );
}
