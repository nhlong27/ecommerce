import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CartSection } from '@/features/user';
import { useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import { stockPaymentIntentAtom } from '@/features/user/components/cart/CartSection';
import CartItem from '@/features/user/components/cart/CartItem';
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
import { BellRing, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Payment from '@/features/user/components/checkout/Payment';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const [stockPaymentIntent, setStockPaymentIntent] = useAtom(stockPaymentIntentAtom);
  console.log(stockPaymentIntent);

  return (
    <div className='w-11/12 mx-auto min-h-screen py-8 px-8'>
      <Tabs defaultValue='order' className='w-full'>
        <ol className='flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base'>
          <TabsList className='mx-auto w-full max-w-[800px] grid grid-cols-3 place-items-start'>
            <TabsTrigger value='order' className='w-full'>
              <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <svg
                    className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                  </svg>
                  Order <span className='hidden sm:inline-flex sm:ml-2'>Summaries</span>
                </span>
              </li>
            </TabsTrigger>
            <TabsTrigger value='payment' className='w-full'>
              <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <span className='mr-2'>2</span>
                  Payment <span className='hidden sm:inline-flex sm:ml-2'>Processing</span>
                </span>
              </li>
            </TabsTrigger>
            <TabsTrigger value='finish' className='w-full'>
              <li className='w-full flex justify-start'>
                <span className='mr-2'>3</span>
                Finish
              </li>
            </TabsTrigger>
          </TabsList>
        </ol>
        <div className='min-h-screen my-4 pt-4 pb-16 px-8 rounded-md bg-gray-100 dark:bg-slate-900'>
          <TabsContent value='order'>
            <Text variant='2xl/semibold/black' className='mb-8'>
              Confirm your order
            </Text>
            <div className='flex flex-col w-full h-auto dark:bg-black bg-white pt-8 pb-16 border rounded-lg px-8'>
              <div className=''>
                <ul role='list' className='-my-6 divide-y divide-gray-200 dark:divide-gray-500'>
                  {stockPaymentIntent?.paymentIntent.cartItems
                    .filter((item) =>
                      stockPaymentIntent.availableItems
                        .map((avai_item) => avai_item.productId)
                        .includes(item.productId),
                    )
                    .map((item, i) => (
                      <li key={i} className='flex py-6 scroll-mt-4'>
                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-500 relative'>
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
                            <div className='flex justify-between dark:text-white text-base font-medium'>
                              <h3 className=''>
                                <Link href={`/catalogue/${item.productCategory}/${item.productId}`}>
                                  {item.productTitle}
                                </Link>
                              </h3>
                              <p className='ml-4 text-green-600 dark:text-green-400'>
                                $ {item.productPrice}
                              </p>
                            </div>
                            <Link
                              href={`/catalogue/${item.productCategory}`}
                              className='mt-1 text-sm hover:underline'
                            >
                              # {item.productCategory}
                            </Link>
                          </div>
                          <div className={`grid  w-full mt-4 grid-cols-2`}>
                            <div className='flex flex-col gap-3 place-self-start'>
                              {item.productSize}
                            </div>

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
              <div className='w-full flex gap-4'>
                <div className='w-1/3 dark:border-gray-500 px-4 pt-6 sm:px-6 flex flex-col gap-4'>
                  <div className='flex gap-4 text-base font-medium dark:text-white'>
                    <p>Items:</p>
                    <p>{stockPaymentIntent?.paymentIntent.cartItems.length}</p>
                  </div>
                  <div className='flex gap-4 text-base font-medium dark:text-white'>
                    <p>Shipping:</p>
                    <p>$ 0.0</p>
                  </div>
                  <div className='flex gap-8 text-base font-medium dark:text-white'>
                    <p>Total:</p>
                    <p>
                      ${' '}
                      {stockPaymentIntent?.paymentIntent.cartItems
                        .filter((item) =>
                          stockPaymentIntent.availableItems
                            .map((avai_item) => avai_item.productId)
                            .includes(item.productId),
                        )
                        .reduce((acc, curr) => acc + curr.productPrice, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <Separator className='' />
                  <div className='w-5/6'>
                    <Payment />
                  </div>
                </div>
                <div className='border rounded-lg mt-8 p-4 flex'>
                  <Text variant='lg/semibold/black' className='mb-4'>
                    {' '}
                    Products out of stock -{' '}
                  </Text>
                  {stockPaymentIntent?.outOfStockItems ?? 0 > 0 ? (
                    <Dialog>
                      <DialogTrigger>Open</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Attention!</DialogTitle>
                          <DialogDescription>
                            These products are out of stocks. Please note that your final billing
                            amount have been adjusted accordingly.
                            <ScrollArea className='m-4 max-h-[20rem]'>
                              <ul
                                role='list'
                                className='-my-6 divide-y divide-gray-200 dark:divide-gray-500'
                              >
                                {stockPaymentIntent?.paymentIntent.cartItems
                                  .filter((item) =>
                                    stockPaymentIntent.availableItems
                                      .map((_item) => _item.productId)
                                      .includes(item.productId),
                                  )
                                  .map((item, i) => (
                                    <li key={i} className='flex py-6 scroll-mt-4'>
                                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-500 relative'>
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
                                          <div className='flex justify-between dark:text-white text-base font-medium '>
                                            <h3 className='truncate w-[10rem]'>
                                              <Link
                                                href={`/catalogue/${item.productCategory}/${item.productId}`}
                                              >
                                                {item.productTitle}
                                              </Link>
                                            </h3>
                                            <p className='ml-4 text-green-600 dark:text-green-400'>
                                              Product Id {item.productId}
                                            </p>
                                          </div>
                                          <Link
                                            href={`/catalogue/${item.productCategory}`}
                                            className='mt-1 text-sm hover:underline'
                                          >
                                            # {item.productCategory}
                                          </Link>
                                        </div>
                                        
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                            </ScrollArea>
                            <Button className='mt-8 w-full'>
                              <Check className='mr-2 h-4 w-4' /> I understand
                            </Button>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    'None'
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='payment'>Change your password here.</TabsContent>
          <TabsContent value='finish'>Change your password here.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
