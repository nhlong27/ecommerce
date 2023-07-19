import { getServerSideProps } from '@/pages/auth';
import { InferGetServerSidePropsType } from 'next';
import { signIn } from 'next-auth/react';
import React from 'react';

export default function SignInWithProviders({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: '/auth' })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}
