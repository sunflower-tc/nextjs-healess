import { useQuery } from '@apollo/client';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InputField from '@packages/module-theme/components/ui/Form/Elements/Input';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import SIMPLE_PRODUCT_QUERY from '@voguish/module-catalog/graphql/SimpleProduct.graphql';
import { ProductItemInterface } from '@voguish/module-catalog/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { Fragment, useEffect, useState } from 'react';
import FileCustomOption from './FileCustomOption';

export default function SimpleProductOption({
  customValue,
  sku,
  customOptions,
}: {
  sku: string;
  customValue: (optionId: number, valueString: string) => void;
  customOptions: {
    id: number;
    value_string: string;
  }[];
}) {
  const { data: simpleData, loading } = useQuery<{
    products: { items: ProductItemInterface[] };
  }>(SIMPLE_PRODUCT_QUERY, {
    variables: { filters: { sku: { eq: sku } } },
  });

  const [selected, setSelected] = useState('');
  const [selectedMultiple, setSelectedMutliple] = useState<string[]>([]);

  const handleCustomValue = (
    optionId: number,
    optionTypeId: string,
    isCheckbox: boolean = false
  ) => {
    const existingOption = customOptions.find((opt) => opt.id === optionId);
    if (isCheckbox) {
      let updatedValueString = existingOption?.value_string
        ? existingOption.value_string.split(',')
        : [];

      if (!updatedValueString.includes(optionTypeId)) {
        updatedValueString.push(optionTypeId);
      } else {
        updatedValueString = updatedValueString.filter(
          (id) => id !== optionTypeId
        );
      }
      customValue(optionId, updatedValueString.join(','));
    } else {
      setSelected(optionTypeId);
      customValue(optionId, optionTypeId);
    }
  };
  useEffect(() => {
    setSelected('');
    setSelectedMutliple([]);
  }, [sku]);
  useEffect(() => {
    if (isValidArray(selectedMultiple)) {
      customValue(
        parseInt(selectedMultiple?.[0]?.split('||||')?.[0]),
        selectedMultiple?.map((item) => item?.split('||||')?.[1]).join(',')
      );
    }
  }, [selectedMultiple]);
  useEffect(() => {
    if (isValidArray(selected?.split('||||'))) {
      customValue(
        parseInt(selected?.[0]?.split('||||')?.[0]),
        selected?.split('||||')?.[1]
      );
    }
  }, [selected]);

  return (
    <ErrorBoundary>
      {simpleData?.products?.items?.[0]?.options?.map((item) => {
        if (item?.__typename === 'CustomizableRadioOption') {
          return (
            <div className="grid gap-2 py-4" key={item?.sort_order}>
              {loading ? (
                <div className="w-10 h-1 rounded-md animate-pulse bg-neutral-200" />
              ) : (
                <p className="flex flex-wrap items-end max-w-xs px-1 text-base font-semibold">
                  {item?.title}
                  {item?.required && (
                    <span className="px-1 pb-1 text-xs text-gray-400">
                      (Required)
                    </span>
                  )}
                </p>
              )}
              <ul className="grid w-full gap-6 my-0 list-none -mx-9 md:grid-cols-2">
                {item.value.map((option) =>
                  loading ? (
                    <div
                      key={option?.sort_order}
                      className="h-24 rounded-md animate-pulse bg-neutral-200"
                    />
                  ) : (
                    <ErrorBoundary key={option?.sort_order}>
                      <li>
                        <input
                          onChange={() => {
                            handleCustomValue(
                              item?.option_id,
                              `${option?.option_type_id}`
                            );
                          }}
                          type="radio"
                          id={option.title}
                          name="hosting"
                          value={option.option_type_id}
                          className="hidden peer"
                          checked={selected == `${option.option_type_id}`}
                          required
                        />

                        <label
                          htmlFor={option.title}
                          className={`inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-200 border-solid rounded-lg cursor-pointer bg-commonBorder peer-checked:bg-white peer-checked:border-secondary peer-checked:text-black hover:text-gray-600 hover:bg-gray-100 ${selected === `${option?.title}` ? 'peer-checked:text-black text-gray-600 bg-gray-100' : ''}`}
                        >
                          <div className="block">
                            <div className="w-full text-base font-semibold">
                              {getFormattedPrice(option?.price, '')}
                            </div>
                            <div className="w-full">{option.title}</div>
                          </div>
                        </label>
                      </li>
                    </ErrorBoundary>
                  )
                )}
              </ul>
            </div>
          );
        } else if (item?.__typename === 'CustomizableDropDownOption') {
          return (
            <div
              className="relative grid gap-2 py-4 md:max-w-sm"
              key={item?.sort_order}
            >
              {loading ? (
                <div className="w-10 h-1 rounded-md animate-pulse bg-neutral-200" />
              ) : (
                <p className="flex flex-wrap items-end px-1 text-base font-semibold">
                  {item?.title}{' '}
                  {item?.required && (
                    <span className="px-1 pb-1 text-xs text-gray-400">
                      (Required)
                    </span>
                  )}
                </p>
              )}
              {loading ? (
                <div className="w-full rounded-md h-14 animate-pulse bg-neutral-200" />
              ) : (
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <ErrorBoundary>
                      <ErrorBoundary>
                        <ListboxButton className="relative flex items-center justify-between w-full px-3 py-3 mx-1 text-sm text-left bg-white border-0 rounded-lg shadow cursor-pointer outline outline-2 outline-commonBorder focus:outline-none focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-checkoutBorder focus-visible:ring-offset-2 focus-visible:ring-offset-secondary">
                          <span>
                            {selected !== ''
                              ? item?.value?.find(
                                  (opt) =>
                                    selected?.split('||||')?.[1] ===
                                    `${opt?.option_type_id}`
                                )?.title
                              : item?.title}
                          </span>
                          <KeyboardArrowDownIcon
                            className={`${
                              !open ? 'fa-arrow-down-close' : 'fa-arrow-down'
                            }`}
                          />
                        </ListboxButton>
                      </ErrorBoundary>
                      <Transition
                        as={Fragment}
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        enter="transition ease-in duration-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ListboxOptions className="absolute z-10 w-full gap-1 px-2 py-4 mx-1 mt-1 overflow-auto text-base list-none bg-white rounded-md shadow-lg top-28 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {item?.value?.map((option) => (
                            <ErrorBoundary key={option?.sort_order}>
                              <ListboxOption
                                className={({ active }) =>
                                  `relative flex-1  cursor-pointer md:flex-none rounded-sm duration-200 select-none py-2 pl-4 pr-4 ${
                                    active
                                      ? 'bg-brand/10 text-brand'
                                      : 'text-gray-900'
                                  }`
                                }
                                value={`${item?.option_id}||||${option?.option_type_id}`}
                              >
                                {option?.title}
                              </ListboxOption>
                            </ErrorBoundary>
                          ))}
                        </ListboxOptions>
                      </Transition>
                    </ErrorBoundary>
                  )}
                </Listbox>
              )}
            </div>
          );
        } else if (item?.__typename === 'CustomizableCheckboxOption') {
          return (
            <div className="grid gap-2 py-4" key={item?.sort_order}>
              {loading ? (
                <div className="w-10 h-1 rounded-md animate-pulse bg-neutral-200" />
              ) : (
                <p className="flex flex-wrap items-end max-w-xs px-1 text-base font-semibold">
                  {item?.title}
                  {item?.required && (
                    <span className="px-1 pb-1 text-xs text-gray-400">
                      (Required)
                    </span>
                  )}
                </p>
              )}
              <ul className="grid w-full gap-6 my-0 list-none -mx-9 md:grid-cols-2">
                {item.value.map((option) =>
                  loading ? (
                    <div
                      key={option?.sort_order}
                      className="h-24 rounded-md animate-pulse bg-neutral-200"
                    />
                  ) : (
                    <ErrorBoundary key={option?.sort_order}>
                      <li>
                        <input
                          onChange={(e) =>
                            handleCustomValue(
                              item?.option_id,
                              `${option?.option_type_id}`,
                              true
                            )
                          }
                          type="checkbox"
                          id={`${item?.option_id}-${option?.option_type_id}`}
                          name={`option-${item?.option_id}`}
                          // value={option.option_type_id}
                          className="hidden peer"
                          defaultChecked={customOptions
                            ?.find((opt) => opt.id === item.option_id)
                            ?.value_string.split(',')
                            .includes(`${option?.option_type_id}`)}
                        />
                        <label
                          htmlFor={`${item?.option_id}-${option?.option_type_id}`}
                          className="inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-200 border-solid rounded-lg cursor-pointer bg-commonBorder peer-checked:bg-white peer-checked:border-secondary peer-checked:text-black hover:text-gray-600 hover:bg-gray-100"
                        >
                          <div className="block">
                            <div className="w-full text-base font-semibold">
                              {getFormattedPrice(option?.price, '')}
                            </div>
                            <div className="w-full">{option.title}</div>
                          </div>
                        </label>
                      </li>
                    </ErrorBoundary>
                  )
                )}
              </ul>
            </div>
          );
        } else if (item?.__typename === 'CustomizableMultipleOption') {
          return (
            <div
              className="relative grid gap-2 py-4 md:max-w-sm"
              key={item?.sort_order}
            >
              {loading ? (
                <div className="w-10 h-1 rounded-md animate-pulse bg-neutral-200" />
              ) : (
                <p className="flex flex-wrap items-end px-1 text-base font-semibold">
                  {item?.title}{' '}
                  {item?.required && (
                    <span className="px-1 pb-1 text-xs text-gray-400">
                      (Required)
                    </span>
                  )}
                </p>
              )}
              {loading ? (
                <div className="w-full rounded-md h-14 animate-pulse bg-neutral-200" />
              ) : (
                <Listbox
                  value={selectedMultiple}
                  onChange={setSelectedMutliple}
                  multiple
                >
                  {({ open }) => (
                    <ErrorBoundary>
                      <ErrorBoundary>
                        <ListboxButton className="relative flex items-center justify-between w-full px-3 py-3 mx-1 text-sm text-left bg-white border-0 rounded-lg shadow cursor-pointer outline outline-2 outline-commonBorder focus:outline-none focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-checkoutBorder focus-visible:ring-offset-2 focus-visible:ring-offset-secondary">
                          <span className="flex max-w-xs gap-2 overflow-x-auto hiddenScrollBar">
                            {isValidArray(selectedMultiple)
                              ? selectedMultiple?.map((opt: string) => (
                                  <span
                                    className="p-1 text-sm rounded-full whitespace-nowrap bg-brand/10"
                                    key={opt}
                                  >
                                    {
                                      item?.value?.find(
                                        (option) =>
                                          opt?.split('||||')?.[1] ==
                                          `${option?.option_type_id}`
                                      )?.title
                                    }
                                  </span>
                                ))
                              : item?.title}
                          </span>
                          <KeyboardArrowDownIcon
                            className={`${
                              !open ? 'fa-arrow-down-close' : 'fa-arrow-down'
                            }`}
                          />
                        </ListboxButton>
                      </ErrorBoundary>
                      <Transition
                        as={Fragment}
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        enter="transition ease-in duration-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ListboxOptions className="absolute z-10 w-full gap-1 px-2 py-4 mx-1 mt-1 overflow-auto text-base list-none bg-white rounded-md shadow-lg top-28 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {item?.value?.map((option) => (
                            <ErrorBoundary key={option?.sort_order}>
                              <ListboxOption
                                className={({ active }) =>
                                  `relative flex-1  cursor-pointer md:flex-none rounded-sm duration-200 select-none py-2 pl-4 pr-4 ${
                                    active
                                      ? 'bg-brand/10 text-brand'
                                      : 'text-gray-900'
                                  }`
                                }
                                value={`${item?.option_id}||||${option?.option_type_id}`}
                              >
                                {option?.title}
                              </ListboxOption>
                            </ErrorBoundary>
                          ))}
                        </ListboxOptions>
                      </Transition>
                    </ErrorBoundary>
                  )}
                </Listbox>
              )}
            </div>
          );
        } else if (item?.__typename === 'CustomizableFileOption') {
          return (
            <FileCustomOption
              item={item}
              key={item?.sort_order}
              loading={loading}
              customValue={customValue}
            />
          );
        } else if (item?.__typename === 'CustomizableFieldOption') {
          return (
            <div
              className="relative grid gap-1 py-4 md:max-w-sm"
              key={item?.sort_order}
            >
              {loading ? (
                <div className="w-10 h-1 rounded-md animate-pulse bg-neutral-200" />
              ) : (
                <p className="flex flex-wrap items-end px-1 text-base font-semibold">
                  {item?.title}{' '}
                  {item?.required && (
                    <span className="px-1 pb-1 text-xs text-gray-400">
                      (Required)
                    </span>
                  )}
                </p>
              )}
              {loading ? (
                <div className="w-full rounded-md h-14 animate-pulse bg-neutral-200" />
              ) : (
                <InputField
                  onChange={(e: { target: { value: string } }) =>
                    customValue(item?.option_id, e.target.value)
                  }
                  className="mx-1"
                  FormHelperTextProps={{
                    className: 'text-gray-600 !text-[10px] !absolute -bottom-1',
                  }}
                  helperText={`Max Allowed Chars. ${item?.inputValue?.max_characters || 60}`}
                  inputProps={{
                    maxLength: item?.inputValue?.max_characters || 60,
                  }}
                  type="text"
                />
              )}
            </div>
          );
        } else if (item?.__typename === 'CustomizableAreaOption') {
          return (
            <div
              className="relative grid gap-1 py-4 md:max-w-sm"
              key={item?.sort_order}
            >
              {loading ? (
                <div className="w-10 h-1 rounded-md animate-pulse bg-neutral-200" />
              ) : (
                <p className="flex flex-wrap items-end px-1 text-base font-semibold">
                  {item?.title}{' '}
                  {item?.required && (
                    <span className="px-1 pb-1 text-xs text-gray-400">
                      (Required)
                    </span>
                  )}
                </p>
              )}
              {loading ? (
                <div className="w-full rounded-md h-14 animate-pulse bg-neutral-200" />
              ) : (
                <textarea
                  className="outline-1 outline rounded mx-1 w-full p-2.5 focus:outline-2 focus:outline focus:outline-brand border-0 appearance-none outline-colorBorder"
                  onChange={(e: { target: { value: string } }) =>
                    customValue(item?.option_id, e.target.value)
                  }
                />
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </ErrorBoundary>
  );
}
export type UploadFileResponseType = {
  lastModified?: string;
  name?: string;
  status?: 1 | 0;
  url?: string;
  file_url?: string;
  extension?: string;
  fileName?: string;
  mediaUrl?: string;
  size?: number;
  type?: string;
};
