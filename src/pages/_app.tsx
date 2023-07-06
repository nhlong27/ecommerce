import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import Loading from './loading';
import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Header from '@/components/Header';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [isLoading, setIsLoading] = React.useState(false);
  Router.events.on('routeChangeStart', () => setIsLoading(true));
  Router.events.on('routeChangeComplete', () => setIsLoading(false));
  return (
    <div className='flex flex-col index-0 w-screen min-h-screen max-w-[1980px] mx-auto'>
      <Toaster />
      <Header />
      <SessionProvider session={session}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              {isLoading ? <Loading /> : <Component {...pageProps} />}
            </Hydrate>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Provider>
      </SessionProvider>
    </div>
  );
}
