import { Text } from '@/components/common/Text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const Review = () => {
  return (
    <div className='flex flex-col w-full h-auto py-8'>
      <div className='flex justify-start items-center w-full py-4'>
        <Avatar className='w-12 h-12'>
          <AvatarImage src={`https://github.com/shadcn.png`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col items-start ml-4 gap-2'>
          <Text variant='base/semibold/black'>Name</Text>
          <div className='flex items-center'>
            <svg
              className='h-4 w-4 flex-shrink-0'
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
            <svg
              className='h-4 w-4 flex-shrink-0'
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
            <svg
              className='h-4 w-4 flex-shrink-0'
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
            <svg
              className='h-4 w-4 flex-shrink-0'
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
            <svg
              className='text-gray-200 dark:text-gray-500 h-4 w-4 flex-shrink-0'
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
          </div>
        </div>
      </div>
      <div className='w-full px-4 py-2'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis error optio voluptatem omnis
        deserunt ratione,
      </div>
    </div>
  );
};

export default Review;
