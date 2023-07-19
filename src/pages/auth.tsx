import helper from '@/constants/helper';
import { AuthTabs, SignInWithProviders } from '@/features/auth';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { useSession, signIn, signOut, getProviders, getCsrfToken } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { authOptions } from './api/auth/[...nextauth]';

const AuthPage = ({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='min-h-dynamic-screen w-full mx-auto flex justify-center items-start bg-blue-100 dark:bg-gray-900'>
      <div className='flex overflow-hidden w-full h-screen'>
        <div className='h-full w-1/2 hidden md:block relative'>
          <Image src={helper.images.commercial1} alt='auth' fill className='h-full object-cover hover:brightness-110 transition-all duration-1000'
          sizes={helper.images.size} priority={true} />
        </div>
        <div className='w-full md:w-1/2 h-full flex justify-center items-center  flex-col gap-8'>
          <div>
            <SignInWithProviders providers={providers} csrfToken={csrfToken} />
          </div>
          <div className='w-[400px] flex items-center'>
            <span className='grow border-b-[1px] border-gray-400'></span>
            <span className='mx-3'>or</span>
            <span className='grow border-b-[1px] border-gray-400'></span>
          </div>
          <AuthTabs {...{ providers, csrfToken }} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers: providers ?? [], csrfToken },
  };
}
