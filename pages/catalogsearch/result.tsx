import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const ProductList = dynamic(
  () => import('@voguish/module-catalog/Components/Product/List')
);
const Result = () => {
  const router = useRouter();

  const { search } = router.query;

  if (search && typeof search === 'string') {
    return (
      <>
        <ProductList
          title={`Showing Re ${search}`}
          showPagination
          search={search}
          showLayeredNavigation
          showToolBar
        />
      </>
    );
  }

  return null;
};

export default Result;
