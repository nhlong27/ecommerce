import { Text } from '@/components/common/Text';
import { Button } from '@/components/ui/button';
import React from 'react';
import Reviews from './Reviews';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ReviewForm from './ReviewForm';
import { ProductType } from '@/features/catalog/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

const ReviewSection = ({ product }: { product: ProductType }) => {
  const { data: session } = useSession();

  return (
    <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 flex flex-col justify-start items-start'>
      <Text variant='2xl/semibold/black'>Reviews</Text>
      <div className='w-full flex gap-4 lg:gap-16 lg:flex-row flex-col'>
        <div className='order-1 lg:order-2 w-full lg:w-1/2 my-8'>
          <Text variant='lg/semibold/black'>Share your thoughts</Text>
          <Text variant='base/normal/black'>
            If you&apos;ve used this product, share your thoughts with other customers
          </Text>
          {session ? (
            <Collapsible>
              <CollapsibleTrigger>
                <p className=' inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 mt-4 bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80 h-10 px-4 py-2'>
                  Write a review
                </p>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ReviewForm product={product} session={session} />
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className='flex flex-col justify-start items-start gap-4'>
              <Text variant='base/normal/primary' className='dark:text-secondary'>
                You must sign in to use this action
              </Text>
              <Button variant='secondary' className='mt-4 mx-auto'>
                <Link href='/auth'>Sign in</Link>
              </Button>
            </div>
          )}
        </div>
        <div className='order-2 lg:order-1 lg:w-1/2 w-full'>
          <ScrollArea className='h-[60vh]'>
            <Reviews product={product} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
