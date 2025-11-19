import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Filter, Sort } from '@voguish/module-theme';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import FilterDrawer from '../FilterDrawer';
import { FiltersRenderer, TopSortPlaceHolder } from '../LayerNavigation';
import SortbyMobile from './SortbyMobile';
type MobileFilterTypes = {
  loading?: boolean | any;
  title?: string;
  activeSort?: any;
  manageFilterAction?: any;
  manageToolbar?: any;
  appliedFilters?: any;
  data?: [] | object | any;
  removeFilterAction?: any;
};

const LayeredPlaceHolder = dynamic(
  () => import('../Detail/placeholder/PlaceHolder')
);

export default function MobileFilter(props: MobileFilterTypes) {
  const {
    title,
    activeSort,
    manageToolbar,
    removeFilterAction,
    loading,
    appliedFilters,
    manageFilterAction,
    data,
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
  return (
    <>
      {loading ? (
        <TopSortPlaceHolder />
      ) : (
        <>
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Grid className="relative bg-[#ffffff] rounded-md mt-4 grid grid-cols-2">
            <Button
              sx={{ borderRadius: 0 }}
              className="py-4 border border-solid rounded-l-md border-colorBorder"
              onClick={sortHandler}
            >
              <Sort />
              <Typography
                className="ml-3 font-medium text-[#989898]"
                variant="filter"
              >
                <Trans>Sort</Trans>
              </Typography>
            </Button>
            <Button
              sx={{ borderRadius: 0 }}
              className="py-4 border border-solid rounded-r-md border-colorBorder"
              onClick={toggleFilter(true)}
            >
              <Filter />
              <Typography
                className="ml-3 font-medium text-[#989898]"
                variant="filter"
              >
                <Trans>Filter</Trans>
              </Typography>
            </Button>
          </Grid>
        </>
      )}
      <SortbyMobile
        sort={activeSort}
        manageToolbarAction={manageToolbar}
        sortFields={data?.products?.sort_fields}
        open={openSortby}
        sortHandler={sortHandler}
      />
      <FilterDrawer
        removeFilter={removeFilterAction}
        filter={
          loading ? (
            <LayeredPlaceHolder />
          ) : (
            <FiltersRenderer
              appliedFilters={appliedFilters}
              manageFilterAction={manageFilterAction}
              removeFilterAction={removeFilterAction}
              filters={data?.products?.aggregations}
            />
          )
        }
        toggleDrawer={toggleFilter}
        filterOpen={filterOpen}
      />
    </>
  );
}
