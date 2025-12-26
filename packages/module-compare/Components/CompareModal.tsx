import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductComparisonPlaceholder } from '@voguish/module-marketplace/Components/Placeholder';
import { CompareList as CompareListTypes } from '@store/types';
import { setCompareList, setCompareListId } from '@store/user';
import { FEEDS_FRACTION } from '@utils/Constants';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import Thumbnail from '@voguish/module-catalog/Components/Product/Item/Thumbnail';
import COMPARE_PRODUCTS_QUERY from '@voguish/module-compare/graphql/CompareItems.graphql';
import { useCustomerQuery } from '@voguish/module-customer/hooks/useCustomerQuery';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { HTMLRenderer } from '@voguish/module-theme/components/HTMLRenderer';
import Containers from '@voguish/module-theme/components/ui/Container';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
const Rating = dynamic(() => import('@mui/material/Rating'), {
  loading: () => (
    <div className="w-3 h-3 mr-1 bg-gray-200 rounded-sm animate-pulse" />
  ),
  ssr: false,
});
const RemoveItemCompare = dynamic(() => import('./RemoveFromCompare'), {
  loading: () => {
    return <div className="w-16 h-10 rounded-md animate-pulse bg-slate-200" />;
  },
});
const ConfigOptions = dynamic(
  () => import('@voguish/module-catalog/Components/Product/Item/ConfigOptions')
);
export default function CompareList() {
  const methods = useForm<AddProductsToCartInput>();
  const { t } = useTranslation('common');

  let compareLocalData = useSelector(
    (state: { user: { compareList: { data: CompareListTypes | any } } }) =>
      state?.user?.compareList?.data
  );
  compareLocalData = compareLocalData ? compareLocalData : {};
  let sku: string[] = [];
  let compareProducts = Object.entries(compareLocalData);
  compareProducts.forEach((element: any) => {
    sku.push(element[1]?.sku);
  });
  const {
    data: compareData,
    refetch,
    loading,
  } = useCustomerQuery(COMPARE_PRODUCTS_QUERY);
  const dispatch = useDispatch();
  const compareItem = compareData?.customer?.compare_list?.items;

  useEffect(() => {
    dispatch(setCompareList(compareData?.customer?.compare_list));
    const uid = compareData?.customer?.compare_list?.uid;
    dispatch(setCompareListId(uid));
    refetch();
  });

  if (loading) {
    return (
      <Containers className="relative">
        <div className="max-w-[88vw]">
          <div className="flex items-center justify-between gap-4 pb-10">
            <Typography variant="h2" component="h1">
              {t('Compare List')}
            </Typography>
          </div>
          <ProductComparisonPlaceholder />
        </div>
      </Containers>
    );
  }
  return (
    <ErrorBoundary>
      <Containers className="relative">
        <div className="max-w-[88vw]">
          <ErrorBoundary>
            <div className="flex items-center justify-between gap-4 pb-10">
              <Typography variant="h2" component="h1">
                {t('Compare List')}
              </Typography>
              {isValidArray(compareItem) && (
                <RemoveItemCompare refetch={refetch} allClear />
              )}
            </div>
          </ErrorBoundary>
          {isValidArray(compareItem) ? (
            <div className="pb-4 border px-0.5 border-solid rounded-xl border-checkoutBorder">
              <div className="flex items-start min-h-full overflow-x-auto overflow-y-hidden rounded-xl">
                <div className="min-h-full z-20 divide-x-0 divide-y divide-solid divide-checkoutBorder flex flex-col min-w-[12rem] md:min-w-[16rem] bg-white gap-y-6">
                  {loading ? (
                    <div className="mx-auto min-h-[28rem] w-full bg-neutral-300 animate-pulse" />
                  ) : (
                    <div className="min-h-[28rem] py-2 text-lg sm:text-xl font-semibold flex items-center px-5 bg-white">
                      {t('Products')}
                    </div>
                  )}
                  {loading ? (
                    <div className="mx-auto min-h-[6rem] w-full bg-neutral-300 animate-pulse" />
                  ) : (
                    <div className="min-h-[6rem] text-lg sm:text-xl  font-semibold flex items-center px-5 bg-white">
                      {t('Options')}
                    </div>
                  )}

                  {loading ? (
                    <div className="w-full h-full py-2 bg-neutral-300 animate-pulse" />
                  ) : (
                    <div className="flex flex-col justify-center h-full px-5 py-10 text-lg font-semibold bg-white sm:text-xl">
                      {t('Description')}
                    </div>
                  )}
                </div>

                <div className="flex gap-6 border-0 border-solid rtl:border-r ltr:border-l border-checkoutBorder">
                  <div className="flex divide-x divide-y-0 divide-solid divide-checkoutBorder">
                    {isValidArray(compareItem) &&
                      compareItem?.map((item: any) => (
                        <div
                          key={item?.product?.id}
                          className="flex flex-col w-56 h-full gap-3 divide-x-0 divide-y divide-solid divide-checkoutBorder lg:w-72 xl:w-80"
                        >
                          <div className="flex px-5 min-h-[28rem] relative  items-center">
                            {loading ? (
                              <div className="w-full h-full mx-auto bg-neutral-300 animate-pulse" />
                            ) : (
                              <article
                                className="grid cursor-pointer max-w-[98%] group duration-300  grid-rows-[min-content,43px,1fr] text-left rounded-md gap-4 w-full min-h-full
                     "
                              >
                                <div className="w-full max-w-full relative h-[18rem] mt-10 aspect-square truncate rounded-t-md">
                                  <Link
                                    href={`/catalog/product/${item?.product?.url_key}`}
                                  >
                                    <Thumbnail
                                      alt={item?.product?.name}
                                      thumbnail={item?.product?.thumbnail?.url}
                                      fill
                                      className="object-contain object-center transition duration-500 cursor-pointer max-h-fit aspect-square md:object-scale-down group-hover:scale-110 rounded-t-md"
                                    />
                                  </Link>
                                  <ErrorBoundary>
                                    <div className="absolute z-[9] opacity-0 hover:bg-white group-hover:opacity-100 duration-300 ltr:right-3 top-3 overflow-hidden rounded hover:!rounded rtl:left-3">
                                      <RemoveItemCompare
                                        refetch={refetch}
                                        productId={
                                          `${item?.product?.uid}` as string
                                        }
                                      />
                                    </div>
                                  </ErrorBoundary>
                                </div>
                                <div className="flex items-center">
                                  <p className=" text-black text-lg my-0 font-normal leading-[1.56rem] max-w-[80%] max-h-fit line-clamp-2">
                                    <HTMLRenderer
                                      className="my-0"
                                      htmlText={item?.product?.name}
                                    />
                                  </p>
                                </div>
                                <footer className="pb-4 ">
                                  <div className="flex items-start justify-between">
                                    <p className="text-black my-0 text-[1.375rem] font-semibold leading-[1.97rem]">
                                      {getFormattedPrice(
                                        item?.product?.price_range
                                          ?.maximum_price?.final_price?.value,
                                        item?.product?.price_range
                                          ?.maximum_price?.final_price?.currency
                                      )}
                                    </p>
                                    <div className="flex items-center mt-0.5 gap-1">
                                      <ErrorBoundary>
                                        <Rating
                                          size="medium"
                                          className="text-brand"
                                          max={1}
                                          defaultValue={
                                            item?.product?.rating_summary
                                              ? item?.product?.rating_summary /
                                                100
                                              : 0
                                          }
                                          precision={0.1}
                                          readOnly
                                        />
                                      </ErrorBoundary>

                                      <p className="mt-0.5 text-neutral-900 text-[1.25rem] my-0 font-normal leading-[1.58rem] tracking-[0.0425rem]">
                                        {(
                                          (item?.product?.rating_summary || 0) /
                                          FEEDS_FRACTION
                                        ).toFixed(1)}
                                      </p>
                                    </div>
                                  </div>{' '}
                                  <ErrorBoundary>
                                    <Link
                                      href={`/catalog/product/${item?.product?.url_key}`}
                                    >
                                      <Button
                                        variant="outlined"
                                        className=" rounded-[unset] px-3 py-2 text-sm mt-4 -sm:w-full border-secondary w-full text-secondary font-semibold"
                                      >
                                        {t('View Item')}
                                      </Button>
                                    </Link>
                                  </ErrorBoundary>
                                </footer>
                              </article>
                            )}{' '}
                          </div>

                          <div className="flex px-5 flex-col my-3 items-start justify-center min-h-[6rem]">
                            {loading ? (
                              <div className="grid w-full gap-3 pt-6">
                                <div className="w-full h-10 bg-neutral-300 animate-pulse" />
                                <div className="w-full h-10 bg-neutral-300 animate-pulse" />
                              </div>
                            ) : isValidArray(
                                item?.product?.configurable_options
                              ) ? (
                              <ErrorBoundary>
                                <FormProvider {...methods}>
                                  <form className="pt-6">
                                    <ConfigOptions
                                      compare
                                      configurableOptions={
                                        item?.product?.configurable_options
                                      }
                                    />
                                  </form>
                                </FormProvider>
                              </ErrorBoundary>
                            ) : (
                              <div className="grid w-full min-h-full -mt-px place-items-center ">
                                <p> {t('No Option Available')}</p>
                              </div>
                            )}
                          </div>

                          <div className="grid items-start h-full px-5 py-3 bg-white">
                            {loading ? (
                              <div className="grid w-full gap-3 pt-4">
                                <div className="w-full h-2 bg-neutral-300 animate-pulse" />
                                <div className="w-full h-2 bg-neutral-300 animate-pulse" />
                                <div className="w-full h-2 bg-neutral-300 animate-pulse" />
                                <div className="w-full h-2 bg-neutral-300 animate-pulse" />
                                <div className="w-full h-2 bg-neutral-300 animate-pulse" />
                              </div>
                            ) : (
                              <Typography
                                variant="filter"
                                className="text-hoverEffect leading-normal lg:leading-[1.25rem]  "
                                style={{
                                  lineBreak: 'anywhere',
                                }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item?.product?.description?.html ||
                                    t('No description present'),
                                }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            !isValidArray(compareItem) &&
            !loading && (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-10 mx-auto text-center w-fit">
                <Box className="grid">
                  <Box className="m-auto bg-[#EFF9FB]  h-60 w-60 flex items-center justify-center rounded-full">
                    <CompareArrowsIcon className="ml-2 text-[8rem] -md:ml-0 text-brand" />
                  </Box>
                </Box>
                <span className="grid py-4">
                  <Typography variant="ErrorHeading" className="-xs:text-lg">
                    {t('Your compare list is empty!')}
                  </Typography>
                  <Typography
                    variant="ErrorSubHeading"
                    className="capitalize -xs:text-base"
                  >
                    {/*  eslint-disable-next-line quotes */}
                    {t("Look's Like You Haven't Made Your Choice Yet..")}
                  </Typography>
                </span>
              </div>
            )
          )}
        </div>
      </Containers>
    </ErrorBoundary>
  );
}
