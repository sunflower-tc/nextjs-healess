import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
export const Placeholder = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Skeleton
        sx={{ m: -5.45, position: 'relative', zIndex: 0 }}
        animation="wave"
        height={198}
      />
      <Skeleton
        sx={{ ml: 0.75, mt: -3.75, position: 'absolute', zIndex: 1 }}
        width={69}
        animation="wave"
        variant="rounded"
        height={69}
      />

      <CardContent
        sx={{ '&:last-child': { pb: 0.75 }, flexGrow: 1, p: 0.5, mt: 5 }}
      >
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ fontSize: '1.25rem' }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ mt: 0.5, fontSize: '1.25rem' }}
        />
      </CardContent>
    </Card>
  );
};
