import Typography from '@mui/material/Typography';
import { MPSellerData } from '@utils/SellerData';
import Image from 'next/image';

export const SellerPageContent = ({
  label,
}: {
  label?: string | undefined | null;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-7 -sm:gap-6">
      {label && label.includes('Why to sell with us') && (
        <Typography variant="h5" fontWeight="fontWeightBold">
          {label}
        </Typography>
      )}
      {MPSellerData.map((data, index) => (
        <div
          key={index}
          className={`relative flex odd:flex-row-reverse -sm:odd:flex-col gap-8 px-0 py-3  -sm:flex-col -sm:gap-4 -sm:p-0 ${
            index + 1
          }`}
        >
          <div className="relative h-[19.813rem] w-[25.375rem] -sm:h-[15.625rem] -sm:w-full -sm:mx-auto">
            <Image src={data.image} fill alt="contentImage" />
          </div>

          <div className="flex-col flex-1 p-4 -sm:p-0">
            <Typography
              variant="subtitle1"
              lineHeight="1rem"
              component="span"
              fontWeight="600"
            >
              {data.contentTitle}
            </Typography>
            <Typography className="pt-6 text-justify -sm:pt-2" variant="body1">
              {data.content}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};
