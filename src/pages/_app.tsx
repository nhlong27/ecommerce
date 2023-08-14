import '@/styles/globals.css';
import React from 'react';
import { Router } from 'next/router';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import Loading from './loading';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Head from 'next/head';
import { store } from '@/store/store';
import type { AppProps } from 'next/app';
import { Separator } from '@/components/ui/separator';
import { Toaster } from "@/components/ui/toaster"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [isLoading, setIsLoading] = React.useState(false);
  Router.events.on('routeChangeStart', () => setIsLoading(true));
  Router.events.on('routeChangeComplete', () => setIsLoading(false));
  return (
    <>
      <Head>
        <title>Epicola</title>
        <meta property='og:title' content='Epicola' key='title' />
        <link rel='shortcut icon' href='/images/logo.png' />
      </Head>
      <ThemeProvider attribute='class'>
        <SessionProvider session={session}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <div className='flex flex-col min-h-dynamic-screen w-full mx-auto max-w-[1600px]'>
                  <Header />
                  <Toaster  />
                  <Separator className='mx-auto w-11/12' />
                  {isLoading ? <Loading /> : <Component {...pageProps} />}
                  <Separator className='mx-auto min-w-full' />
                  <Footer />
                </div>
              </Hydrate>
            </QueryClientProvider>
          </Provider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
