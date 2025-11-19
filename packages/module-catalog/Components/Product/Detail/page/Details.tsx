import { t } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import { PLACEHOLDER_IMG } from '@utils/Constants';
import { isValidObject } from '@utils/Helper';
import {
  MediaGallery,
  ProductItemInterface,
} from '@voguish/module-catalog/types';
import Containers from '@voguish/module-theme/components/ui/Container';
import Details from '../Details';
import ProductImageGallery, { ReactImage } from '../ProductImageGallery';
import TabPanel from '../TabPanel';

export default function Detail({ product }: { product: ProductItemInterface }) {
  let images: ReactImage[] = product?.media_gallery?.map(
    (image: MediaGallery) => ({
      original: image.url || PLACEHOLDER_IMG,
      thumbnail: image?.url,
      originalAlt: product?.name,
      thumbnailAlt: product?.name,
      originalTitle: product?.name,
      originalWidth: 350,
      originalHeight: 330,
      thumbnailHeight: 144,
      thumbnailWidth: 144,
    })
  ) || [
    {
      original: product?.image?.url || PLACEHOLDER_IMG,
      thumbnail: product?.image?.url,
      originalAlt: product?.name,
      thumbnailAlt: product?.name,
      originalTitle: product?.name,
      originalWidth: 350,
      originalHeight: 330,
      thumbnailHeight: 144,
      thumbnailWidth: 144,
    },
  ];
  return (
    <Containers className="-sm:px-2">
      {isValidObject(product) ? (
        <>
          <Grid className="grid justify-center w-full mb-14 scroll-smooth -lg:gap-8 lg:grid-cols-12 lg:gap-x-20 xl:gap-x-24 lg:justify-between">
            <Grid className="lg:col-span-6 mt-[-10px] scroll-smooth max-w-[95vw] max-w-[95dvw]">
              <div className="lg:sticky top-24 scroll-smooth">
                <ProductImageGallery images={images} name={product?.name} />
              </div>
            </Grid>

            <Details product={product} />
          </Grid>
          <TabPanel product={product} />
        </>
      ) : (
        t`No Product Found`
      )}
    </Containers>
  );
}
