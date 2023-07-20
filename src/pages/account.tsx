import { AccountMenu, CartSection } from '@/features/user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { atom, useAtom } from 'jotai';
import Custom404 from './404';
import LoadingPage from './loading';

export const accountSectionAtom = atom<string>('profile');

const AccountPage = () => {
  const { data: session } = useSession();
  const [accountSection] = useAtom(accountSectionAtom);
  return session ? (
      <div className='min-h-screen w-11/12 mx-auto py-8 flex flex-col lg:flex-row'>
        <AccountMenu />
        <div className='lg:basis-3/4 lg:min-h-screen border-t border-gray-200 dark:border-gray-500 lg:border-t-0 lg:border-l'>
          {(() => {
            switch (accountSection) {
              case 'profile':
                return <div className='lg:h-screen w-full px-8 py-8'>Profile</div>;
              case 'cart':
                return (
                  <div className='lg:min-h-screen lg:max-h-[200vh] w-full px-8 py-8'>
                    <CartSection />
                  </div>
                );
              default:
                return <div className='lg:h-screen w-full px-8 py-8'>Orders</div>;
            }
          })()}
        </div>
      </div>
    ) : <LoadingPage />
};

export default AccountPage;
