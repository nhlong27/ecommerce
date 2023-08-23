import helper from '@/constants/helper';
import Image from 'next/image';
import React from 'react';
import SignInWithProviders from '@/features/user/components/auth/SignInWithProviders';
import AuthTabs from '@/features/user/components/auth/AuthTabs';
import AccountDrawer from '@/components/AccountDrawer';

const AuthPage = () => {
  return (
    <div className='min-h-dynamic-screen w-full mx-auto flex justify-center items-start bg-blue-100 dark:bg-gray-900'>
      <div className='flex overflow-hidden w-full h-auto lg:h-[120vh] rounded-lg'>
        <div className='h-full w-1/2 hidden lg:block relative'>
          <Image
            src={helper.images.commercial1}
            alt='auth'
            fill
            className='h-full object-cover hover:brightness-110 transition-all duration-1000'
            sizes={helper.images.size}
            priority={true}
          />
        </div>
        <div className='w-full lg:w-1/2 h-auto flex justify-start items-center  flex-col gap-3 my-auto py-4'>
          <AccountDrawer />
          <div className='mt-8'>
            <SignInWithProviders />
          </div>
          <div className='w-[400px] flex items-center'>
            <span className='grow border-b-[1px] border-gray-400'></span>
            <span className='mx-3'>or</span>
            <span className='grow border-b-[1px] border-gray-400'></span>
          </div>
          <AuthTabs />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
