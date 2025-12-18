import Containers from '../../ui/Container';
import { InfoTextPlaceHolder } from './InfoTextPlaceHolder';

export function ShoppingBannerPlaceHolder() {
  return (
    <Containers className="w-full">
      <div className="grid w-full gap-4">
        <InfoTextPlaceHolder />
        <div className="grid md:grid md:gap-4 md:grid-cols-12">
          <div className="flex items-start md:col-span-1 xl:col-span-4 animate-pulse h-[290px] md:h-[600px] bg-neutral-300 rounded-md" />
          <div className="hidden md:col-span-2 xl:col-span-8 md:grid md:gap-4">
            <div className="flex items-start animate-pulse h-[290px] bg-neutral-300 rounded-md" />
            <div className="grid grid-cols-2 md:gap-4">
              <div className="flex items-start animate-pulse h-[290px] bg-neutral-300 rounded-md" />
              <div className="flex items-start animate-pulse h-[290px] bg-neutral-300 rounded-md" />
            </div>
          </div>
        </div>
      </div>{' '}
    </Containers>
  );
}
