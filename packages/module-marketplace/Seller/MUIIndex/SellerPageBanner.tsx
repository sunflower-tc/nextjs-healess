import Button from '@mui/material/Button';
import Typography from '@mui/material/Stack';
import { PLACEHOLDER_IMG } from '@utils/Constants';
import { HTMLRenderer } from '@voguish/module-theme';
import { useRouter } from 'next/router';

const SellerPageBanner = (props: any) => {
  const router = useRouter();
  const { bannerData } = props;
  const content = bannerData?.banner?.[0]?.['content'];
  const bannerImage = bannerData?.banner?.[0]?.['image'];

  return (
    <div
      className="relative !bg-no-repeat !bg-cover !bg-center bg-blend-darken"
      style={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        background: `url(${
          bannerImage != null
            ? bannerImage
            : '/assets/img/dummy/sellerBanner.png' || PLACEHOLDER_IMG
        })`,
      }}
    >
      {' '}
      <div className="h-full py-[2.81rem] bg-[rgba(8,_28,_60,_0.56)]">
        <div className="max-w-3xl px-6 mx-auto text-center text-white md:px-12">
          {props.theme == true && (
            <Typography
              component="h1"
              fontWeight="fontWeightBold"
              textTransform="capitalize"
              className="my-0 mb-3.5 md:mb-7 leading-[3.75rem]"
              fontSize={{ xs: 24, sm: 29, md: 39, lg: 50 }}
            >
              <HTMLRenderer
                htmlText={bannerData?.layoutOne?.marketplacelabel1}
              ></HTMLRenderer>
            </Typography>
          )}
          {props.theme == true ? (
            <Typography className="my-0 break-normal" component="div">
              <HTMLRenderer htmlText={content}></HTMLRenderer>
            </Typography>
          ) : (
            <Typography
              className="!m-0 leading-5 break-normal"
              component="div"
              fontSize={{ xs: 12, sm: 14, md: 15, lg: 16 }}
            >
              <HTMLRenderer
                className="[&>p]:!text-[0.75rem] [&>p]:sm:!text-[0.875rem] [&>p]:md:!text-[0.9375rem] [&>p]:lg:!text-[1rem]"
                htmlText={content}
              ></HTMLRenderer>
            </Typography>
          )}
          {bannerData?.banner?.[0]?.['label'] && (
            <Button
              color="primary"
              variant="contained"
              type="submit"
              className="py-3 mt-3 text-base font-semibold leading-normal rounded-none px-7"
              onClick={() => router.push('/customer/account/create')}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: bannerData?.banner?.[0]?.['label'],
                }}
              ></span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default SellerPageBanner;
