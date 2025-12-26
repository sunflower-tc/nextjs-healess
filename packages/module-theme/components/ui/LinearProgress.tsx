import { useTranslation } from 'react-i18next';

import { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import ErrorBoundary from '../ErrorBoundary';

const LinearProgress = dynamic(() => import('@mui/material/LinearProgress'));

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: '0.375rem',
  width: '100%',
  maxWidth: '9.75rem',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#EBEBED',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#DCAC00',
  },
}));

export default function LinearProgressbar({
  value,
  type,
  count,
}: {
  value: number;
  type?: number;
  count?: number;
}) {
  const { t } = useTranslation('common');
  return (
    <ErrorBoundary>
      <div className="th-flex th-items-center th-justify-between md:th-justify-start th-gap-6 th-w-full">
        {type && (
          <Typography
            variant="caption"
            className={` th-leading-normal th-hidden md:th-flex th-font-semibold  ${
              value === 0 ? 'th-text-green-500/30' : 'th-text-green-500'
            }`}
          >
            {t(`${type} stars`)}
          </Typography>
        )}
        <BorderLinearProgress
          aria-label={`progress ${value} star rating`}
          variant="determinate"
          className="th-w-full"
          value={value}
        />
        {count !== null && (
          <Typography
            variant="overline"
            className={` th-leading-normal th-font-medium ${
              value === 0 ? 'th-text-green-500/30' : 'th-text-green-500'
            }`}
          >
            {t(`
            ${count} reviews
          `)}
          </Typography>
        )}
      </div>
    </ErrorBoundary>
  );
}
