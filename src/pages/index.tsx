import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { UserSchema } from '@/types/types'
import { signIn, useSession } from 'next-auth/react'
const inter = Inter({ subsets: ['latin'] })

export const getUser = async (id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/${id}`
    )
    const user = UserSchema.parse(await res.data)
    return user
  } catch (err) {
    console.log('err' + err)
    throw new Error()
  }
}

function HomePage() {
  const { data, error: CSR } = useQuery({
    queryKey: ['2'],
    queryFn: () => getUser('2'),
  })

  const { data: session } = useSession()
  React.useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn()
    }
  }, [session])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      Home Page
      <Link className="underline" href="/auth">
        {'Sign In'}
      </Link>
      <Link className="underline" href="/user">
        {'To user'}
      </Link>
      <Link className="underline" href="/admin">
        {'To admin'}
      </Link>
      <div>{data?.name}</div>
    </main>
  )
}
export default HomePage
export async function getStaticProps() {
  try {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['2'], () => getUser('2'))
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch (err) {
    return { notFound: true }
  }
}
