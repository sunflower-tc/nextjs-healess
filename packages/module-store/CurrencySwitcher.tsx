/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@apollo/client';

import { Listbox, Transition } from '@headlessui/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { motion, useAnimation } from 'framer-motion';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  CURRENCY_RATES,
  getLocalStorage,
  setLocalStorage,
} from '@store/local-storage';
import { setCurrentCurrency } from '@store/store';
import { isValidArray, isValidObject } from '@utils/Helper';
import { useRouter } from 'next/router';
import {
  Fragment,
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import AVAILABLE_CURRENCY from './graphql/CurrencyRates.graphql';
function CurrencySwitcher({ header = true }: { header?: boolean }) {
  const { data, loading } = useQuery(AVAILABLE_CURRENCY);
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const {
    available_currency_codes: currencyCodes = null,
    exchange_rates: currencyData = null,
  } = data?.currency || {};

  const dispatch = useAppDispatch();

  const selectedCurrency = useAppSelector(
    (state) => state.storeConfig?.currentCurrency
  );

  useEffect(() => {
    if (currencyData) {
      setLocalStorage(CURRENCY_RATES, currencyData);
    }
  }, [currencyData]);

  const manageCurrency = (currencyCode: string) => {
    if (!loading) {
      dispatch(
        setCurrentCurrency(
          currencyData?.find((item: any) => item?.currency_to === currencyCode)
        )
      );
    }
    router.replace({ pathname, query }, asPath);
  };
  const currencySelected = getLocalStorage('current_currency', true);

  const [code, setCode] = useState(currencySelected?.currency_to || 'USD');
  const handleChange = (event: any) => {
    !loading && manageCurrency(event.target.value);
    !loading && setCode(event.target.value);
  };
  const handleChangeList = (event: any) => {
    !loading && manageCurrency(event);
    !loading && setCode(event);
  };
  const price = 0;

  const itemOption =
    isValidArray(currencyCodes) &&
    currencyCodes.find((value: any) => {
      return value.code == code;
    });
  const animation = useAnimation();

  return (
    <>
      {header ? (
        <Listbox
          value={currencySelected?.currency_to || 'USD'}
          onChange={handleChangeList}
        >
          {({ open }) => (
            <div className="relative mt-1">
              <Listbox.Button className="relative px-0 text-[27px] font-light cursor-pointer flex justify-center items-center -mt-1 -mx-0.5 bg-transparent border-0">
                {loading ? (
                  <div className="rounded-full w-9 h-9 animate-pulse bg-gray-50" />
                ) : (
                  <span className="flex items-center truncate hover:text-brand">
                    {isValidObject(itemOption) && itemOption?.symbol}
                    <motion.div
                      className="relative py-0 lg:hidden max-h-4 "
                      initial={{ rotate: 0, marginTop: -7 }}
                      animate={{
                        rotate: open ? 180 : 0,
                        marginTop: open ? 10 : -7,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <KeyboardArrowDownIcon className="py-0 lg:text-white " />
                    </motion.div>
                  </span>
                )}
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
                <Listbox.Options className="absolute py-2 pl-0 mt-1 overflow-auto text-base list-none -translate-x-4 bg-white rounded-md shadow-xl -lg:-translate-y-64 w-36 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {currencyCodes?.map(
                    (
                      value: {
                        code:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | PromiseLikeOfReactNode
                          | null
                          | undefined;
                      },
                      index: Key | null | undefined
                    ) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-pointer select-none px-4 py-2 ${
                            active ? ' text-brand' : 'text-gray-900'
                          }`
                        }
                        value={value?.code}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected
                                  ? 'font-medium text-brand'
                                  : 'font-normal'
                              }`}
                            >
                              {value?.code}
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
        <Listbox
          value={currencySelected?.currency_to || 'USD'}
          onChange={handleChangeList}
        >
          {({ open }) => (
            <div className="relative mt-1">
              <Listbox.Button className="relative text-base border-solid leading-5 w-60 border-commonBorder rounded-md py-2.5 px-3.5 text-slate-700 capitalize tracking-wider font-medium cursor-pointer flex justify-start items-center border-2 -mt-1 -mx-0.5 bg-transparent">
                <div className="flex items-center justify-between w-full my-0 truncate">
                  {isValidObject(itemOption) &&
                    `Currency : ${itemOption?.code}`}
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
                <Listbox.Options className="absolute z-10 py-2 pl-0 mt-0.5 overflow-auto text-base list-none bg-white rounded-md shadow-xl w-60 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {currencyCodes?.map(
                    (
                      value: {
                        code:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | PromiseLikeOfReactNode
                          | null
                          | undefined;
                      },
                      index: Key | null | undefined
                    ) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-pointer hover:bg-brand/10 duration-150 mx-2 rounded-md select-none px-4 py-2 ${
                            active ? ' text-brand' : 'text-gray-900'
                          }`
                        }
                        value={value?.code}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block font-medium text-base truncate ${
                                selected ? 'text-brand' : 'text-slate-700'
                              }`}
                            >
                              {value?.code}
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
      )}
    </>
  );
}
export default CurrencySwitcher;
