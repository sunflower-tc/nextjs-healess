import dynamic from 'next/dynamic';

const ProductList = dynamic(
  () => import('@voguish/module-catalog/Components/Product/List')
);

const AllProductGrid = ({
  sellerId,
  title,
  pageSize,
  showPagination,
}: {
  sellerId: string;
  title: string;
  pageSize?: number;
  showPagination?: boolean;
}) => {
  const props = {
    search: '',
    filters: { seller_id: { eq: sellerId } },
    currentPage: 1,
    pageSize: pageSize,
    sort: {},
  };
  return (
    <div className="py-5">
      <ProductList
        title={title}
        showPagination={showPagination}
        activePageFilter="seller_id"
        activePageFilterValue={sellerId}
        showLayeredNavigation
        productsInput={props}
      />
    </div>
  );
};
export default AllProductGrid;
