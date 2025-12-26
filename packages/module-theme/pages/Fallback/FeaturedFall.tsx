import Placeholder from '@voguish/module-catalog/Components/Product/Item/Placeholder';
import Containers from '@voguish/module-theme/components/ui/Container';
import { InfoTextPlaceHolder } from '@voguish/module-theme/components/widgets/placeholders/InfoTextPlaceHolder';

export default function FeaturedFall() {
  return (
    <Containers className="w-full">
      <InfoTextPlaceHolder extraClasses="mx-auto" />{' '}
      <div className="2xl:max-w-[90rem] mx-auto">
        <div className="mt-4">
          <div className="hidden gap-3 md:flex">
            {new Array(4).fill(0).map((item, index) => (
              <div className="w-[25%]" key={`${index + item}`}>
                <Placeholder />
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <Placeholder />
          </div>
        </div>
      </div>
    </Containers>
  );
}

export function RecentFall() {
  return (
    <Containers className="grid w-full">
      <InfoTextPlaceHolder extraClasses="mx-auto" />{' '}
      <div className="2xl:max-w-[90rem] w-full mx-auto">
        <div className="w-full mt-4">
          <div className="hidden gap-3 md:flex">
            {new Array(4).fill(0).map((item, index) => (
              <div className="w-[25%]" key={`${index + item}`}>
                <Placeholder />
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <Placeholder />
          </div>
        </div>
      </div>
    </Containers>
  );
}

export function ExploreFall() {
  return (
    <Containers className="w-full">
      <InfoTextPlaceHolder extraClasses="mx-auto" />{' '}
      <div className="flex items-center w-full h-8 mt-6 mb-2 bg-gray-300 rounded-md max-w-[98%] mx-auto animate-pulse" />
      <div className="2xl:max-w-[90rem] mx-auto">
        <div className="mt-4">
          <div className="hidden gap-3 md:flex">
            {new Array(4).fill(0).map((item, index) => (
              <div className="w-[25%]" key={`${index + item}`}>
                <Placeholder />
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <Placeholder />
          </div>
        </div>
      </div>
    </Containers>
  );
}
