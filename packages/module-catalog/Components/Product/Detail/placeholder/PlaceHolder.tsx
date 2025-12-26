import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const PlaceHolder = () => {
  return (
    <Stack gap={1} maxHeight={800}>
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
    </Stack>
  );
};

export const LayeredPlaceHolder = () => {
  return (
    <>
      <div className="flex flex-col gap-3 max-h-[800px] animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-6 w-1/3 bg-gray-300 rounded" />
          <div className="h-6 w-10 bg-gray-300 rounded" />
        </div>
        <div className="h-6 w-2/3 bg-gray-300 rounded" />
        <div className="h-6 w-1/2 bg-gray-300 rounded" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-6 w-1/3 bg-gray-300 rounded" />
          <div className="h-6 w-1/3 bg-gray-300 rounded" />
        </div>
        <div className="h-6 w-full bg-gray-300 rounded" />
        <div className="h-6 w-full bg-gray-300 rounded" />
      </div>

      <div className="flex flex-col gap-3 mt-5 max-h-[800px] animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-6 w-1/3 bg-gray-300 rounded" />
          <div className="h-6 w-10 bg-gray-300 rounded" />
        </div>
        <div className="h-6 w-2/3 bg-gray-300 rounded" />
        <div className="h-6 w-1/2 bg-gray-300 rounded" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-6 w-1/3 bg-gray-300 rounded" />
          <div className="h-6 w-1/3 bg-gray-300 rounded" />
        </div>
        <div className="h-6 w-full bg-gray-300 rounded" />
        <div className="h-6 w-full bg-gray-300 rounded" />
      </div>
    </>
  );
};
export const MobilePlaceHolder = () => {
  return (
    <div className="flex flex-col gap-2 max-h-[150px] animate-pulse">
      <div className="h-[100px] w-full bg-gray-300 rounded" />
    </div>
  );
};

export const FilterSidebarSkeleton = () => {
  return (
    <div className="w-full px-2 space-y-6 animate-pulse">
      {/* Top section */}
      <div className="flex justify-between items-center">
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
        <div className="h-6 w-10 bg-gray-300 rounded" />
      </div>
      <div className="h-6 w-2/3 bg-gray-300 rounded" />
      <div className="h-6 w-1/2 bg-gray-300 rounded" />
      <div className="flex items-center justify-between mt-2">
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
      </div>

      {/* Slider */}
      <div className="flex items-center justify-between px-1 mt-4">
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
        <div className="h-1 w-full bg-gray-300 rounded" />
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
      </div>

      {/* Filter section 1 */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-1/4 bg-gray-300 rounded" />
          <div className="h-6 w-6 bg-gray-300 rounded" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="h-6 w-2/3 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* Filter section 2 */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-1/4 bg-gray-300 rounded" />
          <div className="h-6 w-6 bg-gray-300 rounded" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="h-6 w-2/3 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
