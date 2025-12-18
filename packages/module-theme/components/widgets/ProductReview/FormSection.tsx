import { circularProgressClasses } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AUTHORIZED, FEEDS_FRACTION } from '@utils/Constants';
import { ProductReviewRatingMetadata } from '@voguish/module-catalog/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '../../ErrorBoundary';
import { ProductReviewForm } from './ProductReviewForm';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
interface FormProp {
  sku: string;
  reviewSummary: number;
  reviewCount: number;
  ratingsFields: ProductReviewRatingMetadata[];
  productName: string;
}
const CircularProgress = dynamic(
  () => import('@mui/material/CircularProgress')
);
const StarRoundedIcon = dynamic(
  () => import('@mui/icons-material/StarRounded')
);

export default function FormSection({
  productName,
  reviewCount,
  reviewSummary,
  ratingsFields,
  sku,
}: FormProp) {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  const openForm = () => {
    setOpen(!open);
  };
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      <Stack direction="row" columnGap="2rem" className="pb-8">
        <Stack>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              size={120}
              sx={{
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
              }}
              variant="determinate"
              value={reviewSummary}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarRoundedIcon
                sx={{ fontSize: '3.875rem', color: '#FFC930' }}
              />
            </Box>
          </Box>
        </Stack>
        <Stack justifyContent="flex-end">
          <Typography
            variant="body1"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {((reviewSummary || 0) / FEEDS_FRACTION).toFixed(1)}
            &nbsp; {t('out of 5')}
          </Typography>
          <Typography pt="0.25rem" pb="0.5rem" variant="body2">
            {t('Based on')} {reviewCount} {t('reviews')}
          </Typography>

          <Button
            className=" rounded-[unset] -md:max-w-fit px-3 -md:py-3.5 py-3 gap-3 flex items-center w-full border-secondary text-secondary font-semibold"
            variant="outlined"
            onClick={() =>
              status === AUTHORIZED
                ? openForm()
                : Router.push('/customer/account/login')
            }
          >
            {t('Add your review')}
          </Button>
          <ProductReviewForm
            ratingsFields={ratingsFields}
            sku={sku}
            productName={productName}
            openForm={openForm}
            open={open}
          />
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
}
