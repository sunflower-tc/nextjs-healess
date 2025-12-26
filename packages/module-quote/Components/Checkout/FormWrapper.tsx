import Box from '@mui/material/Box';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { ReactNode } from 'react';

const FormWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <ErrorBoundary>
      <Box
        className={`border border-solid !border-checkoutBorder ${className}`}
        sx={{
          padding: '16px 16px 16px 16px',
          borderRadius: 1,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          ml: { xs: '0.04em', lg: '0.06em', xl: '0.08em' },
        }}
      >
        {children}
      </Box>
    </ErrorBoundary>
  );
};

export default FormWrapper;
