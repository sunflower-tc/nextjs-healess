import { BannerImage } from '@voguish/module-theme/types/home-page';
import ProductBanner from './ProductBanner';

const NewCollectionBanner = ({ bannerData }: { bannerData: BannerImage }) => {
  return <ProductBanner data={bannerData} />;
};
export default NewCollectionBanner;
