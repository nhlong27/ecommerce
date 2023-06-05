import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import Loading from './loading'
import React from 'react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [isLoading, setIsLoading] = React.useState(false)
  Router.events.on('routeChangeStart', () => setIsLoading(true))
  Router.events.on('routeChangeComplete', () => setIsLoading(false))
  return (
    <>
    <Toaster />
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {isLoading ? <Loading /> : <Component {...pageProps} />}
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
    </>
  )
}
