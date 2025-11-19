import { isValidArray } from '@utils/Helper';
import { Placeholder } from '@voguish/module-catalog';
import Slider from '@voguish/module-catalog/Components/Product/Slider';
import { RecentlyViewedProduct } from '@voguish/module-theme/types/home-page';
import Info from '../elements/Info';
import Containers from '../ui/Container';
import { InfoTextPlaceHolder } from './placeholders';

function RecentlyViewed({
  products,
  homeLoading,
}: {
  products: RecentlyViewedProduct;
  homeLoading: any;
}) {
  const placeHolders = new Array(5).fill(0);
  return (
    <div className="pb-4">
      {homeLoading ? (
        <Containers>
          <InfoTextPlaceHolder extraClasses="mx-auto " />
          <span className="pt-4">
            <div className="hidden md:flex">
              {placeHolders.map((item, index) => (
                <div className="w-[20%]" key={`${index + item}`}>
                  <Placeholder />
                </div>
              ))}
            </div>
            <div className=" md:hidden">
              <Placeholder />
            </div>
          </span>
        </Containers>
      ) : (
        <>
          <div className="2xl:max-w-[90rem] mx-auto">
            <div className="pl-6 pr-2 lg:px-9">
              {isValidArray(products?.productList) && (
                <Info className="!mx-2.5" heading={products?.title}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: products?.description,
                    }}
                  ></span>
                </Info>
              )}
            </div>
          </div>
          <>
            {isValidArray(products?.productList) && (
              <Slider
                extraClass="explore-product"
                product={products?.productList}
              />
            )}
          </>
        </>
      )}
    </div>
  );
}
export default RecentlyViewed;
