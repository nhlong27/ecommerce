import Link from 'next/link'
import React from 'react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getUsers } from '@/queries'
import { useGetUsersQuery } from '@/hooks/useGetUsersQuery'
import { getSession } from 'next-auth/react'

const UserPage = () => {
  const { data, error, session} = useGetUsersQuery()
  console.log(session)
  return data ? (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      User Page
      <pre>{JSON.stringify(data, null, '\t')}</pre>
      <Link className='underline' href='/'>{'To home'}</Link>
    </div>
  ) : error instanceof Error ? (
    <div>error</div>) : <div>No data</div>
}

export default UserPage

export async function getStaticProps() {
  const session = await getSession();
  if (session?.user.role==='USER') {
    const queryClient = new QueryClient()
  
    await queryClient.prefetchQuery(['users2'], getUsers)
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }
  return {
    props: {
      session
    }
  }
}