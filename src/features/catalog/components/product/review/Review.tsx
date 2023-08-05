import { Text } from '@/components/common/Text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ReviewType } from '@/features/catalog/types';
import { useGetUserQuery } from '@/features/user/hooks/useGetUsersQuery';
import React from 'react';

const Review = ({ review }: { review: ReviewType }) => {
  const { data } = useGetUserQuery(review.userEmail);
  return data ? (
    <div className='flex flex-col w-full h-auto py-8'>
      <div className='flex justify-start items-center w-full py-4'>
        <Avatar className='w-12 h-12'>
          <AvatarImage src={`${process.env.NEXT_PUBLIC_S3_BUCKET}/${data?.user.image}` ?? ``} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col items-start ml-4 gap-2'>
          <Text variant='base/semibold/black'>{data.user.name==='' ? 'Anonymous User' : data.user.name}</Text>
          <div className='flex items-center'>
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 flex-shrink-0 ${
                    Math.round(review.rating) >= i + 1
                      ? 'text-yellow-500'
                      : 'text-gray-200 dark:text-gray-500'
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
        </div>
      </div>
      <div className='w-full px-4 py-2'>{review.description}</div>
    </div>
  ) : null;
};

export default Review;
