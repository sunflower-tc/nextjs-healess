import Clear from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { getCategoryFilterQuery, isValidArray } from '@utils/Helper';
import {
  SortFields,
  SortModal,
  ToolbarActionType,
} from '@packages/module-catalog/types';
import { SelectChangeEvent } from '@packages/module-customer/Components/OrderTab/Pagination';
import ErrorBoundary from '@packages/module-theme/components/ErrorBoundary';
import Modal from '@packages/module-theme/components/Modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useCreateSortFields } from '../Toolbar';
import { RightIcon } from '@packages/module-theme/components/elements/Icon';
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
const SortbyMobile = (props: SortModal) => {
  const router = useRouter();
  const {
    query: { urlKey: queries = [] },
  } = router;

  let { open, sortHandler, sortFields, sort, manageToolbarAction } = props;
  const sortIndex = queries.indexOf('sort');
  if (sortIndex !== -1 && Array.isArray(queries)) {
    const res = queries.filter((_, i) => i == sortIndex + 1);
    sort = res?.[0];
  }
  /**
   * Handle Toolbar Actions
   * @param event
   */
  const handleChange = (event: SelectChangeEvent) => {
    manageToolbarAction({
      action: ToolbarActionType.SORT,
      payload: event.target.value as string,
    });
  };

  let sortFieldsWithValues = null;

  sortFieldsWithValues = useCreateSortFields(sortFields);
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      <div className="lg:hidden">
        {sortFieldsWithValues && isValidArray(sortFieldsWithValues) ? (
          <Modal
            showModal={open}
            hideModal={sortHandler}
            title={
              <ErrorBoundary>
                <span
                  className="flex cursor-pointer sm:hidden"
                  onClick={sortHandler}
                >
                  <RightIcon />
                </span>
                <div className="flex items-center justify-between w-full">
                  <Typography variant="h2">{t('Sort By')}</Typography>
                  <Button
                    sx={{ paddingX: 0, minWidth: 0 }}
                    onClick={sortHandler}
                    className="hidden w-10 h-10 px-0 mx-1 mt-1 rounded-full sm:flex"
                  >
                    <Clear />
                  </Button>
                </div>
              </ErrorBoundary>
            }
          >
            <ErrorBoundary>
              <FormControl className="px-5 sm:px-0" fullWidth>
                <RadioGroup
                  onClick={sortHandler}
                  onChange={handleChange}
                  aria-labelledby="product-list-sort-field-label"
                  value={sort}
                >
                  {sortFieldsWithValues?.map((option) => (
                    <ErrorBoundary key={option.value}>
                      <Link
                        className="no-underline"
                        href={getCategoryFilterQuery(
                          router,
                          'sort',
                          option.value
                        )}
                      >
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio size="small" />}
                          label={option.label}
                        />
                      </Link>
                    </ErrorBoundary>
                  ))}
                </RadioGroup>
              </FormControl>
            </ErrorBoundary>
          </Modal>
        ) : (
          <ErrorBoundary></ErrorBoundary>
        )}
      </div>
    </ErrorBoundary>
  );
};
export default SortbyMobile;
