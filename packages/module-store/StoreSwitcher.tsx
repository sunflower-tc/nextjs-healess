import { useQuery } from '@apollo/client';

import { Listbox, Transition } from '@headlessui/react';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '@store/hooks';
import { getLocalStorage } from '@store/local-storage';
import { setCurrentStore } from '@store/store';
import { getFlagEmoji } from '@utils/Helper';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import AVAILABLE_STORES from './graphql/AvailableStore.graphql';
import { StoreConfigInterface, StoreConfigQueryResult } from './types';

export default function StoreSwitcher() {
  const { data: stores, loading } =
    useQuery<StoreConfigQueryResult>(AVAILABLE_STORES);
  const storeSelected = getLocalStorage('current_store');
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [code, setCode] = useState(storeSelected?.locale || 'en_US');
  const manageStore = (storeCode: string) => {
    if (!loading) {
      dispatch(
        setCurrentStore(
          stores?.availableStores?.find(
            (item: StoreConfigInterface) =>
              item?.locale === storeCode.split('_')[0]
          )
        )
      );

      router.replace({ pathname, query }, asPath, {
        locale:
          storeCode === 'default' ? 'en' : storeCode.split('_')[0] || 'en',
      });
    }
  };
  useEffect(() => {
    manageStore(code);
    storeSelected;
  }, [code, storeSelected]);

  const handleChangeList = (event: SelectChangeEvent) => {
    !loading && setCode(event as unknown as string);
  };
  return (
    <>
      {loading ? (
        <div className="h-3 animate-pulse bg-slate-500" />
      ) : (
        <Listbox value={code} onChange={handleChangeList}>
          {({ open }) => (
            <div className="relative mt-1">
              <Listbox.Button className="relative px-0 text-[27px] font-light cursor-pointer flex justify-center items-center -mt-1 -mx-0.5 bg-transparent border-0">
                {loading ? (
                  <div className="h-6 w-14 animate-pulse bg-gray-50" />
                ) : (
                  <div className="block truncate cursor-pointer">
                    {stores?.availableStores?.map(
                      (store: any, index: number) =>
                        store?.locale === code && (
                          <div
                            className="flex items-center justify-between"
                            key={store?.store_code + index}
                          >
                            <span className="text-xl flex hover:border-brand duration-300 items-center px-1.5">
                              <span className="px-1 border border-solid rounded-md lg:border-white">
                                {getFlagEmoji(
                                  store?.store_code === 'default'
                                    ? 'usa'
                                    : store?.store_code
                                )}
                              </span>
                              <span className="px-2 text-sm font-normal text-white -lg:hidden">
                                {store?.store_code === 'default'
                                  ? 'English (USA)'
                                  : store?.store_name}
                              </span>
                            </span>
                            <motion.div
                              className="relative py-0 max-h-4 "
                              initial={{ rotate: 0, marginTop: -7 }}
                              animate={{
                                rotate: open ? 180 : 0,
                                marginTop: open ? 10 : -7,
                              }}
                              transition={{ duration: 0.4 }}
                            >
                              <KeyboardArrowDownIcon className="py-0 lg:text-white " />
                            </motion.div>
                          </div>
                        )
                    )}
                  </div>
                )}
              </Listbox.Button>
              <Transition
                as={Fragment}
                enterFrom="opacity-0"
                enterTo="opacity-100"
                enter="transition ease-in duration-200"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute  lg:w-[13rem] mt-1 overflow-auto text-base list-none p-4 flex flex-col gap-2 translate-x-1.5 bg-white rounded-md shadow-xl -translate-y-[14.3rem] max-h-[12.3rem] ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {stores?.availableStores?.map((store: any) => (
                    <Listbox.Option
                      key={store?.store_code}
                      className={({ active }) =>
                        `relative cursor-pointer py-0 select-none ${
                          active ? ' text-brand' : 'text-gray-900'
                        }`
                      }
                      value={store?.locale}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`text-sm cursor-pointer flex items-center gap-2 truncate ${
                              selected ? 'text-brand' : 'font-normal'
                            }`}
                          >
                            <span className="py-0 text-2xl">
                              {getFlagEmoji(store?.store_code)}
                            </span>
                            <span className="flex items-center w-full">
                              <span className="-lg:hidden">
                                {store?.store_code === 'default'
                                  ? 'English (USA)'
                                  : store?.store_name}
                              </span>
                              {selected && (
                                <CheckIcon className="ml-6 text-brand" />
                              )}
                            </span>
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      )}
    </>
  );
}
