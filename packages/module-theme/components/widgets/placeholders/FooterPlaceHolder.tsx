import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Containers from '../../ui/Container';
const placeHolders = new Array(4).fill(0);

export function FooterPlaceHolder() {
  return (
    <div className="flex items-center justify-between w-full p-2 lg:px-4 bg-neutral-100">
      <Containers>
        <span className="grid grid-cols-4 -md:grid-cols-2">
          {placeHolders.map((item, index) => (
            <Grid key={`${index + item}`} sx={{ maxWidth: 345, m: 2 }}>
              <Skeleton
                animation="wave"
                height={20}
                width={60}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={20}
                width={60}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={20}
                width={60}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={20}
                width={60}
                style={{ marginBottom: 6 }}
              />
            </Grid>
          ))}
        </span>
        <Grid className="flex items-center justify-between py-4 -xss:justify-center -3xs:grid -3xs:gap-y-4">
          <Skeleton animation="wave" width={200} height={20} />
          <span className="flex space-x-2">
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          </span>
        </Grid>
      </Containers>
    </div>
  );
}
