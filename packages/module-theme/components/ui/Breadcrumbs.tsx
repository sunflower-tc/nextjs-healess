import { Trans } from '@lingui/macro';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { isValidArray } from '@utils/Helper';
import { HTMLRenderer, PageOptions } from '@voguish/module-theme';
import Containers from './Container';
import { Link } from './Link';
const Breadcrumb = ({ title, breadCrumbs }: PageOptions) => {
  return (
    <Containers className="mt-6">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link href="/" className="cta" underline="none">
          <Typography className="hover-underline-animation" variant="body2">
            <Trans> Home</Trans>
          </Typography>
        </Link>

        {isValidArray(breadCrumbs) ? (
          breadCrumbs?.map(({ uid, label, url }) => (
            <Link key={uid} href={`/${url}`} className="cta" underline="none">
              <Typography className="hover-underline-animation" variant="body2">
                {label}
              </Typography>
            </Link>
          ))
        ) : (
          <Typography className="capitalize" variant="body2">
            {HTMLRenderer({ htmlText: title }) || { title }}
          </Typography>
        )}
      </Breadcrumbs>
    </Containers>
  );
};
export default Breadcrumb;
