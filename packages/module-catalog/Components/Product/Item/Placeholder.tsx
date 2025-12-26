import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

export const Placeholder = () => {
  return (
    <Card
      variant="outlined"
      className="w-full h-full grid rounded-md shadow-sm"
      sx={{ marginInline: 0.5 }}
    >
      {/* Image/Thumbnail */}
      <Skeleton
        animation="wave"
        variant="rounded"
        height={200}
        className="w-full bg-gray-300"
      />

      <CardContent className="flex flex-col gap-2 px-4 py-3">
        {/* Title */}
        <Skeleton
          animation="wave"
          variant="text"
          width="80%"
          height={28}
          className="bg-gray-300 rounded-md"
        />

        {/* Star rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              variant="circular"
              width={16}
              height={16}
              className="bg-gray-300"
            />
          ))}
        </div>

        {/* Description lines */}
        <Skeleton
          animation="wave"
          variant="text"
          width="90%"
          height={24}
          className="bg-gray-300 rounded-md"
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="70%"
          height={24}
          className="bg-gray-300 rounded-md"
        />

        {/* Price/Tag */}
        <Skeleton
          animation="wave"
          variant="rounded"
          width={80}
          height={24}
          className="bg-gray-300 mt-2 rounded-md"
        />
      </CardContent>
    </Card>
  );
};

export default Placeholder;

export const ProductCardPlaceholder = () => {
  return (
    <div className=" w-full  max-w-xs rounded-lg border border-gray-200 border-solid bg-white p-4 ">
      <div className="w-full shimmer h-48 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-5 w-3/4 shimmer bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-full shimmer bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-5/6 shimmer bg-gray-300 rounded mb-3"></div>
      <div className="flex gap-1.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
        ))}
      </div>
      <div className="h-6 w-1/3 bg-gray-300 shimmer rounded"></div>
    </div>
  );
};
