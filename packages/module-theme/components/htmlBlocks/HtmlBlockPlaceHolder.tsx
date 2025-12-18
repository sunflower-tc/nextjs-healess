import Placeholder from '@voguish/module-catalog/Components/Product/Item/Placeholder';

export default function HtmlBlockPlaceHolder() {
  const placeHolders = new Array(8).fill(0);

  return (
    <div className="grid gap-8 pb-6 lg:mt-7">
      <div className="w-full rounded-md h-96 lg:h-[70vh] animate-pulse bg-gray-300" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="w-full rounded-md h-96 animate-pulse bg-gray-300" />
        <div className="w-full rounded-md h-96 animate-pulse bg-gray-300" />
      </div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div className="w-full h-56 rounded-md animate-pulse bg-gray-300" />
        <div className="w-full h-56 rounded-md animate-pulse bg-gray-300" />
        <div className="w-full h-56 rounded-md animate-pulse bg-gray-300" />
      </div>
      <div className="grid w-full gap-2">
        <div className="w-1/3 h-5 rounded-md animate-pulse bg-gray-300" />
        <div className="w-full h-3.5 rounded-md animate-pulse bg-gray-300" />
        <div className="w-1/2 h-3.5 mb-4 rounded-md animate-pulse bg-gray-300" />
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          {placeHolders.map((item, index) => (
            <div key={`${index + item}`}>
              <Placeholder />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
