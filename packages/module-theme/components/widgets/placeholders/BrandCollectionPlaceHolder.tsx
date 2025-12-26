import Containers from '../../ui/Container';
import { InfoTextPlaceHolder } from './InfoTextPlaceHolder';

export function BrandCollectionPlaceHolder() {
  return (
    <Containers className="w-full">
      <div className="flex flex-col w-full gap-4">
        <InfoTextPlaceHolder />
        <div className="flex gap-4 overflow-x-auto md:overflow-x-hidden md:grid md:grid-cols-3">
          <div className="flex items-start animate-pulse h-[290px] md:h-[600px] bg-neutral-300 rounded-md" />
          <div className="content-between hidden md:grid md:gap-4">
            <div className="flex items-start animate-pulse h-[290px] bg-neutral-300 rounded-md" />
            <div className="flex items-start animate-pulse h-[290px] bg-neutral-300 rounded-md" />
          </div>
          <div className="flex items-start animate-pulse h-[290px] md:h-[600px] bg-neutral-300 rounded-md" />
        </div>
      </div>{' '}
    </Containers>
  );
}
