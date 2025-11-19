import { TabsProp } from '@voguish/module-catalog/types';

interface CardProps {
  item: TabsProp;
  extraClass?: string;
}
export default function DropdownsCard({ extraClass, item }: CardProps) {
  return (
    <details
      className={`${extraClass} group outline-none cursor-pointer -sm:max-w-[98vw] w-full mx-auto -sm:px-1.5`}
      open
    >
      <summary className="flex items-center justify-between py-2 font-semibold border-t-0 border-b border-solid border-x-0 border-colorBorder rotate">
        {item.name}
      </summary>

      <div className="pt-0 pb-2 -mt-4 transition duration-500 ease-in-out transform opacity-0 group-open:translate-y-2 group-open:opacity-100">
        {item.render()}
      </div>
    </details>
  );
}
