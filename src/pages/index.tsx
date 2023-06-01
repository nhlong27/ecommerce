import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Media } from '@/utils/media'
import Link from 'next/link'
import React from 'react'
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary'
import axios from 'axios'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { UserSchema } from '@/types'
import json from '../../public/data.json' assert {type:'json'}

const inter = Inter({ subsets: ['latin'] })


export const getUser = async (id:string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/user/${id}`)
    const user = UserSchema.parse(await res.data)
    return user
  } catch (err) {
    console.log(err)
    throw new Error()
  }
}   

 function Home() {
  console.log(json)
  const { data, error: CSR } = useQuery({ queryKey: ['default'], queryFn: ()=>getUser('2') })
  console.log(data)
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      Home Page
      <Link className='underline' href='/about'>{'To about'}</Link>
      <div>
        {data?.name}
      </div>
    </main>)
}
export default Home
export async function getStaticProps() {
  try {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['default'], ()=>getUser('2'))
    console.log('SSR:' + queryClient.getQueryData(['default']))
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch(err) {
    return {notFound: true}

  }
}
