import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SortFields } from '@voguish/module-catalog/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import { TopSortPlaceHolder } from '../Detail/placeholder/TopSortPlaceholder';
import Toolbar from '../Toolbar';
type DesktopFilterTypes = {
  loading?: boolean | any;
  title?: string[] | any;
  activeSort?: any;
  view?: any;
  manageToolbar?: any;
  showToolBar?: any;
  sortFields: SortFields | undefined;
};
export default function DesktopFilter(props: DesktopFilterTypes) {
  const {
    loading,
    title,
    activeSort,
    view,
    manageToolbar,
    sortFields,
    showToolBar,
  } = props;
  const { t } = useTranslation('common');
  return (
    <ErrorBoundary>
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
                {title[1]} {t('Product')}
              </Typography>
            </div>
            {showToolBar && (
              <ErrorBoundary>
                <Toolbar
                  sort={activeSort}
                  view={view}
                  manageToolbarAction={manageToolbar}
                  sortFields={sortFields}
                />
              </ErrorBoundary>
            )}
          </Stack>
        )}
      </span>
    </ErrorBoundary>
  );
}
