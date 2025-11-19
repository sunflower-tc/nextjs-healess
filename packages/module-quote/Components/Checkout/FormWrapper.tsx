import Box from '@mui/material/Box';
import { ReactNode } from 'react';

const FormWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
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
  );
};

export default FormWrapper;
