import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { ButtonMui } from '@voguish/module-theme/components/ui/ButtonMui';
import { useTranslation } from 'next-i18next';
const FormActions = ({
  handlePrev,
  process = false,
  initialStep = false,
  stepLabel,
}: {
  process?: boolean;
  handlePrev: () => void;
  stepLabel?: string;
  initialStep?: boolean;
}) => {
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      <Grid className="flex items-center justify-between w-full mt-6">
        <Button
          onClick={handlePrev}
          className="flex px-1 space-x-3 font-normal tracking-widest"
          sx={{ color: '#2C3145', padding: 0.5, minWidth: 0 }}
        >
          <ArrowBack className="text-[16px] rtl:rotate-180 rounded-full" />
          <span>
            {initialStep
              ? t('Go To Cart')
              : stepLabel || t('Go to Previous Step')}
          </span>
        </Button>

        <ButtonMui
          isLoading={process}
          variant="contained"
          className="px-8 py-2.5 rounded-none shadow-none"
          type="submit"
        >
          {t('Next')}
        </ButtonMui>
      </Grid>
    </ErrorBoundary>
  );
};

export default FormActions;
