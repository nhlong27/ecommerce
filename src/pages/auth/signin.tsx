import { Provider } from 'next-auth/providers'
import { getProviders, signIn } from 'next-auth/react'
import React from 'react'

export default function SignIn({ providers }: { providers: Provider[] }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, {callbackUrl: '/auth'})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
