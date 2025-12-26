import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
const Clear = dynamic(() => import('@mui/icons-material/Clear'));

export default function FilterDrawer({
  toggleDrawer,
  filterOpen,
  filter,
}: {
  filter?: ReactElement<any, any>;
  removeFilter?: any;
  toggleDrawer: (open: boolean) => () => void;
  filterOpen: { right: boolean };
}) {
  const { t } = useTranslation('common');
  const list = () => (
    <Box
      sx={{
        width: '90vw',
        position: 'relative',
      }}
      role="presentation"
    >
      <Button
        sx={{ paddingX: 0, minWidth: 0 }}
        onClick={toggleDrawer(false)}
        className="w-10 flex max-w-fit rtl:mr-auto  mb-1 pl-6 h-5 pt-5 px-0 m-1.5 rounded-full"
      >
        <Clear />
      </Button>
      <Grid className="py-4">
        <Grid className="flex px-8 justify-between pb-3.5 items-center">
          <Typography className="text-xl font-semibold">
            {t('Filter')}
          </Typography>
        </Grid>
        {filter}
      </Grid>
    </Box>
  );

  return (
    <ErrorBoundary>
      <SwipeableDrawer
        className="lg:hidden"
        anchor="right"
        open={filterOpen['right']}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </ErrorBoundary>
  );
}
