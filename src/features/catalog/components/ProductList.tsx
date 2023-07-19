import React from 'react';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';
import ProductCard from '@/features/catalog/components/product/ProductCard';
import Pagination from '@/components/common/Pagination';
import Filters from './Filters';

const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  console.log({ data });
  return data ? (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
      <Filters />
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 place-items-center'>
        {(data as any).products.map((product: any, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Pagination />
    </div>
  ) : error ? (
    <div>Error</div>
  ) : isLoading ? (
    <div>Loading</div>
  ) : null;
};

export default ProductList;
