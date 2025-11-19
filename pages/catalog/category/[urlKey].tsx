import { client } from '@lib/apollo-client';
import { Grid, Stack } from '@mui/material';
import { graphqlRequest } from '@utils/Fetcher';
import { isValidArray, isValidObject } from '@utils/Helper';
import {
  CategoriesQueryResult,
  CategoryBreadcrumb,
  CategoryItem,
  Placeholder,
} from '@voguish/module-catalog';
import { LayeredPlaceHolder } from '@voguish/module-catalog/Components/Product/Detail/placeholder/PlaceHolder';
import CATEGORIES_QUERY from '@voguish/module-catalog/graphql/Categories.graphql';
import CATEGORY_QUERY from '@voguish/module-catalog/graphql/Category.graphql';
import {
  BreadcrumbProps,
  PageOptions,
  PagePathProps,
  PagePaths,
} from '@voguish/module-theme';
import Containers from '@voguish/module-theme/components/ui/Container';
import dynamic from 'next/dynamic';
const placeHolders = new Array(10).fill(0);

const ProductList = dynamic(
  () => import('@voguish/module-catalog/Components/Product/List'),
  {
    loading: () => (
      <>
        <Containers>
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
                  {placeHolders.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`${index + item}`}>
                      <Placeholder />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Containers>
      </>
    ),
  }
);

const createPageOptions = (
  breadcrumbs: CategoryBreadcrumb[],
  title: string,
  uid: string
): PageOptions => {
  if (isValidArray(breadcrumbs)) {
    let thisTitle = title;
    let breads: BreadcrumbProps[] = [];
    breadcrumbs.forEach(({ category_name, category_uid, category_url_key }) => {
      thisTitle = `${thisTitle}-${category_name}`;
      breads = [
        ...breads,
        {
          label: category_name,
          url: `catalog/category/${category_url_key}`,
          uid: category_uid,
        },
      ];
    });
    return {
      title: thisTitle,
      breadCrumbs: [...breads, { label: title, uid }],
    };
  }
  return {
    title,
  };
};

const Categories = ({ category }: { category: CategoryItem }) => {
  const { uid, name } = category;
  const filterProps = {
    filters: { category_uid: { eq: uid } },
  };

  return (
    <>
      <ProductList
        title={name}
        showPagination={true}
        showLayeredNavigation
        activePageFilter="category_uid"
        activePageFilterValue={uid}
        showToolBar
        productsInput={filterProps}
      />
    </>
  );
};

export default Categories;

/**
 * Get static Props: getting all the paths for pre rendering
 *
 * @returns {Object} props
 */
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on products

  let paths: PagePathProps = [];

  if (process.env.MODE === 'PRODUCTION') {
    const { data } = await client.query<CategoriesQueryResult>({
      query: CATEGORIES_QUERY,
      variables: { search: '', filters: {}, pageSize: 9 },
    });

    const categoryList = data?.categoryList || [];

    paths = categoryList.map((category) => ({
      params: { urlKey: category?.url_key || '404' },
    }));
  }
  return { paths, fallback: 'blocking' };
}

/**
 * Generating data at build time.
 *
 * @param {*} param0
 * @returns {JSON} props
 */
export async function getStaticProps({ params }: PagePaths) {
  const data: CategoriesQueryResult = await graphqlRequest({
    query: CATEGORY_QUERY,
    variables: {
      search: '',
      filters: { url_key: { eq: params?.urlKey } },
    },
    options: {
      fetchPolicy: 'network-only',
    },
  });

  const category = data?.categoryList?.[0] || null;

  if (!isValidObject(category)) {
    return {
      notFound: true,
    };
  }
  const pageOptions: PageOptions = {
    ...createPageOptions(category.breadcrumbs, category.name, category.uid),
    ...{
      description: category?.description,
      metaTitle: category?.meta_title,
      metaDescription:
        // category?.meta_description ||
        `Voguish Theme |${category?.name}| ${category?.description}`,
      metaKeywords: category?.meta_keywords,
    },
  };
  return {
    props: {
      category: category,
      pageOptions: pageOptions,
    },
    revalidate: 100, // Time In which it revalidate or check for changes
  };
}
