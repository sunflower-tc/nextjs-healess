import { Listbox, Transition } from '@headlessui/react';
import Apps from '@mui/icons-material/Apps';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVert from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {
  getCategoryFilterQuery,
  getShortValue,
  isValidArray,
} from '@utils/Helper';
import {
  ProductListViewType,
  SortFields,
  ToolbarActionType,
  ToolbarProps,
} from '@voguish/module-catalog/types';
import CurrencySwitcher from '@voguish/module-store/CurrencySwitcher';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { TwoGridIcon } from '@packages/module-theme/components/elements/Icon';
import { BRAND_HEX_CODE } from '@utils/Constants';
export const useCreateSortFields = (sortOptions: SortFields | undefined) => {
  const { t } = useTranslation('common');

  let options: { value: string; label: string }[] = [];
  if (sortOptions && typeof sortOptions !== 'undefined') {
    sortOptions.options.forEach((option) => {
      options = [
        ...options,
        {
          value: `${option.value}_asc`,
          label: `${option.label} ${
            option.value === 'name' ? t('A to Z') : t('Low to High')
          }`,
        },
        {
          value: `${option.value}_desc`,
          label: `${option.label} ${
            option.value === 'name' ? t('Z to A') : t('High to Low')
          }`,
        },
      ];
    });
  }
  return options;
};

/**
 * Toolbar
 * @param props
 * @returns
 */
const Toolbar = ({
  sortFields,
  sort,
  view,
  manageToolbarAction,
}: ToolbarProps) => {
  const router = useRouter();
  const {
    query: { urlKey: queries = [] },
  } = router;

  const sortIndex = queries.indexOf('sort');
  if (sortIndex !== -1 && Array.isArray(queries)) {
    const res = queries.filter((_, i) => i == sortIndex + 1);
    sort = res?.[0];
  }

  let sortFieldsWithValues: any | null = null;

  sortFieldsWithValues = useCreateSortFields(sortFields);

  const render =
    sortFieldsWithValues.find((item: { value: string; label: string }) =>
      !isValidArray(queries)
        ? item?.value === getShortValue(router?.asPath)
        : item?.value === sort
    )?.label || sortFields?.default;
  const handleChange = (event: any) => {
    manageToolbarAction({
      action: ToolbarActionType.SORT,
      payload: event as string,
    });
  };
  const { t } = useTranslation('common');

  return (
    <Stack flexDirection={{ md: 'row', xs: 'column' }} gap={2}>
      <ErrorBoundary>
        <CurrencySwitcher header={false} />
      </ErrorBoundary>

      {sortFieldsWithValues && isValidArray(sortFieldsWithValues) ? (
        <ErrorBoundary>
          <Listbox value={sort} onChange={handleChange}>
            {({ open }) => (
              <div className="relative mt-1">
                <ErrorBoundary>
                  <Listbox.Button className="relative -mx-0.5 -mt-1 flex w-64 cursor-pointer items-center justify-start rounded-md border-2 border-solid border-commonBorder bg-transparent px-3.5 py-2.5 text-base font-medium capitalize leading-5 tracking-wider text-slate-700">
                    <div className="flex items-center justify-between w-full my-0 truncate">
                      <span className="flex w-11/12 gap-1 truncate rtl:flex-row-reverse">
                        {' '}
                        <span>{t('Sort By')}</span> : <span>{render}</span>
                      </span>
                      <ArrowDropDownIcon
                        className={`${
                          open ? 'fa-arrow-down-close' : 'fa-arrow-down'
                        }`}
                      />
                    </div>
                  </Listbox.Button>
                </ErrorBoundary>
                <Transition.Root
                  as={Fragment}
                  enterFrom="translate-y-0 opacity-0"
                  enterTo="translate-y-2 opacity-100"
                  enter="transition ease-in duration-300"
                  leave="transition ease-in duration-300"
                  leaveFrom="translate-y-2 opacity-100"
                  leaveTo="translate-y-0 opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-0.5 max-h-60 w-64 list-none overflow-auto rounded-md bg-white py-2 pl-0 text-base shadow-xl ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {sortFieldsWithValues?.map(
                      (option: { value: string; label: string }) => (
                        <ErrorBoundary key={option.value}>
                          <Link
                            tabIndex={
                              queries.includes(option.value) ? -1 : undefined
                            }
                            className="no-underline"
                            href={getCategoryFilterQuery(
                              router,
                              'sort',
                              option.value
                            )}
                          >
                            <Listbox.Option
                              className={({ active }) =>
                                `relative cursor-pointer hover:bg-brand/10 duration-150 mx-2 rounded-md select-none px-4 py-2 ${
                                  active ? ' text-brand' : 'text-gray-900'
                                }`
                              }
                              value={option.value}
                            >
                              {({ selected }) => (
                                <ErrorBoundary>
                                  <span
                                    className={`block font-medium text-base truncate ${
                                      selected ? 'text-brand' : 'text-slate-700'
                                    }`}
                                  >
                                    {option.label}
                                  </span>
                                </ErrorBoundary>
                              )}
                            </Listbox.Option>
                          </Link>
                        </ErrorBoundary>
                      )
                    )}
                  </Listbox.Options>
                </Transition.Root>
              </div>
            )}
          </Listbox>
        </ErrorBoundary>
      ) : (
        <ErrorBoundary></ErrorBoundary>
      )}
      <ErrorBoundary>
        {' '}
        <IconButton
          className="-md:hidden"
          aria-label="ListView"
          onClick={() => {
            manageToolbarAction({
              action: ToolbarActionType.VIEW,
              payload: ProductListViewType.GRID,
            });
          }}
          sx={{
            borderRadius: '4px',
            paddingX: '10px',
            border: '1px solid',
            color: `${view === ProductListViewType.GRID ? '#fff' : '#c0c0c0'}`,
            backgroundColor: `${
              view === ProductListViewType.GRID ? BRAND_HEX_CODE : ''
            }`,
            borderColor: 'themeAdditional.borderColor',
          }}
        >
          <Apps />
        </IconButton>
      </ErrorBoundary>

      <ErrorBoundary>
        <IconButton
          className="-md:hidden"
          aria-label="GridView"
          onClick={() => {
            manageToolbarAction({
              action: ToolbarActionType.VIEW,
              payload: ProductListViewType.TWOGRID,
            });
          }}
          sx={{
            borderRadius: '4px',
            paddingX: '14px',
            border: '1px solid',
            color: `${
              view === ProductListViewType.TWOGRID ? '#fff' : '#c0c0c0'
            }`,
            backgroundColor: `${
              view === ProductListViewType.TWOGRID ? BRAND_HEX_CODE : ''
            }`,
            borderColor: 'themeAdditional.borderColor',
          }}
        >
          <TwoGridIcon />
        </IconButton>
      </ErrorBoundary>
      <ErrorBoundary>
        <IconButton
          className="-md:hidden"
          aria-label="GridView"
          onClick={() => {
            manageToolbarAction({
              action: ToolbarActionType.VIEW,
              payload: ProductListViewType.LIST,
            });
          }}
          sx={{
            borderRadius: '4px',
            paddingX: '10px',
            border: '1px solid',
            color: `${view === ProductListViewType.LIST ? '#fff' : '#c0c0c0'}`,
            backgroundColor: `${
              view === ProductListViewType.LIST ? BRAND_HEX_CODE : ''
            }`,
            borderColor: 'themeAdditional.borderColor',
          }}
        >
          <MoreVert />
        </IconButton>
      </ErrorBoundary>
    </Stack>
  );
};

export default Toolbar;
