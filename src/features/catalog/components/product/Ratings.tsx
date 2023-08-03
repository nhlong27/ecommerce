import { Text } from '@/components/common/Text';
import React from 'react';

const Ratings = ({ rating, reviews }: { rating: number; reviews: number }) => {
  console.log({reviews, rating})
  return (
    <div className='mt-3'>
      <h3 className='sr-only'>Reviews</h3>
      <div className='flex items-center'>
        <Text
          variant='base/semibold/black'
          className='mr-3 font-medium text-gray-900 dark:text-gray-200'
        >
          {rating}
        </Text>
        <div className='flex items-center'>
          {Array(5)
            .fill(1)
            .map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 flex-shrink-0 ${
                  Math.round(rating) >= i + 1 ? 'text-yellow-500' : 'text-gray-200 dark:text-gray-500'
                }`}
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                  clipRule='evenodd'
                />
              </svg>
            ))}
        </div>

        <Text variant='sm/normal/ghost' className='ml-4 text-sm font-medium text-gray-500'>
          ·
        </Text>
        <Text
          variant='sm/normal/ghost'
          className='ml-4 text-sm font-medium text-blue-500 dark:text-blue-300'
        >
          {reviews} reviews
        </Text>
      </div>
    </div>
  );
};

export default Ratings;
