import { Listbox, Transition } from '@headlessui/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { isValidArray } from '@utils/Helper';

import {
  ProductListViewType,
  SortFields,
  ToolbarActionType,
  ToolbarProps,
} from '@voguish/module-catalog';
import CurrencySwitcher from '@voguish/module-store/CurrencySwitcher';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
const MoreVert = dynamic(() => import('@mui/icons-material/MoreVert'));
const Apps = dynamic(() => import('@mui/icons-material/Apps'));
export const createSortFields = (sortOptions: SortFields) => {
  let options: { value: string; label: string }[] = [];
  sortOptions.options.forEach((option) => {
    options = [
      ...options,
      {
        value: `${option.value}||ASC`,
        label: `${option.label} ${
          option.value === 'name' ? 'A to Z' : 'Low to High'
        }`,
      },
      {
        value: `${option.value}||DESC`,
        label: `${option.label} ${
          option.value === 'name' ? 'Z to A' : 'High to Low'
        }`,
      },
    ];
  });
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
  /**
   * Handle Toolbar Actions
   * @param event
   */
  const handleChange = (event: any) => {
    // setSortOption(event.target.value as string);
    manageToolbarAction({
      action: ToolbarActionType.SORT,
      payload: event as string,
    });
  };

  let sortFieldsWithValues: any | null = null;

  if (sortFields && typeof sortFields !== 'undefined') {
    sortFieldsWithValues = createSortFields(sortFields);
  }
  const render = sortFieldsWithValues.find(
    (item: { value: string; label: string }) => item?.value === sort
  ).label;
  return (
    <Stack flexDirection={{ md: 'row', xs: 'column' }} gap={2}>
      <CurrencySwitcher header={false} />

      {sortFieldsWithValues && isValidArray(sortFieldsWithValues) ? (
        <Listbox value={sort} onChange={handleChange}>
          {({ open }) => (
            <div className="relative mt-1">
              <Listbox.Button className="relative text-base border-solid leading-5 w-64 border-commonBorder rounded-md py-2.5 px-3.5 text-slate-700 capitalize tracking-wider font-medium cursor-pointer flex justify-start items-center border-2 -mt-1 -mx-0.5 bg-transparent">
                <div className="flex items-center justify-between w-full my-0 truncate">
                  <span className="w-11/12 truncate"> Sort By : {render}</span>
                  <ArrowDropDownIcon
                    className={`${
                      open ? 'fa-arrow-down-close' : 'fa-arrow-down'
                    }`}
                  />
                </div>
              </Listbox.Button>
              <Transition.Root
                as={Fragment}
                enterFrom="translate-y-0 opacity-0"
                enterTo="translate-y-2 opacity-100"
                enter="transition ease-in duration-300"
                leave="transition ease-in duration-300"
                leaveFrom="translate-y-2 opacity-100"
                leaveTo="translate-y-0 opacity-0"
              >
                <Listbox.Options className="absolute z-10 py-2 pl-0 mt-0.5 overflow-auto text-base list-none bg-white rounded-md shadow-xl w-64 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {sortFieldsWithValues?.map(
                    (option: { value: string; label: string }) => (
                      <Listbox.Option
                        key={option.value}
                        className={({ active }) =>
                          `relative cursor-pointer hover:bg-brand/10 duration-150 mx-2 rounded-md select-none px-4 py-2 ${
                            active ? ' text-brand' : 'text-gray-900'
                          }`
                        }
                        value={option.value}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block font-medium text-base truncate ${
                                selected ? 'text-brand' : 'text-slate-700'
                              }`}
                            >
                              {option.label}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    )
                  )}
                </Listbox.Options>
              </Transition.Root>
            </div>
          )}
        </Listbox>
      ) : (
        <></>
      )}
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
          backgroundColor: `${
            view === ProductListViewType.GRID ? 'rgba(0, 0, 0, 0.04)' : ''
          }`,
          borderColor: 'themeAdditional.borderColor',
        }}
      >
        <Apps />
      </IconButton>
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
          backgroundColor: `${
            view === ProductListViewType.LIST ? 'rgba(0, 0, 0, 0.04)' : ''
          }`,
          borderColor: 'themeAdditional.borderColor',
        }}
      >
        <MoreVert />
      </IconButton>
    </Stack>
  );
};

export default Toolbar;
