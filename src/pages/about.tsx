import Link from 'next/link'
import React from 'react'
import { getUser } from '.'
import axios from 'axios'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'

const about = () => {
  const { data, error: CSR } = useQuery({ queryKey: ['3'], queryFn: ()=>getUser('3') })
  console.log(CSR)
  return  (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      About Page
      <div >{data?.name}</div>
      <Link className='underline' href='/'>{'To home'}</Link>
    </div>
  )
}

export default about

export async function getServerSideProps() {
  try {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['3'], ()=>getUser('3'))
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch(err) {
    return {notFound: true}
  }
}