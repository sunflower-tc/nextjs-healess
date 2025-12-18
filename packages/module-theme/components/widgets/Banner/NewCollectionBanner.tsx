import { BannerImage } from '@voguish/module-theme/types/home-page';
import ErrorBoundary from '../../ErrorBoundary';
import ProductBanner from './ProductBanner';

const NewCollectionBanner = ({ bannerData }: { bannerData: BannerImage }) => {
  return (
    <ErrorBoundary>
      <ProductBanner data={bannerData} />
    </ErrorBoundary>
  );
};
export default NewCollectionBanner;
