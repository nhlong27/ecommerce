import '@/styles/globals.css'
import { MediaContextProvider } from '@/utils/media'
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


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [isLoading, setIsLoading] = React.useState(false)
  Router.events.on('routeChangeStart', () => setIsLoading(true))
  Router.events.on('routeChangeComplete', () => setIsLoading(false))
  return <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
         <MediaContextProvider>
    {isLoading ? <Loading /> :
    <Component {...pageProps} />
    }
    </MediaContextProvider>
        </Hydrate>
        <ReactQueryDevtools />
        </QueryClientProvider>
}
