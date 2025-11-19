import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IMPBannerProps } from '@voguish/module-marketplace';
import { HTMLRenderer } from '@voguish/module-theme';
import Image from 'next/image';

export const SellerPageBanner = (props: IMPBannerProps) => {
  const { bannerData } = props;
  const bannerImage = bannerData?.[0]?.['image'];
  return (
    <div className="relative z-0 flex flex-col items-center xl:h-[11.563rem] sm:h-[18rem] md:h-[17.813rem] w-full overflow-hidden justify-center">
      {bannerImage && (
        <div className="z-[1]">
          <Image
            src={
              bannerImage != null
                ? bannerImage
                : '/assets/img/dummy/sellerBanner.png'
            }
            fill
            alt="image"
            className="object-fill"
          />
        </div>
      )}
      <div className="z-[1] absolute bg-darkBackground flex w-full h-[11.563rem] md:h-[17.813rem] m-auto opacity-[0.56] text-center justify-center items-center"></div>
      {bannerData && (
        <div className="w-[90%] gap-3 relative z-[2] items-center justify-center text-[white] flex flex-col md:w-3/5 md:gap-6 text-center">
          <Typography
            variant="h3"
            component="h1"
            className="my-0 -xs:text-2xl -xs:w-full"
            fontWeight="fontWeightBold"
          >
            {bannerData?.[0]?.['label']}
          </Typography>
          <Typography className="m-0 break-normal" variant="body1">
            <HTMLRenderer
              htmlText={bannerData?.[0]?.['content'] || ''}
            ></HTMLRenderer>
          </Typography>
          <Button
            className="bg-brand rounded-[unset]"
            color="primary"
            variant="contained"
            type="submit"
            sx={{
              px: { md: 4, sm: 4, xs: 1.5 },
              py: { md: 1.5, sm: 1.5, xs: 1.125 },
              textTransform: 'capitalize',
            }}
            href="/customer/account/create/"
          >
            {bannerData?.[0]?.['label']}
          </Button>
        </div>
      )}
    </div>
  );
};
