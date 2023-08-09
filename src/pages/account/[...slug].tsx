import { AccountMenu, CartSection } from '@/features/user';
import { useSession } from 'next-auth/react';
import React from 'react';
import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import OrderHistory from '@/features/user/components/OrderHistory';
import PaymentDetails from '@/features/user/components/PaymentDetails';
import Profile from '@/features/user/components/Profile';
import { Skeleton } from '@/components/ui/skeleton';

export const accountSectionAtom = atom<string | null>(null);

const AccountPage = () => {
  const { data: session, status } = useSession();
  const [accountSection, setAccountSection] = useAtom(accountSectionAtom);
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.slug) {
      setAccountSection(router.query.slug[0]);
    }
  }, [router.query.slug?.[0]]);

  return (
    <div className='min-h-screen w-11/12 mx-auto py-8 flex flex-col lg:flex-row'>
      <AccountMenu />
      <div className='lg:basis-3/4 lg:min-h-screen border-t border-gray-200 dark:border-gray-500 lg:border-t-0 lg:border-l'>
        {status === 'authenticated' ? (
          (() => {
            switch (accountSection) {
              case 'profile':
                return (
                  <div className='lg:min-h-screen lg:max-h-[200vh] py-8 lg:py-0 w-full px-8'>
                    <Profile session={session} />
                  </div>
                );
              case 'cart':
                return (
                  <div className='lg:min-h-screen lg:max-h-[200vh] py-8 lg:py-0 w-full px-8'>
                    <CartSection session={session} />
                  </div>
                );

              case 'history':
                return (
                  <div className='lg:min-h-screen lg:max-h-[200vh] w-full py-8 lg:py-0 px-8'>
                    <OrderHistory session={session} />
                  </div>
                );
              default:
                return (
                  <div className='lg:min-h-screen lg:max-h-[200vh] w-full py-8 lg:py-0 px-8'>
                    <PaymentDetails session={session} />
                  </div>
                );
            }
          })()
        ) : status === 'loading' ? (
          <div className='lg:min-h-screen lg:max-h-[200vh] py-8 lg:py-0 w-full px-8'>
            <Skeleton className='w-full h-[40rem]' />
          </div>
        ) : (
          <Unauthorized />
        )}
      </div>
    </div>
  );
};

const Unauthorized = () => {
  return (
    <div className='lg:h-screen w-full px-8'>
      <div className='flex flex-col justify-start items-start gap-4'>
        <Text variant='base/normal/primary' className='dark:text-secondary'>
          You must sign in to view this section
        </Text>
        <Button variant='secondary' className='mt-4 mx-auto'>
          <Link href='/auth'>Sign in</Link>
        </Button>
      </div>
    </div>
  );
};

export default AccountPage;
