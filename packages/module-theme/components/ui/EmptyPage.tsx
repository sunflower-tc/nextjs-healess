import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { EmptyPageIcon } from '@voguish/module-theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function EmptyPage() {
  const route = useRouter();
  const onClick = (e: any) => {
    e.preventDefault();
    route.back();
  };
  return (
    <div className="relative flex flex-col items-center justify-center h-screen max-w-2xl mx-auto mt-28">
      <div className="h-full gap-4 py-10 mx-auto text-center ">
        <EmptyPageIcon />
        <span className="grid py-6">
          <Typography variant="ErrorHeading" className="-xs:text-lg">
            <Trans>Oops! There are no products here.</Trans>
          </Typography>
          <Typography variant="ErrorSubHeading" className="-xs:text-base">
            <Trans>Please discover new products here.</Trans>
          </Typography>
        </span>
        <Link href="/" className="w-[85%]">
          <Button
            variant="contained"
            className="w-full py-4 rounded-none shadow-none"
            type="submit"
          >
            <Trans>Go To Home</Trans>
          </Button>
        </Link>
      </div>
    </div>
  );
}
