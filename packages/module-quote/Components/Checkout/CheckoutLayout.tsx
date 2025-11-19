import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';

/**
 * ICheckoutLayout Interface
 */
export interface ICheckoutLayout {
  children: React.ReactNode;
}

/**
 * Checkout Layout
 * @param options ICheckoutLayout
 * @returns
 */
export const CheckoutLayout = ({ children }: ICheckoutLayout) => {
  return (
    <>
      <>
        <Grid component="main" mb={8}>
          <Grid item xs={false} sm={12} md={7}>
            <Box
              sx={{
                m: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {children}
            </Box>
          </Grid>
        </Grid>
      </>
    </>
  );
};
