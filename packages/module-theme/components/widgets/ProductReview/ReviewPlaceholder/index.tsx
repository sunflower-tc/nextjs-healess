import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

export default function Index() {
  return (
    <Grid className="flex flex-col-reverse justify-between md:flex-row border-neutral-800">
      <Grid gap={2} className="w-full md:w-2/3" maxHeight={900}>
        <Stack>
          <Skeleton animation="wave" height={30} width={300} />
          <Skeleton animation="wave" height={20} width={300} />
          <Skeleton animation="wave" height={20} width={300} />
        </Stack>
        <Stack>
          <Skeleton animation="wave" height={30} width={300} />
          <Skeleton animation="wave" height={20} width={300} />
          <Skeleton animation="wave" height={20} width={300} />
        </Stack>
        <Stack>
          <Skeleton animation="wave" height={30} width={300} />
          <Skeleton animation="wave" height={20} width={300} />
          <Skeleton animation="wave" height={20} width={300} />
        </Stack>
        <Skeleton animation="wave" height={50} width={100} />
      </Grid>

      <Grid sx={{ width: 345, m: 2 }}>
        <Skeleton animation="wave" height={20} width={300} />
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={60}
              height={60}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={30} width={300} />
            <Skeleton animation="wave" height={20} width={300} />
            <Skeleton animation="wave" height={20} width={300} />
          </React.Fragment>
        </CardContent>
      </Grid>
    </Grid>
  );
}
