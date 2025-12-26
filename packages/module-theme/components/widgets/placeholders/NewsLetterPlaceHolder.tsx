import { Skeleton } from '@mui/material';
import { InfoTextPlaceHolder } from './InfoTextPlaceHolder';

export function NewsLetterPlaceHolder() {
  return (
    <>
      <InfoTextPlaceHolder extraClasses="mx-auto" />
      <Skeleton animation="wave" className="mx-auto" width={400} height={80} />
    </>
  );
}
