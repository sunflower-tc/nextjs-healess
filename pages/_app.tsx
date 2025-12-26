import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '@store/index';
import { GraphQlProvider } from '@voguish/module-graphql';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '@voguish/module-theme/components/htmlBlocks/HtmlBlock.css';
import { createEmotionCache } from '@voguish/module-theme/createEmotionCache';
import { NextPageWithLayout } from '@voguish/module-theme/page';
import theme from '@voguish/module-theme/theme';
import { appWithTranslation, UserConfig } from 'next-i18next';
import dynamic from 'next/dynamic';
import 'typeface-poppins';
import nextI18NextConfig from '../next-i18next.config';
import '../styles/custom.css';
import '../styles/globals.css';
import '../styles/swipper.css';
import BackToTop from '@packages/module-common/ScrollTop';
const Layout = dynamic(() => import('@voguish/module-theme/Layout'));

/* 
  Extend default Next.js AppProps to include:
  - Component with optional layout function and page options
  - EmotionCache for styling cache management
*/
export interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

/*
  Define a minimal i18next config fallback to initialize
  the translation HOC with default and available locales
*/
const emptyInitialI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: nextI18NextConfig.i18n.defaultLocale,
    locales: nextI18NextConfig.i18n.locales,
  },
};

/* 
  Create a client-side Emotion cache instance.
  This cache is used to manage CSS-in-JS styles efficiently,
  especially important for SSR and hydration consistency.
*/
const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  /*
    Support for per-page layouts:
    If the page exports a `getLayout` function, use it to wrap the page component.
    Otherwise, render the page component as is.
  */
  const getLayout = Component.getLayout ?? ((page) => page);

  /*
    Extract page-specific options from the component or fallback
    to those provided in pageProps.
    These options may affect layout behavior or appearance.
  */
  const pageOptions = Component.pageOptions || pageProps.pageOptions || {};

  /*
    Render the app wrapped in all the required context providers:
    - A scrollable div container that tracks scroll position
    - SessionProvider from next-auth for auth sessions
    - Redux Provider for app-wide state management
    - Material UI ThemeProvider with CssBaseline to apply consistent styling
    - GraphQlProvider to enable GraphQL client usage
    - Emotion CacheProvider for styling with Emotion
    - A dynamic Layout component wrapping the actual page content
    - VisitAtTop button shown conditionally based on scroll position
  */
  return getLayout(
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GraphQlProvider pageProps={pageProps}>
            <CacheProvider value={emotionCache}>
              <Layout pageOptions={pageOptions}>
                <Component {...pageProps} />
                <BackToTop />
              </Layout>
            </CacheProvider>
          </GraphQlProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp, emptyInitialI18NextConfig);
