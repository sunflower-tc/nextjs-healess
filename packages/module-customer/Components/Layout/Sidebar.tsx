import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomerAccountData from '@utils/CustomerAccountData';
import { useToken } from '@voguish/module-customer/hooks';
import Containers from '@voguish/module-theme/components/ui/Container';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Logout } from 'store';
const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const tabs = [
    { id: 0, name: 'Overview', route: '/customer/account' },
    { id: 1, name: 'Order', route: '/sales/order/history' },
    { id: 2, name: 'Profile', route: '/customer/account/profile' },
    { id: 3, name: 'Address', route: '/customer/account/address' },
    {
      id: 4,
      name: 'Reset Password',
      route: '/customer/account/reset-password',
    },
  ];
  const token = useToken();
  !token && router.push('/customer/account/login');
  return (
    <Containers className="-mt-2">
      <Grid container sx={{ mb: 3 }}>
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography variant="h2">{CustomerAccountData.title}</Typography>
        </Grid>
      </Grid>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={3} sx={{ pr: { md: 2 } }}>
          <Grid container>
            {tabs.map((items) => (
              <Grid
                key={items.id}
                component={Link}
                href={items.route}
                xs={12}
                sx={{
                  maxWidth: '100% !important',
                  borderRadius: 1,
                  borderColor:
                    router.pathname === items.route ? '#24ab85' : '#e0e0e0',
                  color: router.pathname === items.route ? '#24ab85' : '',
                  background: router.pathname === items.route ? '#F8F8F8' : '',
                  mb: 1,
                  p: 2,
                  '&:hover': {
                    borderColor: '#24ab85',
                    color: '#24ab85',
                    background: '#F8F8F8',
                  },
                }}
                item
              >
                <Typography variant="body1">{items.name}</Typography>
              </Grid>
            ))}
            <Grid item className="mx-3 my-4">
              <Button
                className="w-32 py-2 rounded-[unset] text-darkGreyBackground border  border-solid duration-200 border-darkGreyBackground hover:border-brand"
                variant="outlined"
                onClick={Logout}
              >
                <Trans>Sign out</Trans>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className="w-full"
          item
          xs={12}
          md={9}
          sx={{
            borderLeft: { md: 2.5 },
            borderColor: { md: '#ececec' },
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Containers>
  );
};
export default Sidebar;
