import Skeleton from '@mui/material/Skeleton';
import { InfoTextPlaceHolder } from './InfoTextPlaceHolder';

export function TestimonialPlaceHolder() {
  return (
    <>
      <InfoTextPlaceHolder />
      <div className="grid md:grid md:gap-2 md:grid-cols-2">
        <Skeleton
          animation="wave"
          sx={{ height: 600, marginBlock: 0, paddingBlock: 0 }}
          className="flex items-start -my-36"
        />
        <Skeleton
          animation="wave"
          sx={{ marginBlock: 0, paddingBlock: 0 }}
          height={600}
          className="flex items-start -md:hidden -my-36"
        />
      </div>
    </>
  );
}
