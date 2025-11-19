import Grid from '@mui/material/Grid';
import { SxProps } from '@mui/system';
import { ReactNode } from 'react';

export const ColumnContainer = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps;
}) => {
  return (
    <Grid component="section" paddingBottom={3.5} sx={{ ...sx }}>
      {children}
    </Grid>
  );
};
