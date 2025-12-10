import { Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setUser } from '@store/user';
import { LOADING } from '@utils/Constants';
import { isValidArray, isValidObject } from '@utils/Helper';
import { decodeHtml } from '@utils/decode';
import { useStoreConfig } from '@voguish/module-store';
import {
  ClientPortal,
  ColumnContainer,
  NewsLetterPlaceHolder,
  PageOptions,
  theme,
} from '@voguish/module-theme';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/ui/Form/Elements/Loader';
import { CustomerWrapper, GuestWrapper } from './PageWrapper';
import { useCreateEmptyCart } from '~packages/module-quote';
const Footer = dynamic(() => import('./Footer'));

const Header = dynamic(() => import('./Header'));
const NextNProgress = dynamic(() => import('nextjs-progressbar'));
const Breadcrumbs = dynamic(
  () => import('@voguish/module-theme/components/ui/Breadcrumbs')
);
const Newsletter = dynamic(
  () => import('@voguish/module-theme/components/widgets/Newsletter'),
  { loading: () => <NewsLetterPlaceHolder /> }
);
// Importing Breadcrumbs dynamically
// const DynamicBreadcrumbs = dynamic(() => import('./Breadcrumbs'));

/**
 * Page Layout - Page setup
 * @param param0
 * @returns
 */
const Layout = ({
  children,
  pageOptions: {
    title,
    showBreadcrumb = true,
    description,
    breadCrumbs,
    metaKeywords,
    canonical = '',
  },
}: {
  children: React.ReactNode;
  pageOptions: PageOptions;
}) => {
  let isAccountLoggedIn = false;

  const dispatch = useAppDispatch();
  /** Fetching User details from session */
  const { data: session, status } = useSession();

  //to fetch store config and store in localstorage
  const { data: storeData, loading: storeLoading } = useStoreConfig();
  // const quote = useAppSelector((state: RootState) => state.cart);

  const storeConfig = storeData?.storeConfig;

  // Checking if user is logged in
  if (isValidObject(session) && isValidObject(session)) {
    dispatch(setUser(session));
    isAccountLoggedIn = true;
  }
  const router = useRouter();
  const { refetch } = useStoreConfig();
  const { locale } = router;

  if (isValidObject(session || {})) {
    dispatch(setUser(session));
  }
  // const user = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    refetch();
  }, [locale, refetch]);
  // Easy, right 😎
  toast.clearWaitingQueue();
  const guestId = useAppSelector((state: any) => state?.cart?.quote);


  const cartId = guestId?.id ?? null;
  const emptyCart = useCreateEmptyCart();


  useEffect(() => {
    if (!cartId) {
      emptyCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId]);

  return (
    <Fragment>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <title>
          {decodeHtml(title || storeConfig?.default_title || 'Voguish')}
        </title>
        <meta
          name="title"
          content={decodeHtml(title || storeConfig?.default_title || 'Voguish')}
        />
        <meta
          name="keywords"
          content={metaKeywords || storeConfig?.default_keywords}
        />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <meta
          name="description"
          content={decodeHtml(
            description || storeConfig?.default_description || 'Voguish'
          )}
        />
        {/* <FavIcon /> */}
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {status === LOADING || storeLoading ? (
          <Loader />
        ) : (
          <main
            aria-labelledby={decodeHtml(title || 'Voguish')}
            className="mx-auto mt-[4rem] antialiased scroll-mt-5 scroll-smooth page-wrapper"
          >
            <Header isAccountLoggedIn={isAccountLoggedIn} />
            <NextNProgress
              color={theme.palette.primary.main}
              showOnShallow={true}
            />
            {(showBreadcrumb || isValidArray(breadCrumbs)) && (
              <ColumnContainer>
                <Breadcrumbs breadCrumbs={breadCrumbs} title={title} />
              </ColumnContainer>
            )}
            {/* <div className="max-w-[81.25rem] mx-auto"> */}

            {session?.user?.token ? (
              <CustomerWrapper>{children}</CustomerWrapper>
            ) : (
              <GuestWrapper>{children}</GuestWrapper>
            )}
            {/* </div> */}
            <div className="grid mx-auto w-full mt-16 mb-6 bg-white gap-y-16 max-w-[125rem]">
              <Divider />
              <Newsletter />
            </div>
            <Footer />
          </main>
        )}
        <ClientPortal selector="#alerts">
          <ToastContainer newestOnTop={true} autoClose={1000} limit={1} />
        </ClientPortal>
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
