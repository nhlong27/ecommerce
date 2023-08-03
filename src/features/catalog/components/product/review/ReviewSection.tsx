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
            If you've used this product, share your thoughts with other customers
          </Text>
          {session ? (
            <Collapsible>
              <CollapsibleTrigger>
                <Button variant='secondary' className='mt-4'>
                  Write a review
                </Button>
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
