import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
export function InfoTextPlaceHolder({
  extraClasses,
}: {
  extraClasses?: string;
}) {
  return (
    <Grid gap={1} maxHeight={70} maxWidth="100%">
      <Skeleton
        animation="wave"
        height={20}
        className={`flex items-center max-w-xl ${extraClasses}`}
      />
      <Skeleton
        animation="wave"
        height={20}
        className={`flex items-center max-w-3xl ${extraClasses}`}
      />
      <Skeleton
        animation="wave"
        height={20}
        className={`flex items-center max-w-3xl ${extraClasses}`}
      />
    </Grid>
  );
}
