import Grid from '@mui/material/Grid';
import Containers from '../../ui/Container';
export function SiteInfoPlaceholder() {
  const placeHolders = new Array(4).fill(0);

  return (
    <Containers className="w-full">
      <div className="grid md:grid-cols-4">
        {placeHolders.map((item, index) => (
          <div
            key={`${index + item}`}
            className="flex items-center max-w-xs m-2 gap-x-3"
          >
            <div className="w-12 rounded-full animate-pulse aspect-square bg-neutral-300" />
            <Grid className="flex flex-col justify-center w-full">
              <div className="animate-pulse rounded-md aspect-square bg-neutral-300 w-[80%] h-2.5 mb-2" />

              <div className="animate-pulse rounded-md aspect-square bg-neutral-300 w-[40%] h-2.5 mb-2" />
            </Grid>
          </div>
        ))}
      </div>
    </Containers>
  );
}
