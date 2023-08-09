import React from 'react';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';
import ProductCard from '@/features/catalog/components/product/ProductCard';
import { ProductType } from '../types';
import { Text } from '@/components/common/Text';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSearchParams } from 'next/navigation';
import ServerPagination from '@/components/common/ServerPagination';

function Items({ currentItems }: { currentItems: ProductType[] }) {
  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 place-items-center'>
      {currentItems &&
        currentItems.map((item, index) => <ProductCard key={index} product={item} />)}
    </div>
  );
}

const ProductList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const category = searchParams.get('category') ?? 'coffee_tea';
  const brand = searchParams.get('brand') ?? undefined;
  const price = searchParams.get('price') ?? undefined;
  const sortBy = searchParams.get('sortBy') ?? undefined;
  const keyword = searchParams.get('keyword') ?? undefined;
  const { data, error } = useGetProductsQuery(
    Number(page),
    category,
    brand,
    Number(price),
    sortBy,
    keyword,
  );

  if (data && data.products.count > 0) {
    console.log(data);
    return (
      <div className='mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 lg:max-w-7xl lg:px-8'>
        <Text variant='2xl/semibold/black' className='mb-8 text-blue-500 dark:text-blue-300'>
          Page: {page}
        </Text>
        <Items currentItems={data.products.products} />
        <ServerPagination dataLength={data.products.count} />
      </div>
    );
  }
  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 '>
      <Alert
        variant='destructive'
        className='flex gap-4 items-center dark:bg-slate-800 dark:text-red-400 '
      >
        <AlertTitle className='text-2xl'>!</AlertTitle>
        <AlertDescription className='text-xl'>
          There are no products with that filter.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ProductList;
