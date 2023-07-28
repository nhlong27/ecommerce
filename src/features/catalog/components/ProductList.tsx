import React from 'react';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';
import ProductCard from '@/features/catalog/components/product/ProductCard';
import Pagination from '@/components/common/Pagination';
import { ProductType } from '../types';
import { useRouter } from 'next/router';
import { atom, useAtom } from 'jotai';
import { set } from 'mongoose';
import { Text } from '@/components/common/Text';

export const categoryFilterAtom = atom<Set<any>>(
  new Set(['coffee_tea', 'energy_drink', 'juice_shake', 'sport_drink', 'water']),
);
export const filteredProductsAtom = atom<ProductType[] | null>(null);

function Items({ currentItems }: { currentItems: ProductType[] }) {
  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 place-items-center'>
      {currentItems &&
        currentItems.map((item, index) => <ProductCard key={index} product={item} />)}
    </div>
  );
}

const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  const [itemOffset, setItemOffset] = React.useState(0);

  const [categorySet] = useAtom(categoryFilterAtom);
  const [filteredProducts, setFilteredProducts] = useAtom(filteredProductsAtom);

  let itemsPerPage = 20;

  React.useEffect(() => {
    if (data) {
      if (categorySet.size > 0) {
        const products = data.products.filter((product) => categorySet.has(product.category));
        setFilteredProducts(products);
      } else {
        setFilteredProducts(null);
      }
      setItemOffset(0);
    }
  }, [categorySet]);

  if (filteredProducts) {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = filteredProducts.slice(itemOffset, endOffset);

    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };
    return currentItems ? (
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <Items currentItems={currentItems} />
        <Pagination
          pageCount={pageCount}
          dataLength={filteredProducts.length}
          handlePageClick={handlePageClick}
        />
      </div>
    ) : error ? (
      <div>Error</div>
    ) : isLoading ? (
      <div>Loading</div>
    ) : null;
  }
  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
      <Text variant='2xl/normal/black'>There are no products with that filter.</Text>
    </div>
  );
};

export default ProductList;
