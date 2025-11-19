import Skeleton from '@mui/material/Skeleton';

export function PromtionPlaceHolder() {
  return (
    <div className="grid md:gap-2 md:grid-cols-2">
      <Skeleton
        animation="wave"
        sx={{ height: { xs: 290, md: 600 }, marginBlock: 0, paddingBlock: 0 }}
        className="flex items-start -mt-20 md:-my-36"
      />
      <div className="grid md:gap-2 md:-my-[4.2rem]">
        <Skeleton
          animation="wave"
          sx={{ marginBlock: 0, paddingBlock: 0 }}
          height={290}
          className="flex items-start -md:-mt-28"
        />
        <Skeleton
          animation="wave"
          sx={{ marginBlock: 0, paddingBlock: 0 }}
          height={290}
          className="flex items-start -md:-mt-28 md:-mt-32"
        />
      </div>
    </div>
  );
}
