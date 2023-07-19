import { Button } from '@/components/ui/button';
import helper from '@/constants/helper';
import Image from 'next/image';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const CartSection = () => {
  return (
    <div className='flex flex-col h-full w-full'>
      <ScrollArea className='mt-8 w-full grow pr-8'>
        <ul role='list' className='-my-6 divide-y divide-gray-200 dark:divide-gray-500'>
          {Array(6)
            .fill('')
            .map((_, i) => (
              <li key={i} className='flex py-6 scroll-mt-4'>
                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-500'>
                  <Image
                    src={helper.icon.logo}
                    alt='image'
                    className='h-full w-full object-cover object-center'
                  />
                </div>

                <div className='ml-4 flex flex-1 flex-col'>
                  <div>
                    <div className='flex justify-between dark:text-white text-base font-medium'>
                      <h3>
                        <a href='#'>Throwback Hip Bag</a>
                      </h3>
                      <p className='ml-4'>$90.00</p>
                    </div>
                    <p className='mt-1 text-sm '>Salmon</p>
                  </div>
                  <div className='flex flex-1 items-end justify-between text-sm'>
                    <p className=''>Qty 1</p>

                    <div className='flex'>
                      <Button variant='ghost'>Remove</Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </ScrollArea>

      <div className='border-t border-gray-200 dark:border-gray-500 px-4 py-6 sm:px-6 flex flex-col'>
        <div className='flex justify-between text-base font-medium dark:text-white'>
          <p>Subtotal</p>
          <p>$262.00</p>
        </div>
        <p className='mt-0.5 text-sm '>Shipping and taxes calculated at checkout.</p>
        <div className='mt-6'>
          <a
            href='#'
            className='flex items-center justify-center rounded-md border border-transparent bg-primary dark:bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/70 dark:hover:bg-secondary/70'
          >
            Checkout
          </a>
        </div>
        <div className='mt-6 flex justify-center text-center text-sm'>
          <p>
            or{' '}
            <button type='button' className='font-medium text-primary dark:text-secondary'>
              Continue Shopping
              <span aria-hidden='true'> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
