import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {
  createQueryForLink,
  getCategoryFilterQuery,
  getClearAllPath,
  getFormattedPrice,
  isValidArray,
} from '@utils/Helper';
import { AppliedLayerFilter } from '@voguish/module-catalog/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { useTranslation } from 'next-i18next';

/**
 * Parsing Label
 *
 * @param filter
 * @returns string
 */
const parseLabel = (filter: AppliedLayerFilter): string => {
  let value = filter.value;
  if (filter.attribute_code === 'price') {
    let price = filter.value?.split('-')?.filter((i: string) => i);
    return `${filter.label}: ${getFormattedPrice(price?.at(0) as string)} - ${getFormattedPrice(price?.at(1) as string)}`;
  }
  return `${filter.label}: ${filter?.options?.[0]?.label ?? value ?? ''}`;
};

const AppliedFilters = ({
  appliedFilters,
}: {
  appliedFilters: AppliedLayerFilter[];
}) => {
  const router = useRouter();
  const {
    query: { urlKey: queries = [] },
  } = router;
  const { t } = useTranslation('common');

  /*  To remove seller and category filter according to route */
  const isMarketplaceRoute = router.asPath.includes('marketplace');
  if (isMarketplaceRoute) {
    appliedFilters = appliedFilters.filter(
      (acc) => acc.attribute_code !== 'seller_id'
    );
  }
  /**
   * Remove filter handler
   */
  const removeFilter = (
    event: MouseEvent,
    attributeCode: string,
    attributeValue: string
  ) => {
    event.stopPropagation(); // Prevent click event propagation
    event.preventDefault();
    const queryParameters: string | string[] = createQueryForLink(
      queries,
      attributeCode,
      '',
      false
    );
    if (isValidArray(queryParameters)) {
      router.push(
        getCategoryFilterQuery(router, attributeCode, attributeValue, true)
      );
    }
  };

  return isValidArray(appliedFilters) ? (
    <>
      <Stack gap={1} className="-lg:px-9" direction="row" flexWrap="wrap">
        {appliedFilters.map((appliedFilter) => (
          <ErrorBoundary key={appliedFilter.attribute_code}>
            {isValidArray(appliedFilter?.options) ? (
              appliedFilter?.options?.map((appliedValue, index) => (
                <Chip
                  label={
                    appliedFilter?.label?.toLowerCase() === 'price'
                      ? parseLabel(appliedFilter)
                      : `${appliedFilter?.label} - ${appliedValue?.label ?? t('No')}`
                  }
                  variant="outlined"
                  clickable={false}
                  key={index}
                  className="capitalize"
                  onDelete={(e) => {
                    removeFilter(
                      e,
                      appliedFilter.attribute_code,
                      appliedValue?.value
                    );
                  }}
                  deleteIcon={
                    <Link
                      className="pt-2"
                      href={
                        getCategoryFilterQuery(
                          router,
                          appliedFilter.attribute_code,
                          appliedValue?.value,
                          true
                        ) as string
                      }
                    >
                      <HighlightOffIcon className="mt-0.5" />
                    </Link>
                  }
                />
              ))
            ) : (
              <Chip
                label={parseLabel(appliedFilter)}
                variant="outlined"
                clickable={false}
                onDelete={(e) => {
                  removeFilter(
                    e,
                    appliedFilter.attribute_code,
                    appliedFilter?.value
                  );
                }}
                deleteIcon={
                  <Link
                    className="pt-2"
                    href={
                      getCategoryFilterQuery(
                        router,
                        appliedFilter.attribute_code,
                        appliedFilter?.value ?? 0,
                        true
                      ) as string
                    }
                  >
                    <HighlightOffIcon className="mt-0.5" />
                  </Link>
                }
              />
            )}
          </ErrorBoundary>
        ))}
        <Chip
          label="Clear All"
          variant="outlined"
          clickable={false}
          className="text-red-500 border-red-500"
          onDelete={() => console.log('')}
          deleteIcon={
            <Link className="pt-2" href={getClearAllPath(router?.asPath)}>
              <HighlightOffIcon className="mt-0.5 text-red-500" />
            </Link>
          }
        />
      </Stack>
    </>
  ) : (
    <ErrorBoundary></ErrorBoundary>
  );
};

export default AppliedFilters;
