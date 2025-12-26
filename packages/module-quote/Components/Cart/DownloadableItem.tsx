import { isValidArray } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
export function DownloadableItem({
  product,
}: {
  product: { sample_url: string; sort_order: number; title: string }[];
}) {
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      {' '}
      <div className="grid pb-2 text-base">
        {isValidArray(product) && (
          <ErrorBoundary>
            {' '}
            <h3 className="my-1 text-sm font-semibold text-black">
              {t('Sample :')}{' '}
            </h3>
            {product?.map((item, index: number) => (
              <div className="pb-1" key={item?.sort_order + index}>
                <Link
                  className="my-0 underline underline-offset-4 decoration-brand text-brand "
                  href={`${item?.sample_url}`}
                  target="_blank"
                >
                  <p className="my-0 text-xs font-medium duration-200 hover:scale-y-110">
                    {item?.title}
                  </p>
                </Link>
              </div>
            ))}
          </ErrorBoundary>
        )}
      </div>
    </ErrorBoundary>
  );
}
export default DownloadableItem;
