import React from 'react';
import { ProductList } from '@/features/catalog';

const ShopPage = () => {
  return (
    <div className='w-11/12 mx-auto min-h-screen p-16 '>
      <ProductList />
    </div>
  );
};

export default ShopPage;
