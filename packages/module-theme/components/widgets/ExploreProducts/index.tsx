import { isValidArray, isValidObject } from '@utils/Helper';
import { Placeholder } from '@voguish/module-catalog';
import { ExploreProductCarousel } from '@voguish/module-theme/types/home-page';
import { InfoTextPlaceHolder } from '../placeholders';

import { t } from '@lingui/macro';

import Slider from '@voguish/module-catalog/Components/Product/Slider';
import { TabsProp } from '@voguish/module-catalog/types';
import Tab from '@voguish/module-theme/components/widgets/Tab';
import Info from '../../elements/Info';

const ExploreProducts = ({
  products,
  homeLoading,
}: {
  products: ExploreProductCarousel;
  homeLoading: any;
}) => {
  const placeHolders = new Array(5).fill(0);
  const item =
    isValidArray(products?.topRatedProductList) &&
    isValidArray(products?.hotDealsProductList) &&
    isValidArray(products?.topSellingProductList);
  const items: TabsProp[] = [
    {
      id: 1,
      name: t`Top Deals`,
      render: () => {
        return (
          <div className="py-4">
            {isValidObject(products) && (
              <Slider
                extraClass="explore-product"
                product={products?.hotDealsProductList}
              />
            )}
          </div>
        );
      },
    },
    {
      id: 2,
      name: t`Top Rated`,
      render: () => {
        return (
          <div className="py-4">
            {' '}
            {isValidObject(products) && (
              <Slider
                product={products?.topRatedProductList}
                extraClass="explore-product"
              />
            )}
          </div>
        );
      },
    },
    {
      id: 3,
      name: t`Top Selling`,
      render: () => {
        return (
          <div className="py-4">
            {isValidObject(products) && (
              <Slider
                extraClass="explore-product"
                product={products?.topSellingProductList}
              />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {homeLoading ? (
        <>
          <InfoTextPlaceHolder extraClasses="mx-auto" />
          <>
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
          </>
        </>
      ) : (
        <div>
          {item && (
            <>
              <Info
                className="px-4 -mb-4 text-center"
                heading={products?.title}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: products?.description,
                  }}
                ></span>
              </Info>
            </>
          )}
          <Tab right={false} items={items} />
        </div>
      )}
    </div>
  );
};

export default ExploreProducts;
