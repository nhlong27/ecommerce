import { Button } from '@/components/ui/button';
import helper from '@/constants/helper';
import { CartItemType } from '@/features/catalog/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useDeleteCartItemMutation } from '@/features/catalog/hooks/useDeleteCartItemMutation';
import { toast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

type CartItemProps = {
  item: CartItemType;
  style?: 'profile' | 'sheet';
};

const CartItem: React.FC<CartItemProps> = ({ item, style = 'profile' }) => {
  const deleteCartItemMutation = useDeleteCartItemMutation();
  const queryClient = useQueryClient();
  return (
    <li className='flex py-6 scroll-mt-4 flex-col sm:flex-row'>
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mx-auto dark:border-gray-500 relative mb-4 sm:mb-0'>
        <Image
          src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${item.productImage}`}
          alt='product-image'
          sizes={helper.images.size}
          className='object-contain'
          fill
          placeholder='blur'
          blurDataURL={helper.images.blur}
        />
      </div>

      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between dark:text-white text-base font-medium flex-col sm:flex-row'>
            <h3
              className={`${
                style === 'sheet'
                  ? 'truncate max-w-[8rem]'
                  : 'sm:whitespace-normal truncate w-[8rem] lg::w-auto'
              }`}
            >
              <Link href={`/catalogue/${item.productCategory}/${item.productId}`}>
                {item.productTitle}
              </Link>
            </h3>
            <p className='ml-4 text-green-600 dark:text-green-400'>$ {item.productPrice}</p>
          </div>
          <Link
            href={`/catalogue?category=${item.productCategory}&page=1`}
            className='mt-1 text-sm hover:underline'
          >
            # {item.productCategory}
          </Link>
        </div>
        <div
          className={`grid w-full mt-4 ${
            style === 'sheet'
              ? 'grid-cols-2'
              : 'sm:grid-cols-3 grid-rows-3 grid-cols-none sm:grid-rows-none'
          }`}
        >
          {style !== 'sheet' && (
            <div className='flex flex-col gap-3 place-self-start'>{item.productSize}</div>
          )}
          <div className='text-sm text-gray-500 dark:text-gray-500'>
            Amount
            <Badge variant='secondary' className='ml-4 text-lg text-primary place-self-center'>
              {item.quantity}
            </Badge>
          </div>

          <Button
            variant='ghost'
            size='sm'
            className='text-red-400 hover:text-red-500 dark:hover:text-red-500 flex place-self-end'
            onClick={(e) => {
              e.stopPropagation();
              deleteCartItemMutation.mutate(
                { id: item.id },
                {
                  onSuccess: () => {
                    toast({ title: 'Item removed from cart' });
                    queryClient.invalidateQueries(['cartItems']);
                  },
                  onError: (error) => {
                    console.log(error);
                    toast({
                      title: 'Command failed',
                      description: 'Check console for error message',
                      variant: 'destructive',
                    });
                  },
                },
              );
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
