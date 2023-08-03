import React from 'react';
import Review from './Review';
import { useGetReviewsQuery } from '@/features/catalog/hooks/useGetReviewsQuery';
import { ProductType } from '@/features/catalog/types';

const Reviews = ({ product }: { product: ProductType }) => {
  const { data, error } = useGetReviewsQuery(product.sku);

  return (
    <div className='w-full flex flex-col divide-y-2 divide-y-gray-200  dark:divide-y-gray-900 dark:divide-y-[1px]'>
      {data ? (
        data.reviews.length > 0 ? (
          data.reviews.map((review) => <Review key={review.id} review={review} />)
        ) : (
          <div className='w-full flex justify-center items-center py-6'>
            <p className='text-gray-500 dark:text-gray-400'>No reviews yet</p>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Reviews;
