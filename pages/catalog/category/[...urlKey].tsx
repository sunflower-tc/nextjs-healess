import { client } from '@lib/apollo-client';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { itemsArray } from '@store/local-storage';
import { graphqlRequest } from '@utils/Fetcher';
import {
  capitalizeFirstLetter,
  createPageOptions,
  getLocalStore,
  isValidArray,
  isValidObject,
  parseQuery,
} from '@utils/Helper';
import { LayeredPlaceHolder } from '@voguish/module-catalog/Components/Product/Detail/placeholder/PlaceHolder';
import Placeholder from '@voguish/module-catalog/Components/Product/Item/Placeholder';
import ProductList from '@voguish/module-catalog/Components/Product/List';
import PRODUCT_AGGRESSION from '@voguish/module-catalog/graphql/Aggregations.graphql';
import CATEGORIES_QUERY from '@voguish/module-catalog/graphql/Categories.graphql';
import CATEGORY_QUERY from '@voguish/module-catalog/graphql/Category.graphql';
import PRODUCTS_QUERY from '@voguish/module-catalog/graphql/Products.graphql';
import STORE_LIST from '@voguish/module-catalog/graphql/StoreList.query.graphql';
import {
  CategoriesQueryResult,
  CategoryItem,
  ProductsListInterface,
  ProductsResultInterface,
} from '@voguish/module-catalog/types';
import HtmlBlockPlaceHolder from '@voguish/module-theme/components/htmlBlocks/HtmlBlockPlaceHolder';
import Containers from '@voguish/module-theme/components/ui/Container';
import {
  CategoryPagePaths,
  PageOptions,
  PagePathProps,
} from '@voguish/module-theme/page';
import { GetStaticPathsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const HtmlBlock = dynamic(
  () => import('@voguish/module-catalog/Components/Product/HtmlBlock'),
  {
    loading: () => {
      return <HtmlBlockPlaceHolder />;
    },
  }
);
const CategoryList = dynamic(
  () => import('@voguish/module-theme/components/htmlBlocks/CategoryList'),
  {
    loading: () => {
      return (
        <div className="lg:mt-6 lg:col-span-3">
          <LayeredPlaceHolder />
        </div>
      );
    },
  }
);
const Categories = ({
  category,
  products,
  aggregations,
  sort,
}: {
  category: CategoryItem;
  products: ProductsResultInterface;
  aggregations: any;
  sort: any;
}) => {
  const { name } = category;
  const router = useRouter();

  return (
    <>
      <Containers>
        <div
          className={`${
            isValidArray(category?.children) && category?.content?.status
              ? 'grid gap-4 lg:grid-cols-12'
              : ''
          }`}
        >
          {router?.isFallback && category?.content?.status ? (
            <div className="lg:mt-6 lg:col-span-3">
              <LayeredPlaceHolder />
            </div>
          ) : (
            isValidArray(category?.children) &&
            category?.content?.status && <CategoryList category={category} />
          )}
          <div
            className={`${
              isValidArray(category?.children) && category?.content?.status
                ? 'lg:col-span-9'
                : ''
            } w-full`}
          >
            {router?.isFallback ? (
              <HtmlBlockPlaceHolder />
            ) : (
              category?.content?.status && <HtmlBlock category={category} />
            )}
          </div>
        </div>
      </Containers>
      <Containers>
        <div
          className={`${
            isValidArray(category?.children) && category?.content?.status
              ? 'grid gap-4 lg:grid-cols-12'
              : ''
          }`}
        >
          <div
            className={`${
              isValidArray(category?.children) && category?.content?.status
                ? 'lg:col-span-12'
                : ''
            } w-full`}
          >
            {router?.isFallback ? (
              <Stack>
                <Grid container spacing={2} mt={1}>
                  <Grid
                    className="rounded-md -lg:hidden"
                    item
                    xs={12}
                    sm={12}
                    lg={3}
                  >
                    <LayeredPlaceHolder />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={9}>
                    <Grid container spacing={4}>
                      {itemsArray.map((item, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={`${index + item}`}
                        >
                          <Placeholder />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
            ) : (
              <ProductList
                title={name as string}
                showPagination={true}
                showLayeredNavigation={
                  isValidArray(aggregations) ? true : false
                }
                showToolBar
                category={category}
                loading={router.isFallback}
                products={products}
                aggregations={aggregations}
                sort={sort}
              />
            )}
          </div>
        </div>
      </Containers>
    </>
  );
};

export default Categories;

/**
 * Get static Props: getting all the paths for pre rendering
 *
 * @returns {Object} props
 */
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  let paths: PagePathProps = [];

  try {
    if (process.env.MODE === 'PRODUCTION') {
      const { data } = await client.query<CategoriesQueryResult>({
        query: CATEGORIES_QUERY,
        variables: { search: '', filters: {}, pageSize: 9 },
      });

      const categoryList = data?.categoryList || [];

      paths = categoryList.map((category) => ({
        params: { urlKey: [category?.url_key || '404'] },
      }));
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('Error fetching category paths', error);
    paths = [];
  }

  return { paths, fallback: 'blocking' };
}

/**
 * Generating data at build time.
 *
 * @param {*} param0
 * @returns {JSON} props
 */

export async function getStaticProps({ params, locale }: CategoryPagePaths) {
  try {
    if (!params?.urlKey || !locale) {
      throw new Error('Missing parameters or locale');
    }
    const [urlKey, query] = parseQuery(params);
    const storListResponse = await graphqlRequest({
      query: STORE_LIST,
      variables: {},
    });
    const stores = storListResponse?.data?.availableStores || [];
    const data: CategoriesQueryResult = await graphqlRequest({
      query: CATEGORY_QUERY,
      variables: {
        search: '',
        filters: { url_key: { eq: urlKey } },
      },
      options: {
        context: {
          headers: {
            Store: getLocalStore(stores, locale as string),
          },
        },
        fetchPolicy: 'no-cache',
      },
    });
    const category = data?.categoryList?.[0] || null;

    if (!isValidObject(category)) {
      return {
        props: {
          ...(await serverSideTranslations(locale as string, ['common'])),
          category: {},
          pageOptions: {
            title: capitalizeFirstLetter(urlKey?.replace('-', ' ') || ''),
          },
          products: [],
        },
      };
    }

    const productsQueryInput: {
      //@ts-expect-error filter is of different kind
      filters: { [key: string] };
      search: string;
      pageSize: number | undefined;
      currentPage: number | undefined;
      sort?: { [key: string]: string };
    } = {
      filters: {
        category_uid: { in: [category.uid] },
      },
      sort: {
        name: 'ASC',
      },
      search: '',
      pageSize: 54 as number | undefined,
      currentPage: undefined as number | undefined,
    };
    query?.reduce<string | undefined>((param, value) => {
      if (!param) return value;
      if (param === 'sort') {
        const sortRange = value.split('_');
        productsQueryInput.sort = {
          [sortRange[0]]: sortRange[1].toUpperCase(),
        };
      } else if (param === 'limit') {
        productsQueryInput.pageSize = Number(value);
      } else if (param === 'page') {
        productsQueryInput.currentPage = Number(value);
      } else if (param === 'price') {
        const priceRange = value.split('_');
        const filterValue = { from: priceRange[0], to: priceRange[1] };
        productsQueryInput.filters = {
          ...productsQueryInput.filters,
          price: filterValue,
        };
      } else {
        const existing = productsQueryInput.filters[param]?.in || [];
        productsQueryInput.filters[param] = {
          in: [...existing, value],
        };
      }
      return undefined;
    }, undefined);

    const productsData: ProductsListInterface = await graphqlRequest({
      query: PRODUCTS_QUERY,
      variables: productsQueryInput,
      options: {
        context: {
          headers: {
            Store: getLocalStore(stores, locale as string),
          },
        },
        fetchPolicy: 'network-only',
      },
    });
    const aggregations: ProductsListInterface = await graphqlRequest({
      query: PRODUCT_AGGRESSION,
      variables: productsQueryInput,
      options: {
        context: {
          headers: {
            Store: getLocalStore(stores, locale as string),
          },
        },
        fetchPolicy: 'network-only',
      },
    });
    const pageOptions: PageOptions = {
      ...createPageOptions(category.breadcrumbs, category.name, category.uid),
      ...{
        description: category?.description,
        metaTitle: category?.meta_title,
        metaDescription: category?.meta_description || category?.description,
        metaKeywords: category?.meta_keywords,
      },
    };
    const products = { ...productsData?.products };

    return {
      props: {
        ...(await serverSideTranslations(locale as string, ['common'])),
        category: category,
        pageOptions: pageOptions,
        aggregations: aggregations?.products?.aggregations || [],
        sort: aggregations?.products?.sort_fields || {},
        products: products,
        selectedCategory: category.uid,
      },
      revalidate: 30,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('Error fetching category data', error);
    return {
      notFound: true,
    };
  }
}
