import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

export const WishlistPlaceholder = () => {
  return (
    <div className="w-full py-6">
      {/* Title Skeleton */}
      <div className="w-48 h-8 mb-6 rounded bg-slate-300 animate-pulse" />

      {/* Card Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="w-full p-4 bg-white border rounded-lg shadow-sm b-slate-300 animate-pulse"
          >
            <div className="w-2/3 h-5 mb-2 rounded bg-slate-300" />
            <div className="w-1/3 h-4 mb-1 rounded bg-slate-300" />
            <div className="w-full h-4 mb-3 rounded bg-slate-300" />
            <div className="w-3/4 h-3 mb-1 rounded bg-slate-300" />
            <div className="w-24 h-8 mt-3 rounded bg-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CategorySearchPlaceHolder = () => {
  return (
    <div className="w-full bg-white border rounded-lg shadow-sm b-slate-300 animate-pulse">
      <div className="w-2/3 h-5 mb-2 rounded bg-slate-300" />
      <div className="w-1/3 h-4 mb-1 rounded bg-slate-300" />
      <div className="w-full h-4 mb-3 rounded bg-slate-300" />
      <div className="w-3/4 h-3 mb-1 rounded bg-slate-300" />
    </div>
  );
};

import Containers from '@voguish/module-theme/components/ui/Container';
export const Placeholder = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Skeleton
        sx={{ m: -5.45, position: 'relative', zIndex: 0 }}
        animation="wave"
        height={198}
      />
      <Skeleton
        sx={{ ml: 0.75, mt: -3.75, position: 'absolute', zIndex: 1 }}
        width={69}
        animation="wave"
        variant="rounded"
        height={69}
      />

      <CardContent
        sx={{ '&:last-child': { pb: 0.75 }, flexGrow: 1, p: 0.5, mt: 5 }}
      >
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ fontSize: '1.25rem' }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ mt: 0.5, fontSize: '1.25rem' }}
        />
      </CardContent>
    </Card>
  );
};

export const LogoSkeleton = ({ className = '' }) => {
  return (
    <div role="status" className=" animate-pulse">
      <div className={`h-7 bg-gray-200 rounded-lg w-24 ${className}`}></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SelectorPlaceHolder = () => {
  return (
    <div className="grid gap-4 animate-pulse">
      <div className="space-y-2">
        <div className="w-24 h-4 bg-gray-200 rounded" /> {/* Label */}
        <div className="w-full h-10 bg-gray-300 rounded" />{' '}
        {/* Dropdown Skeleton */}
      </div>
      <div className="space-y-2">
        <div className="w-24 h-4 bg-gray-200 rounded" />
        <div className="w-full h-10 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export const CheckoutCartPlaceholder = () => {
  return (
    <Containers>
      <div className="py-6 space-y-8 animate-pulse">
        <div className="w-1/3 h-6 bg-gray-300 rounded" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-4">
              <div className="w-1/4 h-5 bg-gray-300 rounded" />
              <div className="space-y-3">
                <div className="w-full h-10 bg-gray-200 rounded" />
                <div className="w-full h-10 bg-gray-200 rounded" />
                <div className="w-full h-10 bg-gray-200 rounded" />
                <div className="w-full h-10 bg-gray-200 rounded" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-1/4 h-5 bg-gray-300 rounded" />
              <div className="space-y-3">
                <div className="w-full h-10 bg-gray-200 rounded" />
                <div className="w-full h-10 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-1/3 h-5 bg-gray-300 rounded" />
            <div className="space-y-3">
              <div className="w-full h-16 bg-gray-200 rounded" />
              <div className="w-full h-16 bg-gray-200 rounded" />
              <div className="w-full h-16 bg-gray-200 rounded" />
            </div>
            <div className="w-full h-10 mt-6 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </Containers>
  );
};

export const ProductComparisonPlaceholder = () => {
  const products = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-white rounded-xl">
      <div className="mx-auto overflow-x-auto ">
        <table className="min-w-full border border-gray-200 animate-pulse">
          <thead>
            <tr>
              {products.map((_, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-center bg-gray-100 border rounded-md"
                >
                  <div className="w-32 h-40 mx-auto mb-2 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-4 mx-auto mb-1 bg-gray-300 rounded"></div>
                  <div className="w-1/2 h-4 mx-auto bg-gray-300 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              'Price',
              'Brand',
              'Rating',
              'Feature 1',
              'Feature 2',
              'Feature 3',
            ].map((feature, rowIdx) => (
              <tr key={rowIdx}>
                {products.map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 border">
                    <div className="w-2/3 h-3 mx-auto bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              {products.map((_, index) => (
                <td key={index} className="px-4 py-4 border">
                  <div className="w-3/4 h-10 mx-auto bg-gray-300 rounded"></div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const CartItemSkeleton = () => {
  return (
    <div className="animate-pulse flex gap-4 p-5 border-t border-commonBorder">
      <div className="w-20 h-20 bg-gray-200 rounded-md" />
      <div className="flex-1 space-y-3">
        <div className="w-3/4 h-4 bg-gray-200 rounded" />
        <div className="w-1/2 h-4 bg-gray-200 rounded" />
        <div className="w-1/3 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default function CardsPlaceholder() {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="w-full h-16 border rounded-lg bg-slate-300 animate-pulse" />
      <div className="w-full h-16 border rounded-lg bg-slate-300 animate-pulse" />
      <div className="w-full h-16 border rounded-lg bg-slate-300 animate-pulse" />
    </div>
  );
}

export const CheckoutSkeleton = () => {
  return (
    <Containers>
      <div className="bg-white ">
        <div className=" animate-pulse">
          <div className="grid grid-cols-1 gap-8  lg:grid-cols-3">
            {/* 🛒 Left Side: Cart Items */}
            <div className="space-y-6 lg:col-span-2">
              {/* Section Title */}
              <div className="w-40 h-6 bg-gray-200 rounded" />

              {/* Cart Item Skeletons */}
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border rounded-md"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-200 rounded" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded" />
                  </div>
                  <div className="w-12 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>

            {/* 🧾 Right Side: Order Summary */}
            <div className="space-y-4">
              {/* Summary Title */}
              <div className="w-32 h-6 bg-gray-200 rounded" />

              <div className="p-6 space-y-4 border rounded-md">
                <div className="flex justify-between">
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                  <div className="w-12 h-4 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="w-20 h-4 bg-gray-200 rounded" />
                  <div className="w-10 h-4 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-28" />
                  <div className="w-16 h-4 bg-gray-300 rounded" />
                </div>
                <div className="w-full h-10 mt-4 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Containers>
  );
};

export const PaymentPlaceholder = () => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-pulse">
      <div className="h-14 bg-gray-300 rounded-lg" />
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
        <div className="flex-1 h-14 bg-gray-300 rounded-lg" />
        <div className="flex-1 h-14 bg-gray-300 rounded-lg" />
      </div>
      <div className="h-14 bg-gray-300 rounded-lg" />
      <div className="w-full h-14 bg-gray-300 rounded-lg my-4" />
      <div className="w-36 h-14 bg-gray-300 rounded-lg my-6" />
    </div>
  );
};
