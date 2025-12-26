import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import Containers from '@voguish/module-theme/components/ui/Container';
import { ReactNode } from 'react';
/**
 * IAuthLayout Interface
 */
export interface IAuthLayout {
  banner?: string;
  height?: string;
  children: ReactNode;
  variant?: 'single' | 'side';
}

/**
 * Auth Layout
 * @param options IAuthLayout
 * @returns
 */
export const AuthLayout = ({
  banner,
  children,
  variant = 'side',
  height = '',
}: IAuthLayout) => {
  return (
    <ErrorBoundary>
      <div className="py-2.5">
        <Grid component="main">
          <Grid
            minHeight={400}
            item
            xs={12}
            className="rounded-md"
            sx={{
              display: { xs: 'block', lg: 'none' },
              backgroundImage: `url(${banner})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></Grid>
        </Grid>
        <Containers>
          <Grid container component="main">
            {variant === 'side' && (
              <Grid
                className={`rounded-md ${height}`}
                item
                xs={false}
                sm={4}
                lg={5}
                sx={{
                  display: { lg: 'block', xs: 'none' },
                  boxShadow: 0,
                  backgroundImage: `url(${banner})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light'
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></Grid>
            )}
            <Grid
              item
              xs={12}
              lg={7}
              className="relative bg-white -lg:-top-28 -lg:shadow-xl"
              borderRadius={{ boxShadow: 0, xs: 2, sm: 0 }}
            >
              <Box
                className="lg:-mt-5 -lg:py-5"
                sx={{
                  boxShadow: 0,
                  mx: 4,
                  display: 'grid',
                }}
              >
                {children}
              </Box>
            </Grid>
          </Grid>
        </Containers>
      </div>
    </ErrorBoundary>
  );
};
