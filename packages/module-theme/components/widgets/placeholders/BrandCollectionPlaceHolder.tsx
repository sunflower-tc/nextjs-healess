import Skeleton from '@mui/material/Skeleton';
import { InfoTextPlaceHolder } from './InfoTextPlaceHolder';

export function BrandCollectionPlaceHolder() {
  return (
    <>
      <InfoTextPlaceHolder />
      <div className="grid md:grid md:gap-2 md:grid-cols-3">
        <Skeleton
          animation="wave"
          sx={{ height: 600, marginBlock: 0, paddingBlock: 0 }}
          className="flex items-start -my-36"
        />
        <div className="hidden md:grid md:gap-2 md:-my-[4.2rem]">
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
        <Skeleton
          animation="wave"
          sx={{ height: { xs: 290, md: 600 }, marginBlock: 0, paddingBlock: 0 }}
          className="items-start hidden -mt-20 md:flex md:-my-36"
        />
      </div>
    </>
  );
}
