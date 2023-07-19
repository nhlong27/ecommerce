import { Text } from '@/components/common/Text';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import helper from '@/constants/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/catalogue/cat1/${product.sku}`}
      className='group overflow-hidden rounded-lg flex flex-col justify-start w-[15rem]'
    >
      <Card>
        <CardContent>
          <div className='xl:aspect-h-8 xl:aspect-w-7 relative rounded-lg overflow-hidden bg-white py-4'>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${product.image}`}
                alt='product-image'
                sizes={helper.images.size}
                className=' object-contain transition-all duration-300 hover:scale-110'
                fill
              />
            </AspectRatio>
          </div>
          <h1 className='text-base font-semibold mt-2 truncate'>{product.title}</h1>
          <Text variant='sm/normal/black' className='text-left '>{product.sku}</Text>
        </CardContent>
        <CardFooter className='flex justify-between -mt-4'>
          <Button variant='secondary' size='sm' className=''>Add to cart</Button>
          <Button variant='ghost' size='icon'>Fav</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
