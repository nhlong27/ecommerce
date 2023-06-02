import Link from 'next/link'
import React from 'react'
import { getUser } from '.'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'

const UserPage = () => {
  const { data, error: CSR } = useQuery({ queryKey: ['3'], queryFn: ()=>getUser('3') })
  console.log(CSR)
  return  (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      User Page
      <div >{data?.name}</div>
      <Link className='underline' href='/'>{'To home'}</Link>
    </div>
  )
}

export default UserPage

export async function getStaticProps() {
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