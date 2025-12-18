import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useState } from 'react';
/**
 * Get Page Number Args
 */
export type SelectChangeEvent<Value = string> =
  | (Event & { target: { value: Value; name: string } })
  | ChangeEvent<HTMLInputElement>;
interface GetPageNumbersArgs {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

/**
 * Pagination Props
 */
interface PaginationProps {
  currentPage: number | undefined;
  pageSize: number | undefined;
  totalCount: number | undefined;
  loadingState?: boolean;

  changeHandler: ({ payload }: { payload: number }) => void;
}

/**
 * Get Page Numbers
 * @param GetPageNumbersArgs params
 * @returns
 */
const getPageNumbers = ({ pageSize, totalCount }: GetPageNumbersArgs) => {
  let element = [];
  const lastPageNumber = Math.ceil(totalCount / pageSize);
  if (lastPageNumber <= 0) {
    return [];
  }
  if (lastPageNumber >= 1) {
    for (let i = 1; i <= lastPageNumber; i++) {
      element.push(pageSize * i);
    }
  }

  return element;
};

/**
 * Pagination
 * @param PaginationProps props
 * @returns
 */
const Pagination = ({
  currentPage = 1,
  pageSize = 5,
  loadingState = false,
  totalCount = 1,
  changeHandler,
}: PaginationProps) => {
  /**
   * Selected Option state
   */
  const [selectedOption, setSelectedOption] = useState<number>(pageSize);
  const { t } = useTranslation('common');

  if (loadingState) {
    return <PaginationPlaceholder />;
  }

  if (currentPage && pageSize && totalCount) {
    const pageNumbers = getPageNumbers({
      currentPage,
      pageSize,
      totalCount,
    });

    /**
     * Limit Option selection handler
     * @param {SelectChangeEvent} event
     */
    const setLimitSelectionHandler = (event: SelectChangeEvent<number>) => {
      let limit = event.target.value;
      if (limit !== selectedOption && limit) {
        if (typeof limit === 'string') {
          limit = parseInt(limit, 10);
        }
        setSelectedOption(limit);
        changeHandler({ payload: limit });
      }
    };
    if (totalCount <= 0) {
      return <></>;
    }

    return (
      <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <Stack
          flexWrap="wrap"
          direction="row"
          alignItems="center"
          className="justify-center"
          columnGap={1}
          rowGap={{ xs: 1, md: 0 }}
        >
          <Typography>
            {totalCount} {t('Item')}
          </Typography>
        </Stack>

        <FormControl className="flex h-[2.5rem]">
          <InputLabel className="z-[999]" id="pagination-label">
            {t('Select Page Limit')}
          </InputLabel>
          <Select
            className="borderCustom"
            labelId="pagination-label"
            id="demo-simple-select"
            size="small"
            value={selectedOption}
            label="Select Page Limit"
            onChange={setLimitSelectionHandler}
          >
            {pageNumbers.map((limit) => (
              <MenuItem
                key={limit}
                className="mx-3 my-1.5 w-[90%] rounded-md"
                value={limit}
              >
                {' '}
                {t('Show')} {limit} {t('per page')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
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
      my={2}
    >
      <Skeleton animation="wave" variant="rounded" width="20%" height={36} />
      <Skeleton animation="wave" variant="rounded" width="25%" height={36} />
    </Stack>
  );
};

export default Pagination;
