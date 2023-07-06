import React from 'react';
import { ProductList } from '@/features/catalog';

const shop = () => {
  return (
    <div className='w-11/12 mx-auto flex flex-wrap gap-8 justify-center'>
      <ProductList />
    </div>
  );
};

export default shop;
