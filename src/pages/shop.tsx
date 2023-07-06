import { getProductsQuery } from '@/queries';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Image from 'next/image';

const shop = () => {
  const { data, isLoading, error } = useQuery({ ...getProductsQuery() });
  return data ? (
    <div className='w-11/12 mx-auto flex flex-wrap gap-8 justify-center'>
      {(data as any).products.map((product: any, index: number) => (
        <div className='w-60 h-120 overflow-hidden shadow-lg' key={index}>
          <div className=' h-60 relative'>
            <Image src={product.image} alt={product.title} fill={true}/>
          </div>
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  ) : error instanceof Error ? (
    <span>Error: {error.message}</span>
  ) : isLoading ? (
    <span>Loading...</span>
  ) : null;
};

export default shop;
