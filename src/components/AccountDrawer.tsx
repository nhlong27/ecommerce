import React from 'react';
import { Drawer } from 'vaul';
import { Separator } from '@/components/ui/separator';

const AccountDrawer = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <div className='flex items-center gap-4 bg-muted px-4 py-2 rounded-md h-auto bg-white dark:bg-slate-800'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-mouse-pointer-click'
          >
            <path d='m9 9 5 12 1.774-5.226L21 14 9 9z' />
            <path d='m16.071 16.071 4.243 4.243' />
            <path d='m7.188 2.239.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656-2.12 2.122' />
          </svg>
          <p className='text-xl'>
            Sign in with our <span className='text-blue-500 dark:text-blue-300'>demo accounts</span> instead
          </p>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0' />
        <Drawer.Content className='fixed left-0 right-0 top-0 mt-24 flex h-full flex-col rounded-t-[10px] bg-white dark:bg-stone-900'>
          <div className='flex-1 rounded-t-[10px]  p-4'>
            <div className='mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full' />
            <div className='mx-auto max-w-md'>
              <Drawer.Title className='mb-4 text-2xl font-medium'>Demo accounts</Drawer.Title>
              <p className='mb-2 text-muted-foreground'>
                Choose one of these accounts to be used as a replacement for Signing In / Signing
                Up.
              </p>
              <div className='grid h-auto max-w-[28rem] min-w-[450px] rounded-md border overflow-x-scroll'>
                <div className='grid grid-cols-2 p-4 place-items-center'>
                  <h4 className='mb-4 text-sm font-medium leading-none'>Email</h4>
                  <h4 className='mb-4 text-sm font-medium leading-none'>Password</h4>
                </div>
                <Separator className='' />
                <div className='grid grid-cols-2 p-4 place-items-center '>
                  <div className='font-medium text-blue-500 dark:text-blue-300'>
                    user1@mail.com
                  </div>
                  <div className='font-medium text-blue-500 dark:text-blue-300'>user1</div>
                </div>
                <div className='grid grid-cols-2 p-4 place-items-center'>
                  <div className='font-medium text-blue-500 dark:text-blue-300'>
                    user2@mail.com
                  </div>
                  <div className='font-medium text-blue-500 dark:text-blue-300'>user2</div>
                </div>

              </div>
                <h1 className='mx-auto mt-4 text-lg'>Thank you!</h1>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default AccountDrawer;
