import Stack from '@mui/material/Stack';
import { isValidArray } from '@utils/Helper';
import {
  AggregationInterface,
  AppliedLayerFilter,
  ProductAttributeFilterInput,
} from '@voguish/module-catalog';
import AppliedFilters from './AppliedFilters';
import FilterRenderer from './FilterRenderer';

export const FiltersRenderer = ({
  appliedFilters = [],
  filters,
  removeFilterAction,
  manageFilterAction,
}: {
  appliedFilters: AppliedLayerFilter[] | undefined;
  filters: AggregationInterface[] | undefined;
  removeFilterAction: (
    attributeCode: // eslint-disable-line
    string
  ) => void;
  manageFilterAction: (
    payload: // eslint-disable-line
    ProductAttributeFilterInput
  ) => void;
}) => {
  return (
    <Stack gap={6}>
      <AppliedFilters
        appliedFilters={appliedFilters}
        removeFilterAction={removeFilterAction}
      />
      <Stack
        className="!rounded-md"
        sx={{ marginRight: { xl: 1.2, lg: 1.2, ml: 1, sm: 0, xs: 0 } }}
      >
        {isValidArray(filters) &&
          filters?.map((filter, index) => (
            <FilterRenderer
              appliedFilters={appliedFilters}
              manageFilterAction={manageFilterAction}
              expandedView={index === 0}
              key={filter.attribute_code}
              filter={filter}
            />
          ))}
      </Stack>
    </Stack>
  );
};
export default FiltersRenderer;
