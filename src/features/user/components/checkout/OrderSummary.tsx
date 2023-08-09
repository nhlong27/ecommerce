import React from 'react';
import Link from 'next/link';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import helper from '@/constants/helper';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Payment from '@/features/user/components/checkout/Payment';
import { TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';
import { useGetOrderQuery } from '../../hooks/useGetOrderQuery';
import { useCancelOrderMutation } from '../../hooks/useCancelOrderMutation';
import { Skeleton } from '@/components/ui/skeleton';

const OrderSummary = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const cancelOrderMutation = useCancelOrderMutation();
  const router = useRouter();

  const { data, error, isLoading } = useGetOrderQuery(router.query.orderId as string);

  const handleCancel = () => {
    if (data) {
      setIsSubmitting(true);
      cancelOrderMutation.mutate(
        { cancelOrder: { ...data.order, status: 'reject' } },
        {
          onSuccess: () => {
            toast({
              title: 'Order canceled',
              description: 'Redirected back to cart page',
            });
            setIsSubmitting(false);
            router.push('/account/cart');
          },
          onError: (error) => {
            console.log(error);
            toast({
              title: 'Command failed',
              description: 'Check console for error message',
              variant: 'destructive',
            });
            setIsSubmitting(false);
          },
        },
      );
    }
  };

  return (
    <TabsContent value='order'>
      <Text variant='2xl/semibold/black' className='mb-8'>
        Confirm your order
      </Text>
      {data ? (
        <div className='flex flex-col w-full h-auto dark:bg-black bg-white pt-8 pb-16 border rounded-lg px-8'>
          <div className=''>
            <ul role='list' className='-my-6 divide-y divide-gray-200 dark:divide-gray-500'>
              {data.order.orderItems?.map((item, i) => (
                <li key={i} className='flex py-6 flex-col sm:flex-row items-center'>
                  <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-500 relative mx-auto'>
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
                        <h3 className='sm:whitespace-normal truncate w-[8rem] lg::w-auto'>
                          <Link href={`/catalogue/${item.productCategory}/${item.productId}`}>
                            {item.productTitle}
                          </Link>
                        </h3>
                        <p className='ml-4 text-green-600 dark:text-green-400'>
                          $ {item.productPrice}
                        </p>
                      </div>
                      <Link
                        href={`/catalogue?category=${item.productCategory}&page=1`}
                        className='mt-1 text-sm hover:underline'
                      >
                        # {item.productCategory}
                      </Link>
                    </div>
                    <div
                      className={`grid  w-full mt-4 sm:grid-cols-2 sm:grid-rows-none grid-rows-2 grid-cols-none`}
                    >
                      <div className='flex flex-col gap-3 place-self-start'>{item.productSize}</div>

                      <div className='text-sm text-gray-500 dark:text-gray-500'>
                        Amount
                        <Badge
                          variant='secondary'
                          className='ml-4 text-lg text-primary place-self-end'
                        >
                          {item.quantity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Separator className='mt-4 w-full' />
          <div className='w-full flex gap-4 flex-col lg:flex-row'>
            <div className='order-2 min-w-[200px] dark:border-gray-500 px-4 pt-6 sm:px-6 flex flex-col gap-4'>
              <div className='flex gap-4 text-base font-medium dark:text-white'>
                <p>Items:</p>
                <p>{data.order.orderItems?.length}</p>
              </div>
              <div className='flex gap-4 text-base font-medium dark:text-white'>
                <p>Shipping:</p>
                <p>$ 0.0</p>
              </div>
              <div className='flex gap-8 text-base font-medium dark:text-white'>
                <p>Total:</p>
                <p>
                  ${' '}
                  {data.order.orderItems
                    ?.reduce((acc, curr) => acc + curr.productPrice, 0)
                    .toFixed(2)}
                  <span className='text-green-500 dark:text-green-300'>
                    {' '}
                    + {parseFloat(
                      ((data.order.orderItems?.length as number) * 0.5).toFixed(2),
                    )}{' '}
                    (PSP fees)
                  </span>
                </p>
              </div>
              <Separator className='' />
              <div className='w-5/6 flex gap-8 flex-col sm:flex-row'>
                <Payment />
                <Button
                  disabled={isSubmitting}
                  onClick={handleCancel}
                  size='lg'
                  variant='secondary'
                  className=''
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full h-auto dark:bg-black bg-white pt-8 pb-16 border rounded-lg px-8 gap-8'>
          <div className='w-full p-4 rounded-md'>
            <Skeleton className='w-full h-28' />
          </div>
          <div className='w-full p-4 rounded-md'>
            <Skeleton className='w-full h-28' />
          </div>
          <div className='w-full p-4 rounded-md'>
            <Skeleton className='w-full h-28' />
          </div>
          <div className='w-full p-4 rounded-md'>
            <Skeleton className='w-full h-28' />
          </div>
        </div>
      )}
    </TabsContent>
  );
};

export default OrderSummary;
