import { Text } from '@/components/common/Text';
import { Button } from '@/components/ui/button';
import React from 'react';
import Reviews from './Reviews';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ReviewForm from './ReviewForm';

 

const ReviewSection = () => {
  return (
    <div className='mx-auto  mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 flex flex-col justify-start items-start'>
      <Text variant='2xl/semibold/black'>Reviews</Text>
      <div className='w-full flex gap-4 lg:gap-16 lg:flex-row flex-col'>
        <div className='order-1 lg:order-2 w-full lg:w-1/2 my-8'>
          <Text variant='lg/semibold/black'>Share your thoughts</Text>
          <Text variant='base/normal/black'>
            If you've used this product, share your thoughts with other customers
          </Text>

          <Collapsible>
            <CollapsibleTrigger>
              <Button
                variant='secondary'
                className='mt-4'
              >
                Write a review
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ReviewForm />
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className='order-2 lg:order-1 lg:w-1/2 w-full'>
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
