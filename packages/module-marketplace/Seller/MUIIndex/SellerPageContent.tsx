import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
const MPFeatures = dynamic(() => import('./MPFeatures'));
const SellerPageContent = ({
  label,
  aboutImage,
}: {
  label: string;
  aboutImage: string;
}) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          className="py-[4rem] text-[1.375rem] leading-6"
          variant="h2"
          component="h5"
          fontWeight="fontWeightBold"
        >
          {label}
        </Typography>

        <span
          className="w-full min-w-full"
          dangerouslySetInnerHTML={{
            __html: aboutImage,
          }}
        ></span>

        {aboutImage === '' && <MPFeatures />}
      </Box>
    </>
  );
};
export default SellerPageContent;
