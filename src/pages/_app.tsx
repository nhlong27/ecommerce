import '@/styles/globals.css';
import React from 'react';
import { Router } from 'next/router';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import Loading from './loading';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { store } from '@/store/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [isLoading, setIsLoading] = React.useState(false);
  Router.events.on('routeChangeStart', () => setIsLoading(true));
  Router.events.on('routeChangeComplete', () => setIsLoading(false));
  return (
    <>
      <Head>
        <title>Ecommerce Store</title>
        <meta property='og:title' content='Ecommerce Store' key='title' />
        <link rel='shortcut icon' href='/images/logo.png' />
      </Head>
      <ThemeProvider attribute='class'>
        <SessionProvider session={session}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <div className='flex flex-col min-h-dynamic-screen w-full mx-auto max-w-[1600px]'>
                  <Header />
                  <span className='mx-auto w-11/12 md:border-b-2 border-b-[1px] border-primary/30 dark:border-white'></span>
                  {isLoading ? <Loading /> : <Component {...pageProps} />}
                  <span className='mx-auto w-11/12 md:border-b-2 border-b-[1px] border-primary/30 dark:border-white'></span>
                  <Footer />
                </div>
              </Hydrate>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </Provider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
