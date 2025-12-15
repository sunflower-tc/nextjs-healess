import dynamic from 'next/dynamic';

const CircularProgress = dynamic(
  () => import('@mui/material/CircularProgress')
);

export default function BackDropLoader() {
  return (
    <div className="h-screen w-screen z-[999] fixed  top-0 left-0 bg-black/50 flex justify-center items-center">
      <CircularProgress className="text-brand/80" />
    </div>
  );
}
