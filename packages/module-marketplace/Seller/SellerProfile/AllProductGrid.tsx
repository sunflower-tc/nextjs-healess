import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import dynamic from 'next/dynamic';

const ProductList = dynamic(
  () => import('@voguish/module-catalog/Components/Product/List')
);

const AllProductGrid = ({
  title,
  showPagination,
  products,
}: // showPagination,
{
  sellerId: string;
  title: string;
  pageSize?: number;
  showPagination?: boolean;
  products?: any;
}) => {
  return (
    <ErrorBoundary>
      <div className="py-5">
        <ProductList
          title={title}
          showPagination={showPagination}
          showLayeredNavigation
          products={products}
        />
      </div>
    </ErrorBoundary>
  );
};
export default AllProductGrid;
