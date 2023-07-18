import { Text } from '@/components/common/Text';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href='#' className='group '>
      <div className='h-[15rem] aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7 relative'>
        <Image
          src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${product.image}`}
          alt='product-image'
          className='h-full w-full object-contain object-center group-hover:opacity-75'
          fill
        />
      </div>
      <h3 className='text-center mt-4 text-sm'>{product.title}</h3>
    </Link>
  );
};

export default ProductCard;
