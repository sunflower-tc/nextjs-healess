// import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { isValidArray, isValidObject, parseAppliedFilter } from '@utils/Helper';
import {
  FiltersRenderer,
  PaginationActionType,
  ProductAttributeFilterInput,
  ProductListViewType,
  ProductListingView,
  ProductsAction,
  ProductsInterface,
  ProductsQueryInput,
  ToolbarActionType,
  useProductsQuery,
} from '@voguish/module-catalog';
// import PRODUCTS_QUERY from '@voguish/module-catalog/graphql/Products.graphql';
import { Pagination } from '@voguish/module-theme';
import Containers from '@voguish/module-theme/components/ui/Container';
import EmptyPage from '@voguish/module-theme/components/ui/EmptyPage';
import React, { Reducer, useEffect, useReducer, useState } from 'react';
import LayeredPlaceHolder from './Detail/placeholder/PlaceHolder';
import { Placeholder, ProductItem } from './Item';
import DesktopFilter from './Item/DesktopFilter';
import MobileFilter from './Item/MobileFilter';

// import { PlaceHolder as LayeredPlaceHolder } from './LayerNavigation';

/**
 * Initial Search Criteria
 */
const initialSearchCriteria: ProductsQueryInput = {
  pageSize: 9,
};
/**
 *
 * @param state ProductsQueryInput
 * @param action ProductsAction
 * @returns
 */
const searchCriteriaReducer: Reducer<ProductsQueryInput, ProductsAction> = (
  state,
  action
) => {
  const value = action.payload;

  if (action.type === ToolbarActionType.SORT) {
    let sortValue = `${value}`.split('||');
    state.sort = { [sortValue[0]]: sortValue[1] };
  }

  if (action.type === PaginationActionType.PAGE) {
    state.currentPage = parseInt(`${value}`);
  }

  if (action.type === PaginationActionType.LIMIT) {
    state.pageSize = parseInt(`${value}`);
  }

  if (action.type === 'search' && typeof value === 'string') {
    state.search = value;
  }

  if (
    action.type === 'filter' &&
    typeof value !== 'string' &&
    typeof value !== 'number'
  ) {
    state.filters = { ...state.filters, ...value };
  }

  if (action.type === 'removeFilter' && value && typeof value === 'string') {
    let filters = state.filters;
    if (filters && isValidObject(filters)) {
      delete filters[value];
      state.filters = filters;
    }
  }
  return state;
};

const ProductList = ({
  showPagination,
  title,
  showLayeredNavigation,
  search = '',
  productsInput,
  activePageFilter = null,
  activePageFilterValue = null,
  showToolBar,
}: ProductsInterface) => {
  const [searchCriteria, dispatchSearchCriteria] = useReducer(
    searchCriteriaReducer,
    initialSearchCriteria
  );
  useEffect(() => {
    if (isValidObject(productsInput)) {
      if (productsInput?.filters) {
        dispatchSearchCriteria({
          type: 'filter',
          payload: productsInput.filters,
        });

        if (productsInput?.pageSize) {
          dispatchSearchCriteria({
            type: 'limit',
            payload: productsInput?.pageSize,
          });
        } else {
          dispatchSearchCriteria({
            type: 'limit',
            payload: 9,
          });
        }
      }

      if (search) {
        dispatchSearchCriteria({
          type: 'search',
          payload: search,
        });
      }
    }
  }, [productsInput, search]);

  /**
   * Managing View
   */
  const [view, setView] = useState<ProductListingView>(
    ProductListViewType.GRID
  );

  const { pageSize, currentPage, sort } = searchCriteria;

  /**
   * Fetching Products
   */
  const { data, loading } = useProductsQuery(searchCriteria);

  // Product Props
  const products = data?.products?.items || [];

  const totalCount = data?.products?.total_count || 0;

  let filters = data?.products?.applied_filters;
  const appliedFilters = React.useMemo(
    () => parseAppliedFilter(filters, activePageFilter, activePageFilterValue),
    [filters, activePageFilter, activePageFilterValue]
  );

  // Placeholders for Product List
  const placeHolders = new Array(pageSize).fill(0);

  const activeSortKey: string | null = sort ? Object.keys(sort)[0] : null;

  let activeSort =
    activeSortKey && sort
      ? `${activeSortKey}||${Object.values(sort)[0]}`
      : 'position||ASC';

  /**
   * To manage Pagination
   */
  const managePagination = ({
    action,
    payload,
  }: {
    action: PaginationActionType;
    payload: number;
  }) => {
    dispatchSearchCriteria({
      type: action,
      payload: payload,
    });
  };

  /**
   * To Manage Toolbar
   */
  const manageToolbar = ({
    action,
    payload,
  }: {
    action: ToolbarActionType;
    payload: ProductListingView | string;
  }) => {
    if (action === ToolbarActionType.VIEW) {
      setView(
        payload === ProductListViewType.GRID
          ? ProductListViewType.GRID
          : ProductListViewType.LIST
      );
    } else {
      dispatchSearchCriteria({
        type: action,
        payload: payload,
      });
    }
  };

  /**
   * To Manage Layered Navigation Filter
   */
  const manageFilterAction = (payload: ProductAttributeFilterInput) => {
    dispatchSearchCriteria({ type: 'filter', payload: payload });
  };

  const removeFilterAction = (filterKey: string) => {
    dispatchSearchCriteria({ type: 'removeFilter', payload: filterKey || '' });
  };

  return (
    <Containers>
      <Stack>
        <span className="lg:hidden">
          {isValidArray(products) && (
            <MobileFilter
              title={`${title}(${totalCount})`}
              activeSort={activeSort}
              manageToolbar={manageToolbar}
              removeFilterAction={removeFilterAction}
              loading={loading}
              appliedFilters={appliedFilters}
              manageFilterAction={manageFilterAction}
              data={data}
            />
          )}
        </span>
        {isValidArray(products) && (
          <DesktopFilter
            loading={loading}
            title={[title, totalCount]}
            activeSort={activeSort}
            view={view}
            manageToolbar={manageToolbar}
            data={data}
            showToolBar={showToolBar}
          />
        )}
        <Grid container spacing={2} mt={1}>
          {showLayeredNavigation && (
            <Grid className="rounded-md -lg:hidden" item xs={12} sm={12} lg={3}>
              {loading ? (
                <LayeredPlaceHolder />
              ) : (
                isValidArray(products) && (
                  <FiltersRenderer
                    appliedFilters={appliedFilters}
                    manageFilterAction={manageFilterAction}
                    removeFilterAction={removeFilterAction}
                    filters={data?.products?.aggregations}
                  />
                )
              )}
            </Grid>
          )}
          <Grid item xs={12} sm={12} lg={showLayeredNavigation ? 9 : 12}>
            <Grid container spacing={4}>
              {loading
                ? placeHolders.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`${index + item}`}>
                      <Placeholder />
                    </Grid>
                  ))
                : isValidArray(products) &&
                  products.map((product) => (
                    <Grid
                      item
                      xs={12}
                      sm={view === ProductListViewType.GRID ? 6 : 12}
                      md={view === ProductListViewType.GRID ? 4 : 12}
                      key={product.url_key}
                    >
                      <ProductItem
                        view={view}
                        product={product}
                        key={product.id}
                      />
                    </Grid>
                  ))}
            </Grid>
            {isValidArray(products) && showPagination && (
              <Grid item className="w-full">
                <Pagination
                  pageSize={pageSize}
                  loadingState={loading}
                  totalCount={totalCount || 0}
                  changeHandler={managePagination}
                  currentPage={
                    data?.products?.page_info?.current_page || currentPage
                  }
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Stack>
      {!isValidArray(products) && !loading && <EmptyPage />}
    </Containers>
  );
};
export default ProductList;
