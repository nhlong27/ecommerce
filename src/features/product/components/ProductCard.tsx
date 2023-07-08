import SingleImage from '@/components/common/SingleImage';
import { Text } from '@/components/common/Text';
import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className='p-4 w-[20rem] overflow-hidden h-[20rem] whitespace-normal' role='product'>
      <SingleImage className='h-[10rem] w-full' imgSrc={product.image} />
      <Text variant='medium/semibold/black'>{product.title}</Text>
      <Text variant='small/normal/black'>{product.price}</Text>
      <Text variant='small/normal/black'>{product.description}</Text>
    </div>
  );
};

export default ProductCard;