import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ProductItemInterface, TabsProp } from '@voguish/module-catalog/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import ReviewIndexPlaceHolder from '@voguish/module-theme/components/widgets/ProductReview/ReviewPlaceholder';
import Tab from '@voguish/module-theme/components/widgets/Tab';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Placeholder from '../Item/Placeholder';
import { PlaceHolder } from './placeholder/PlaceHolder';
import TabPlaceHolder from './placeholder/TabPlaceHolder';
const MobileViewDropdown = dynamic(
  () => import('@voguish/module-theme/components/ui/MobileViewDropdown')
);
const MoreInfo = dynamic(() => import('./MoreInfo'), {
  loading: () => (
    <div className="flex flex-col gap-2">
      <div className="flex w-full h-2 max-w-xs rounded-sm bg-slate-300 animate-pulse" />
      <div className="flex w-full h-2 max-w-xs rounded-sm bg-slate-300 animate-pulse" />
      <div className="flex w-full h-2 max-w-xs rounded-sm bg-slate-300 animate-pulse" />
      <div className="flex w-full h-2 max-w-xs rounded-sm bg-slate-300 animate-pulse" />
    </div>
  ),
});
const Review = dynamic(
  () => import('@voguish/module-theme/components/widgets/ProductReview/Review'),
  {
    loading: () => <ReviewIndexPlaceHolder />,
  }
);
const RelatedProducts = dynamic(() => import('../RelatedProducts'), {
  loading: () => (
    <div className="2xl:max-w-[90rem] mx-auto">
      <div className="mt-4">
        <div className="hidden gap-3 md:flex">
          {new Array(5).fill(0).map((item, index) => (
            <div className="w-[20%]" key={`${index + item}`}>
              <Placeholder />
            </div>
          ))}
        </div>
        <div className="md:hidden">
          <Placeholder />
        </div>
      </div>
    </div>
  ),
});

interface Panel {
  product: ProductItemInterface;
  loading?: boolean;
}
export function TabPanel(props: Panel) {
  const { t } = useTranslation('common');
  const { product, loading = false } = props;
  const items: TabsProp[] = [
    {
      id: 1,
      name: t('Description'),
      render: () => {
        return (
          <ErrorBoundary>
            <div className="py-4">
              {product?.description?.html ? (
                <Typography
                  variant="filter"
                  className="leading-normal text-hoverEffect lg:leading-[1.25rem]"
                  dangerouslySetInnerHTML={{
                    __html: product?.description?.html,
                  }}
                />
              ) : (
                <Typography
                  variant="filter"
                  className="leading-normal text-hoverEffect lg:leading-[1.25rem]"
                >
                  {t('No Description Found')}
                </Typography>
              )}
            </div>
          </ErrorBoundary>
        );
      },
    },
    {
      id: 2,
      name: t('More Info'),
      render: () => {
        return (
          <div className="py-4">
            <ErrorBoundary>
              <MoreInfo productSku={product?.sku} />
            </ErrorBoundary>
          </div>
        );
      },
    },
    {
      id: 3,
      name: t('Related Products'),
      render: () => {
        return (
          <div className="py-4">
            <ErrorBoundary>
              <RelatedProducts productSku={product.sku} />
            </ErrorBoundary>
          </div>
        );
      },
    },
    {
      id: 4,
      name: t('Reviews'),
      render: () => {
        return (
          <div className="py-4">
            <ErrorBoundary>
              <Review product={product} />
            </ErrorBoundary>
          </div>
        );
      },
    },
  ];

  return (
    <ErrorBoundary>
      <span className="-lg:hidden">
        {loading ? <TabPlaceHolder /> : <Tab hash items={items} />}
      </span>
      <span className="lg:hidden">
        {loading ? <PlaceHolder /> : <MobileViewTab items={items} />}
      </span>
    </ErrorBoundary>
  );
}
function MobileViewTab({ items }: { items: TabsProp[] }) {
  return (
    <Grid className="grid w-full gap-6 overflow-x-auto">
      {items.map((item) => (
        <MobileViewDropdown key={item.id} item={item} extraClass="text-left" />
      ))}
    </Grid>
  );
}

export default TabPanel;
