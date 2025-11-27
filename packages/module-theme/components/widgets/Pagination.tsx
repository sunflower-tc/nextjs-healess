import { Listbox, Transition } from '@headlessui/react';
import { Trans } from '@lingui/macro';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { limiter } from '@utils/Constants';
import { isValidArray } from '@utils/Helper';
import { PaginationActionType } from '@voguish/module-catalog';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';

/**
 * Get Page Number Args
 */
interface GetPageNumbersArgs {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  pageNumbersToShow: number;
}

/**
 * Pagination Props
 */
interface PaginationProps {
  currentPage: number | undefined;
  pageSize: number | undefined;
  totalCount: number | undefined;
  loadingState?: boolean;
  pageNumbersToShow?: number | undefined;
  changeHandler: ({
    action, // eslint-disable-line
    payload, // eslint-disable-line
  }: {
    action: PaginationActionType;
    payload: number;
  }) => void;
}

/**
 * Get Page Numbers
 * @param GetPageNumbersArgs params
 * @returns
 */
const getPageNumbers = ({
  currentPage,
  pageSize,
  totalCount,
  pageNumbersToShow = 3,
}: GetPageNumbersArgs) => {
  const lastPageNumber = Math.ceil(totalCount / pageSize);
  const currentPageNumber =
    currentPage <= lastPageNumber ? currentPage : lastPageNumber;
  const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2);
  const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1;
  let startPage = 1;
  let endPage = lastPageNumber;

  if (lastPageNumber <= 1) {
    return []; // Don't show numbers if there's only 1 page
  }

  if (currentPageNumber <= maxPagesBeforeCurrentPage) {
    // near the start
    startPage = 1;
    endPage = pageNumbersToShow;
  } else if (currentPageNumber + maxPagesAfterCurrentPage >= lastPageNumber) {
    // near the end
    startPage = lastPageNumber - pageNumbersToShow + 1;
  } else {
    // somewhere in the middle
    startPage = currentPageNumber - maxPagesBeforeCurrentPage;
    endPage = currentPageNumber + maxPagesAfterCurrentPage;
  }
  let pageNumbers: (string | number)[] = Array.from(
    Array(endPage + 1 - startPage).keys()
  )
    .map((pageNumber) => startPage + pageNumber)
    .filter((pageNumber) => pageNumber <= lastPageNumber && pageNumber > 0);

  if (typeof pageNumbers[0] === 'number' && pageNumbers[0] > 1) {
    if (pageNumbers[0] <= 2) {
      pageNumbers = [1, ...pageNumbers];
    } else {
      const ellipsis: string | number = pageNumbers[0] > 3 ? '...' : 2;
      pageNumbers = [1, ellipsis, ...pageNumbers];
    }
  }

  if (pageNumbers[pageNumbers.length - 1] !== lastPageNumber) {
    if (pageNumbers[pageNumbers.length - 1] === lastPageNumber - 1) {
      pageNumbers = [...pageNumbers, lastPageNumber];
    } else {
      const ellipsis =
        parseInt(`${pageNumbers[pageNumbers.length - 1]}`) < lastPageNumber - 2
          ? '...'
          : lastPageNumber - 1;
      pageNumbers = [...pageNumbers, ellipsis, lastPageNumber];
    }
  }

  return pageNumbers;
};

/**
 * Pagination
 * @param PaginationProps props
 * @returns
 */
const Pagination = ({
  currentPage = 1,
  pageSize = 9,
  loadingState = false,
  totalCount = 1,
  pageNumbersToShow = 3,
  changeHandler,
}: PaginationProps) => {
  /**
   * Selected Option state
   */
  const [selectedOption, setSelectedOption] = useState<number>(pageSize);

  if (loadingState) {
    return <PaginationPlaceholder />;
  }

  if (currentPage && pageSize && totalCount) {
    const pageNumbers = getPageNumbers({
      currentPage,
      pageSize,
      totalCount,
      pageNumbersToShow,
    });

    /**
     * Limit Option selection handler
     * @param {SelectChangeEvent} event
     */
    const setLimitSelectionHandler = (event: any) => {
      let limit = event;
      if (limit !== selectedOption && limit) {
        if (typeof limit === 'string') {
          limit = parseInt(limit, 9);
        }
        setSelectedOption(limit);
        changeHandler({ action: PaginationActionType.LIMIT, payload: limit });
      }
    };
    if (totalCount <= 0) {
      return <></>;
    }

    return (
      <>
        {isValidArray(pageNumbers) && (
          <Grid className="grid items-center justify-center min-w-full mt-10 sm:flex sm:justify-between gap-y-8">
            <span className="flex gap-5">
              {pageNumbers.map((page, index) => (
                <button
                  className={`w-11 h-11 flex items-center cursor-pointer hover:shadow-md duration-300 justify-center text-bold text-lg rounded-full border border-solid border-secondary ${currentPage === page
                    ? 'bg-secondary text-white hover:bg-secondary/90'
                    : 'bg-white text-black hover:bg-secondary/10'
                    }`}
                  onClick={() => {
                    if (typeof page === 'number') {
                      changeHandler({
                        action: PaginationActionType.PAGE,
                        payload: page,
                      });
                    }
                  }}
                  key={index}
                >
                  {page}
                </button>
              ))}
            </span>
            {totalCount > pageSize && (
              <Listbox
                value={selectedOption}
                onChange={setLimitSelectionHandler}
              >
                {({ open }) => (
                  <div className="relative mt-1">
                    <Listbox.Button className="relative text-base border-solid leading-5 w-60 border-commonBorder rounded-md py-2.5 px-3.5 text-slate-700 capitalize tracking-wider font-medium cursor-pointer flex justify-start items-center border-2 -mt-1 -mx-0.5 bg-transparent">
                      <div className="flex w-full truncate cursor-pointer">
                        <div className="flex items-center justify-between w-full">
                          <span className="flex items-center w-4/5 line-clamp-1">
                            {selectedOption} <Trans>items per page</Trans>
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
                            <KeyboardArrowDownIcon className="py-0" />
                          </motion.div>
                        </div>
                      </div>
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
                      <Listbox.Options className="absolute w-full mt-1 overflow-auto text-base list-none p-4 flex flex-col gap-2 bg-white rounded-md shadow-xl translate-y-1 max-h-[12.3rem] ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {limiter
                          .filter((item) => item <= totalCount)
                          ?.map((limit) => (
                            <Listbox.Option
                              key={limit}
                              className={({ active }) =>
                                `relative cursor-pointer py-0 select-none ${active ? ' text-brand' : 'text-gray-900'
                                }`
                              }
                              value={limit}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block font-medium text-base truncate ${selected ? 'text-brand' : 'text-slate-700'
                                      }`}
                                  >
                                    <span className="flex items-center w-full">
                                      {limit} <Trans>items per page</Trans>
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
          </Grid>
        )}
      </>
    );
  }
  return <></>;
};

/**
 * Pagination Placeholder
 */
const PaginationPlaceholder = () => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      mt={6}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={56}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={56}
      />
    </Stack>
  );
};

export default Pagination;
