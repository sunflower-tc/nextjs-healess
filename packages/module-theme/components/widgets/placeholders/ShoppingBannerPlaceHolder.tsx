import Skeleton from '@mui/material/Skeleton';
import { InfoTextPlaceHolder } from './InfoTextPlaceHolder';

export function ShoppingBannerPlaceHolder() {
  return (
    <>
      <InfoTextPlaceHolder />
      <div className="grid md:grid md:gap-2 md:grid-cols-2">
        <Skeleton
          animation="wave"
          sx={{ height: 600, marginBlock: 0, paddingBlock: 0 }}
          className="flex items-start -my-36"
        />
        <div className="hidden md:grid md:gap-2 md:-my-[4.2rem]">
          <Skeleton
            animation="wave"
            height={290}
            sx={{ marginBlock: 0, paddingBlock: 0 }}
            className="flex items-start -md:-mt-28"
          />
          <div className="grid grid-cols-2 md:gap-2 md:-mt-32">
            <Skeleton
              animation="wave"
              sx={{ marginBlock: 0, paddingBlock: 0 }}
              height={290}
              className="flex items-start"
            />
            <Skeleton
              animation="wave"
              sx={{ marginBlock: 0, paddingBlock: 0 }}
              height={290}
              className="flex items-start"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default ShoppingBannerPlaceHolder;
