import dynamic from 'next/dynamic';

const CircularProgress = dynamic(
  () => import('@mui/material/CircularProgress')
);

export default function Loader() {
  return (
    <div className="h-screen w-screen z-[999] bg-white/50 flex justify-center items-center">
      <CircularProgress className="text-brand/80" />
    </div>
  );
}
