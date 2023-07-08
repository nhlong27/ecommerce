import Link from 'next/link'
import React from 'react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getUsersQuery } from '@/features/user/queries'
import { useGetUsersQuery } from '@/features/user'
import { getSession } from 'next-auth/react'
import { useUpdateUserMutation } from '@/features/user'
import Filter from '@/components/Filter'
import Results from '@/components/Results'

const UserPage = () => {
  const { data, error, session } = useGetUsersQuery()
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const updateUser = useUpdateUserMutation()
  return data ? (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      User Page
      <Filter />
      <Results />
      <pre>{JSON.stringify(data, null, '\t')}</pre>
      <Link className="underline" href="/">
        {'To home'}
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateUser.mutate({
            name: name,
            email: email,
          })
        }}
      >
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
  ) : error instanceof Error ? (
    <div>error</div>
  ) : (
    <div>No data</div>
  )
}

export default UserPage

export async function getStaticProps() {
  const session = await getSession()
  if (session?.user.role === 'USER') {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['users'], getUsersQuery().queryFn)

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}
