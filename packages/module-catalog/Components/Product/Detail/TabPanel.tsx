import { t } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ProductItemInterface, TabsProp } from '@voguish/module-catalog/types';
import dynamic from 'next/dynamic';

const PlaceHolder = dynamic(() => import('./placeholder/PlaceHolder'));
const TabPlaceHolder = dynamic(() => import('./placeholder/TabPlaceHolder'));

const Review = dynamic(
  () => import('@voguish/module-theme/components/widgets/ProductReview/Review'),
  {
    loading: () => <p>Loading...</p>,
  }
);

const RelatedProducts = dynamic(() => import('../RelatedProducts'), {
  loading: () => <p>Loading...</p>,
});
const MobileViewDropdown = dynamic(
  () => import('@voguish/module-theme/components/ui/MobileViewDropdown')
);
const Tab = dynamic(
  () => import('@voguish/module-theme/components/widgets/Tab')
);
interface Panel {
  product: ProductItemInterface;
  loading?: boolean;
}

export function TabPanel(props: Panel) {
  const { product, loading = false } = props;
  const items: TabsProp[] = [
    {
      id: 1,
      name: t`Description`,
      render: () => {
        return (
          <div className="py-4">
            <Typography
              variant="filter"
              className="text-hoverEffect leading-normal lg:leading-[1.25rem]"
              dangerouslySetInnerHTML={{
                __html: product?.description?.html || '-',
              }}
            />
          </div>
        );
      },
    },
    {
      id: 2,
      name: t`Related Products`,
      render: () => {
        return (
          <div className="py-4">
            <RelatedProducts productSku={product.sku} />
          </div>
        );
      },
    },
    {
      id: 3,
      name: t`Reviews`,
      render: () => {
        return (
          <div className="py-4">
            <Review product={product} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <span className="-lg:hidden">
        {loading ? <TabPlaceHolder /> : <Tab items={items} />}
      </span>
      <span className="lg:hidden">
        {loading ? <PlaceHolder /> : <MobileViewTab items={items} />}
      </span>
    </>
  );
}

function MobileViewTab({ items }: { items: TabsProp[] }) {
  return (
    <Grid className="grid w-full gap-6">
      {items.map((item) => (
        <MobileViewDropdown key={item.id} item={item} extraClass="text-left" />
      ))}
    </Grid>
  );
}

export default TabPanel;
