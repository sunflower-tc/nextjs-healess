import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { isValidArray } from '@utils/Helper';
import { AppliedLayerFilter } from '@voguish/module-catalog';
/**
 * Parsing Label
 *
 * @param filter
 * @returns string
 */
const parseLabel = (filter: AppliedLayerFilter): string => {
  let value = filter.value;
  if (filter.attribute_code === 'price' && filter.value.includes('_')) {
    value = filter.value.replace('_', '-');
  }

  return `${filter.label}: ${filter?.options?.[0]?.label || value}`;
};

const AppliedFilters = ({
  appliedFilters,
  removeFilterAction,
}: {
  appliedFilters: AppliedLayerFilter[];
  removeFilterAction: (
    attributeCode: // eslint-disable-line
    string
  ) => void;
}) => {
  /**
   * Remove filter handler
   */
  const removeFilter = (attributeCode: string) => {
    removeFilterAction(attributeCode);
  };

  return isValidArray(appliedFilters) ? (
    <Stack gap={1} className="-lg:px-9" direction="row" flexWrap="wrap">
      {appliedFilters.map((appliedFilter) => (
        <Chip
          key={appliedFilter.attribute_code}
          label={parseLabel(appliedFilter)}
          variant="outlined"
          onDelete={() => {
            removeFilter(appliedFilter.attribute_code);
          }}
        />
      ))}
    </Stack>
  ) : (
    <></>
  );
};

export default AppliedFilters;
