import { CacheProvider, EmotionCache } from '@emotion/react';
import { store } from '@store/index';
import { GraphQlProvider } from '@voguish/module-graphql';
import Layout, {
  NextPageWithLayout,
  createEmotionCache,
} from '@voguish/module-theme';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import 'typeface-poppins';
import '../styles/custom.css';
import '../styles/globals.css';
import '../styles/swipper.css';

// external lib css
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
/**
 * App Props With Layout.
 */
export interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  // const apolloClient = useApollo(pageProps.initialApolloState);
  const getLayout = Component.getLayout ?? ((page) => page);
  const pageOptions = Component.pageOptions || pageProps.pageOptions || {};
  const router = useRouter();

  const { locale } = router;

  useEffect(() => {
    const loadLocaleData = async (locale: string) => {
      const { messages } = await import(
        `@lingui/loader!../locale/${locale}/messages.po`
      );
      i18n.load(locale, messages);
      i18n.activate(locale);
    };
    loadLocaleData(locale ? locale : 'en');
  }, [locale]);
  return getLayout(
    <>
      <I18nProvider i18n={i18n}>
        <Provider store={store}>
          <SessionProvider session={session}>
            <GraphQlProvider pageProps={pageProps}>
              <CacheProvider value={emotionCache}>
                <Layout pageOptions={pageOptions}>
                  <Component {...pageProps} />
                </Layout>
              </CacheProvider>
            </GraphQlProvider>
          </SessionProvider>
        </Provider>
      </I18nProvider>
    </>
  );
}

export default MyApp;
