import React from 'react';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';
import Image from 'next/image';

const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return data ? (
    <>
      {(data as any).products.map((product: any, index: number) => (
        <div role='product' className='w-60 h-120 overflow-hidden shadow-lg' key={index}>
          <div className=' h-60 relative'>
            <Image src={product.image} alt={product.title} fill={true} />
          </div>
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </>
  ) : error instanceof Error ? (
    <span>Error: {error.message}</span>
  ) : isLoading ? (
    <span>Loading...</span>
  ) : null;
};

export default ProductList;
