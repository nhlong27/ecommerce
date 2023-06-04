import { useGetUsersQuery } from '@/hooks/useGetUsersQuery'
import { getUsers } from '@/queries'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'

const AdminPage = () => {
  const { data: session } = useGetUsersQuery()
  return <div>Admin</div>
}

export default AdminPage

export async function getServerSideProps() {
  const session = await getSession()
  console.log(session)
  if (session?.user.role==='ADMIN') {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['users2'], getUsers)

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }
  // return {
  //   notFound: true,
  // }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}
