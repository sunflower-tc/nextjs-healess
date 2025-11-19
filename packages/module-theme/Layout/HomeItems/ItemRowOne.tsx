import { isValidArray } from '@utils/Helper';
import {
  ColumnContainer,
  PromtionPlaceHolder,
} from '@voguish/module-theme/components';
import Containers from '@voguish/module-theme/components/ui/Container';
import { BannerImage } from '@voguish/module-theme/types/home-page';
import dynamic from 'next/dynamic';
const FeatureProducts = dynamic(
  () => import('@voguish/module-theme/components/widgets/FeatureProducts')
);
const PromotionBanner = dynamic(
  () =>
    import('@voguish/module-theme/components/widgets/Banner/PromotionBanner')
);
type Types = {
  loading?: boolean;
  items: BannerImage[];
  products?: any;
};
export default function ItemRowOne({ loading, items, products }: Types) {
  return (
    <>
      <Containers>
        {loading ? (
          <PromtionPlaceHolder />
        ) : (
          isValidArray(items) && (
            <ColumnContainer>
              {/* promtion banner two column 3card layout */}
              <PromotionBanner items={items} />
            </ColumnContainer>
          )
        )}
        {/* feature slider container */}
        {isValidArray(products?.productList) && (
          <ColumnContainer sx={{ pt: loading ? 5 : 0 }}>
            <FeatureProducts data={products} loading={loading} />
          </ColumnContainer>
        )}
      </Containers>
    </>
  );
}
