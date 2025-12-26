import Stack from '@mui/material/Stack';
import { getUniqueCategories, isValidArray } from '@utils/Helper';
import {
  AggregationInterface,
  AppliedLayerFilter,
  ProductAttributeFilterInput,
} from '@voguish/module-catalog/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import AppliedFilters from './AppliedFilters';
import FilterRenderer from './FilterRenderer';

export const FiltersRenderer = ({
  appliedFilters = [],
  filters,
  manageFilterAction,
  selectedCategory,
}: {
  selectedCategory?: string;
  appliedFilters: AppliedLayerFilter[] | undefined;
  filters: AggregationInterface[] | undefined;
  manageFilterAction: (
    payload: // eslint-disable-line
    ProductAttributeFilterInput
  ) => void;
}) => {
  return (
    <ErrorBoundary>
      {' '}
      <Stack gap={6}>
        <AppliedFilters appliedFilters={appliedFilters} />
        <Stack
          className="!rounded-md"
          sx={{ marginRight: { xl: 1.2, lg: 1.2, ml: 1, sm: 0, xs: 0 } }}
        >
          {isValidArray(filters) &&
            getUniqueCategories(filters)?.map((filter, index) => (
              <ErrorBoundary key={filter.attribute_code}>
                <FilterRenderer
                  selectedCategory={selectedCategory}
                  appliedFilters={appliedFilters}
                  manageFilterAction={manageFilterAction}
                  expandedView={index === 0}
                  filter={filter}
                />
              </ErrorBoundary>
            ))}
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
};
export default FiltersRenderer;
