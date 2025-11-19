import Skeleton from '@mui/material/Skeleton';
import Containers from '@voguish/module-theme/components/ui/Container';
export const OrderviewPlaceholder = () => {
  return (
    <Containers>
      <div className="grid grid-rows-4">
        <div>
          <Skeleton
            variant="rounded"
            width="30%"
            sx={{ my: 1, py: 1 }}
            animation="pulse"
          />
        </div>
        <div>
          <Skeleton
            variant="rounded"
            width="40%"
            sx={{ py: 1 }}
            animation="pulse"
          />
        </div>
      </div>
      <div className="grid grid-rows-1">
        <Skeleton
          variant="rounded"
          sx={{ py: 3, m: 1 }}
          width="100%"
          animation="pulse"
        />
        <Skeleton
          variant="rounded"
          sx={{ py: 3, m: 1 }}
          width="100%"
          animation="pulse"
        />
      </div>
      <div>
        <div className="flex justify-end w-full">
          <Skeleton
            variant="rounded"
            width="30%"
            sx={{ my: 1, py: 3 }}
            animation="pulse"
          />
        </div>
        <div className="flex justify-end w-full">
          <Skeleton
            variant="rounded"
            width="30%"
            sx={{ my: 1, py: 3 }}
            animation="pulse"
          />
        </div>
      </div>
    </Containers>
  );
};
