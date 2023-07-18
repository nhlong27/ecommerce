import React from 'react';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';
import Image from 'next/image';
import { Text } from '@/components/common/Text';
import ProductCard from '@/features/product/components/ProductCard';

const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return data ? (
    <div className='flex flex-wrap w-full h-full justify-between items-center gap-4'>
      {(data as any).products.map((product: any, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  ) : error ? (
    <div>Error</div>
  ) : isLoading ? (
    <div>Loading</div>
  ) : null;
};

export default ProductList;
