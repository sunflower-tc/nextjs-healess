import { Trans, t } from '@lingui/macro';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { LoadingButtton } from '@voguish/module-theme';

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
  return (
    <Grid className="flex items-center justify-between w-full mt-6">
      <Button
        onClick={handlePrev}
        className="flex px-1 space-x-3 font-normal tracking-widest"
        sx={{ color: '#2C3145', padding: 0.5, minWidth: 0 }}
      >
        <ArrowBack className="text-[16px] rounded-full" />
        <span>
          {initialStep ? t`Go To Cart` : stepLabel || t`Go to Previous Step`}
        </span>
      </Button>
      {process ? (
        <LoadingButtton className="py-2.5 px-5 rounded-none shadow-none" />
      ) : (
        <Button
          variant="contained"
          className="px-8 py-2.5 rounded-none shadow-none"
          type="submit"
        >
          <Trans>Next</Trans>
        </Button>
      )}
    </Grid>
  );
};

export default FormActions;
