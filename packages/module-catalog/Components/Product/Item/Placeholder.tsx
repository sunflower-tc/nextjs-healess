import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
export const Placeholder = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        marginInline: 0.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Skeleton animation="wave" variant="rounded" height={248} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton animation="wave" variant="text" sx={{ fontSize: '3rem' }} />

        <Skeleton
          sx={{ mt: 1 }}
          animation="wave"
          variant="rounded"
          height={24}
        />
        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
      </CardContent>
    </Card>
  );
};
