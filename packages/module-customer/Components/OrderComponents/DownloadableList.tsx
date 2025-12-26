import { isValidArray } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { DownloadFilesOrder } from '../OrderDetail/types';

export default function DownloadableList({
  items,
}: {
  items: DownloadFilesOrder[];
}) {
  const { t } = useTranslation('common');
  return (
    isValidArray(items) && (
      <ErrorBoundary>
        <span className="text-lg font-semibold">{t('File List')}</span>
        {items?.map((item: DownloadFilesOrder) => (
          <span className="text-base font-medium" key={item.sort_order}>
            {item.title}
          </span>
        ))}
      </ErrorBoundary>
    )
  );
}
