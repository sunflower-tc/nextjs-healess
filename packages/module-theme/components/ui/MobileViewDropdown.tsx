import { TabsProp } from '@voguish/module-catalog/types';
import ErrorBoundary from '../ErrorBoundary';

interface CardProps {
  item: TabsProp;
  extraClass?: string;
}

export default function DropdownsCard({ extraClass = '', item }: CardProps) {
  return (
    <ErrorBoundary>
      <div className="!overflow-x-hidden">
        <details
          className={`group cursor-pointer w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-0 sm:px-6 lg:px-8 mx-auto ${extraClass}`}
          open
        >
          <summary className="flex items-center border-l-0 border-r-0 border-t-0 justify-between py-3 border-b border-solid border-b-gray-100 text-base sm:text-lg md:text-xl font-semibold border-b border-gray-300 hover:text-black transition-colors duration-200">
            {item.name}
          </summary>
          <div className="w-full  pt-2 transition-all duration-500 ease-in-out transform opacity-0 group-open:opacity-100 group-open:translate-y-1">
            <div className="w-full !overflow-hidden">{item.render()}</div>
          </div>
        </details>
      </div>
    </ErrorBoundary>
  );
}
