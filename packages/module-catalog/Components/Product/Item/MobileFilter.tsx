import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  AggregationInterface,
  SortFields,
} from '@voguish/module-catalog/types';
import { Filter, Sort } from '@voguish/module-theme/components/elements/Icon';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { LayeredPlaceHolder } from '../Detail/placeholder/PlaceHolder';
import { TopSortPlaceHolder } from '../Detail/placeholder/TopSortPlaceholder';
import FilterDrawer from '../FilterDrawer';
import FiltersRenderer from '../LayerNavigation/FiltersRenderer';
import SortbyMobile from './SortbyMobile';
type MobileFilterTypes = {
  loading?: boolean | any;
  title?: string;
  activeSort?: any;
  manageFilterAction?: any;
  manageToolbar?: any;
  appliedFilters?: any;
  sortFields?: SortFields;
  aggregations?: AggregationInterface[];
};

export default function MobileFilter(props: MobileFilterTypes) {
  const {
    title,
    activeSort,
    manageToolbar,
    loading,
    appliedFilters,
    manageFilterAction,
    sortFields,
    aggregations,
  } = props;
  // filter drawerMobile view
  const [filterOpen, setfilterOpen] = useState({
    right: false,
  });

  const toggleFilter = (open: boolean) => () => {
    setfilterOpen({ ...filterOpen, ['right']: open });
  };

  //sort mobile view
  const [openSortby, setopenSortby] = useState(false);
  const sortHandler = () => {
    setopenSortby(!openSortby);
  };
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      {loading ? (
        <TopSortPlaceHolder />
      ) : (
        <ErrorBoundary>
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Grid className="relative bg-[#ffffff] rounded-md mt-4 grid grid-cols-2">
            <Button
              sx={{ borderRadius: 0 }}
              className="py-4 border border-solid rtl:rounded-r-md ltr:rounded-l-md border-colorBorder"
              onClick={sortHandler}
            >
              <Sort />
              <Typography
                className="rtl:mr-3 ltr:ml-3 font-medium text-[#989898]"
                variant="filter"
              >
                {t('Sort')}
              </Typography>
            </Button>
            <Button
              sx={{ borderRadius: 0 }}
              className="py-4 border border-solid rtl:rounded-l-md ltr:rounded-r-md border-colorBorder"
              onClick={toggleFilter(true)}
            >
              <Filter />
              <Typography
                className="rtl:mr-3 ltr:ml-3 font-medium text-[#989898]"
                variant="filter"
              >
                {t('Filter')}
              </Typography>
            </Button>
          </Grid>
        </ErrorBoundary>
      )}
      <ErrorBoundary>
        {' '}
        <SortbyMobile
          sort={activeSort}
          manageToolbarAction={manageToolbar}
          sortFields={sortFields}
          open={openSortby}
          sortHandler={sortHandler}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <FilterDrawer
          filter={
            loading ? (
              <LayeredPlaceHolder />
            ) : (
              <FiltersRenderer
                appliedFilters={appliedFilters}
                manageFilterAction={manageFilterAction}
                filters={aggregations as AggregationInterface[]}
              />
            )
          }
          toggleDrawer={toggleFilter}
          filterOpen={filterOpen}
        />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
