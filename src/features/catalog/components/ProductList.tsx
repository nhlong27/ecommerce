import React from 'react';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';
import Image from 'next/image';
import { Text } from '@/components/common/Text';

const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return data ? (
    <div className='flex flex-wrap'>
      {(data as any).products.map((product: any, index: number) => (
        <div className='overflow-hidden  shadow-lg p-4 w-60 h-[30rem]' role='product' key={index}>
          <div className='h-auto w-full relative'>
            <Image src={product.image} alt={product.title} fill />
          </div>
          <Text variant='medium/semibold'>{product.title}</Text>
          <Text variant='small/normal'>{product.price}</Text>
          <Text variant='small/normal'>{product.description}</Text>
        </div>
      ))}
    </div>
  ) : error instanceof Error ? (
    <span>Error: {error.message}</span>
  ) : isLoading ? (
    <span>Loading...</span>
  ) : null;
};

export default ProductList;
