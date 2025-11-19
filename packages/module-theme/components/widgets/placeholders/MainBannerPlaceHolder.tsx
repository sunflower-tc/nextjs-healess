import Skeleton from '@mui/material/Skeleton';

export function MainBannerPlaceHolder() {
  return (
    <Skeleton
      animation="wave"
      sx={{ marginBlock: 0, paddingBlock: 0 }}
      className="flex h-[60vh] h-[60dvh] items-start my-[3rem]"
    />
  );
}
