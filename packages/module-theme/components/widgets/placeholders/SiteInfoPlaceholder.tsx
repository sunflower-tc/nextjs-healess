import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
export function SiteInfoPlaceholder() {
  const placeHolders = new Array(4).fill(0);

  return (
    <div className="grid md:grid-cols-4">
      {placeHolders.map((item, index) => (
        <Grid
          key={`${index + item}`}
          className="flex space-x-3"
          sx={{ maxWidth: 345, m: 2 }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Grid className="flex flex-col justify-center w-full">
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="40%" />
          </Grid>
        </Grid>
      ))}
    </div>
  );
}
