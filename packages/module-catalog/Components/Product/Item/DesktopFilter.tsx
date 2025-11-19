import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TopSortPlaceHolder } from '../LayerNavigation';
import Toolbar from '../Toolbar';
type DesktopFilterTypes = {
  loading?: boolean | any;
  title?: string[] | any;
  activeSort?: any;
  view?: any;
  manageToolbar?: any;
  showToolBar?: any;
  data?: [] | object | any;
};
export default function DesktopFilter(props: DesktopFilterTypes) {
  const { loading, title, activeSort, view, manageToolbar, data, showToolBar } =
    props;
  return (
    <>
      <span className="-lg:hidden">
        {loading ? (
          <TopSortPlaceHolder />
        ) : (
          <Stack
            alignItems="center"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={{ md: 'space-between', xs: 'flex-start' }}
          >
            <div className="grid gap-0.5">
              <Typography variant="h2" component="h1">
                {title[0]}
              </Typography>
              <Typography
                variant="body2"
                className="font-light text-tertiary"
                component="h2"
              >
                {title[1]} Products
              </Typography>
            </div>
            {showToolBar && (
              <Toolbar
                sort={activeSort}
                view={view}
                manageToolbarAction={manageToolbar}
                sortFields={data?.products?.sort_fields}
              />
            )}
          </Stack>
        )}
      </span>
    </>
  );
}
