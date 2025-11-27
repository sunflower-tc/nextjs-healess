import { Trans, t } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TabPlaceHolder, TabsProp } from '@voguish/module-catalog';
import { IProfileProps } from '@voguish/module-marketplace';
import { HTMLRenderer } from '@voguish/module-theme';
import dynamic from 'next/dynamic';
const DropdownsCard = dynamic(
  () => import('@voguish/module-theme/components/ui/MobileViewDropdown')
);
const NoDataFound = dynamic(
  () => import('@voguish/module-theme/components/ui/NoDataFound')
);
const AllProductGrid = dynamic(() => import('../AllProductGrid'));
const TabLayout = dynamic(
  () => import('@voguish/module-theme/components/widgets/Tab')
);
const PlaceHolder = dynamic(
  () =>
    import(
      '@voguish/module-catalog/Components/Product/Detail/placeholder/PlaceHolder'
    )
);
const Review = dynamic(
  () => import('@voguish/module-marketplace/Components/Reviews/Review')
);
const Content = (props: IProfileProps) => {
  const {
    id,
    rating,
    returnPolicy,
    shippingPolicy,
    contactNumber,
    email,
    loading,
  } = props;

  const items: TabsProp[] = [
    {
      id: 1,
      name: t`All Products`,
      render: () => {
        return (
          <div className="py-4">
            <AllProductGrid
              sellerId={String(id)}
              title={t`Sellers collection`}
            />
          </div>
        );
      },
    },
    {
      id: 2,
      name: t`Related Added Products`,
      render: () => {
        return (
          <div className="py-4">
            <AllProductGrid
              title={t`Recently Added`}
              sellerId={String(id)}
              pageSize={3}
              showPagination={false}
            />
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
            <Review id={id} totalRating={rating} />
          </div>
        );
      },
    },
    {
      id: 4,
      name: t`Return Policy`,
      render: () => {
        return (
          <div className="py-4">
            {returnPolicy ? (
              <Typography variant="body2">
                <HTMLRenderer htmlText={returnPolicy}></HTMLRenderer>
              </Typography>
            ) : (
              <NoDataFound text={t`No Return Policy Found`} />
            )}
          </div>
        );
      },
    },
    {
      id: 5,
      name: t`Shipping Policy`,
      render: () => {
        return (
          <div className="py-4">
            {shippingPolicy ? (
              <Typography variant="body2">
                <HTMLRenderer htmlText={shippingPolicy}></HTMLRenderer>
              </Typography>
            ) : (
              <NoDataFound text={t`No Shipping Policy Found`} />
            )}
          </div>
        );
      },
    },
    {
      id: 6,
      name: t`Seller Contact`,
      render: () => {
        return (
          <div className="py-4">
            <Typography variant="body2">
              <Trans>Phone :</Trans>{' '}
            </Typography>
            <Typography variant="body2">
              <Trans>Mobile :</Trans>
              {contactNumber}
            </Typography>
            <Typography variant="body2">
              <Trans>Email :</Trans> {email}
            </Typography>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <span className=" -lg:hidden">
        {loading ? <TabPlaceHolder /> : <TabLayout items={items} />}
      </span>
      <span className="lg:hidden">
        {loading ? <PlaceHolder /> : <MobileViewTab items={items} />}
      </span>
    </>
  );
};

function MobileViewTab({ items }: { items: TabsProp[] }) {
  return (
    <Grid className="w-full">
      {items.map((item) => (
        <DropdownsCard key={item.id} item={item} extraClass="text-left" />
      ))}
    </Grid>
  );
}
export default Content;
