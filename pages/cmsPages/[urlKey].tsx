import { client } from '@lib/apollo-client';
import Typography from '@mui/material/Typography';
import { graphqlRequest } from '@utils/Fetcher';
import { isValidObject } from '@utils/Helper';
import CMSPageContent from '@voguish/module-cms/Component/CMSPageContent';
import {
  CMSPageResult,
  CMSPage as CMSPageType,
} from '@voguish/module-cms/Component/CMSPageContent/type';
import CMS_PAGE from '@voguish/module-cms/graphql/CmsPage.graphql';
import { PageOptions, PagePathProps, PagePaths } from '@voguish/module-theme';
import { FooterLinksResult } from '@voguish/module-theme/Layout/Footer/type';
import Containers from '@voguish/module-theme/components/ui/Container';
import PAGES from '@voguish/module-theme/graphql/footer.graphql';

const CMSPage = ({ page }: { page: CMSPageType }) => {
  return (
    <Containers>
      <Typography variant="h2">{page?.contentHeading}</Typography>
      {page.content && <CMSPageContent content={page.content} />}
    </Containers>
  );
};

export default CMSPage;

/**
 * Get static Props: getting all the paths for pre rendering
 *
 * @returns {Object} props
 */
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on products

  let paths: PagePathProps = [];

  if (process.env.MODE === 'PRODUCTION') {
    const { data } = await client.query<FooterLinksResult>({
      query: PAGES,
    });

    const links = data.footerLinks || [];

    paths =
      links
        ?.map((link) =>
          link.subLinks
            ?.filter((item) => item.type === 'page')
            ?.map((subLink) => ({
              params: { urlKey: subLink.url_key || '404' },
            }))
        )
        ?.reduce((prevEle, ele) => prevEle.concat(ele), []) || [];
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
  let page = null;

  const urlKey = params?.urlKey || '';

  if (urlKey === 'sitemap') {
    page = {
      title: 'Sitemap',
      metaDescription: 'Sitemap',
      urlKey: 'sitemap',
    };
  } else {
    const data: CMSPageResult = await graphqlRequest({
      query: CMS_PAGE,
      variables: {
        identifier: params.urlKey,
      },
      options: {
        fetchPolicy: 'network-only',
      },
    });

    page = data?.cmsPage || null;

    if (!isValidObject(page)) {
      return {
        notFound: true,
      };
    }
  }
  const pageOptions: PageOptions = {
    title: page?.title,
    showBreadcrumb: true,
    description: page.metaDescription,
    metaTitle: page?.metaTitle,
    metaDescription: page.metaDescription,
    metaKeywords: page?.metaKeywords,
  };
  return {
    props: {
      page: page,
      pageOptions: pageOptions,
    },
    revalidate: 100, // Time In which it revalidate or check for changes
  };
}
