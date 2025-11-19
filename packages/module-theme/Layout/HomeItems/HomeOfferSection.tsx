import { isValidArray } from '@utils/Helper';
import { BrandCollectionPlaceHolder } from '@voguish/module-theme/components';
import { BannerImage } from '@voguish/module-theme/types/home-page';
import dynamic from 'next/dynamic';
const BrandCollectionBanner = dynamic(
  () =>
    import(
      '@voguish/module-theme/components/widgets/Banner/BrandCollectionBanner'
    ),
  { loading: () => <BrandCollectionPlaceHolder /> }
);

export default function HomeOfferSection({
  brandCollectionBanner,
  loading,
}: {
  brandCollectionBanner: {
    title: string;
    description: string;
    items: BannerImage[];
  };
  loading: boolean;
}) {
  return (
    <>
      {loading ? (
        <BrandCollectionPlaceHolder />
      ) : (
        isValidArray(brandCollectionBanner?.items) && (
          <BrandCollectionBanner items={brandCollectionBanner} />
        )
      )}
    </>
  );
}
