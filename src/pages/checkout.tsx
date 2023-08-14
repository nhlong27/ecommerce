import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/router';
import OrderSummary from '@/features/user/components/checkout/OrderSummary';
import PaymentProcessing from '@/features/user/components/checkout/PaymentProcessing';
import Custom404 from './404';
import { Skeleton } from '@/components/ui/skeleton';
import Finish from '@/features/user/components/checkout/Finish';
import { useGetOrderQuery } from '@/features/user/hooks/useGetOrderQuery';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import helper from '@/constants/helper';

const step = {
  pending: 'order',
  accepted: 'payment',
  confirmed: 'finish',
  reject: 'finish',
};
export default function CheckoutPage() {
  const router = useRouter();
  const [stepName, setStepName] = React.useState<string | null>(null);

  const { data } = useGetOrderQuery(router.query.orderId as string);

  console.log(data, stepName);

  React.useEffect(() => {
    if (router.query && data) {
      setStepName(step[data.order.status as keyof typeof step]);
    }
  }, [router.query, data]);
  const queryClient = useQueryClient();

  if (!router.query) return <Custom404 />;

  if (router.query.redirect)
    return (
      <div className='w-full mx-auto h-[60vh] py-8 lg:px-8 flex justify-center items-center relative'>
        <div className='h-full absolute w-full overflow-hidden -z-10'>
            <Image
              alt='image'
              src={helper.images.commercial14}
              priority
              fill
              sizes={'100vw'}
              className='object-cover brightness-50'
            />
          </div>
        <Card className='w-[380px]'>
          <CardHeader>
            <CardTitle className='text-green-500 dark:text-green-300'>Payment successful!</CardTitle>
            <CardDescription>
              Finish the checkout process at by clicking the link below.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'></CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                queryClient.invalidateQueries(['order', router.query.orderId as string]);
                window.close();
              }}
              size='lg'
              variant='default'
              className='w-full uppercase tracking-widest'
            >
              Go back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );

  return data && stepName === step[data.order.status as keyof typeof step] ? (
    <div className='w-full lg:w-11/12 mx-auto min-h-screen py-8 lg:px-8'>
      <Tabs defaultValue={stepName} className='w-full'>
        <ol className='flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base'>
          <TabsList className='mx-auto w-full max-w-[800px] grid grid-cols-3 place-items-start'>
            <TabsTrigger disabled={stepName !== 'order'} value='order' className='w-full'>
              <li
                className={`flex md:w-full items-center  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${
                  stepName === 'order' ? 'text-blue-600 dark:text-blue-500' : ''
                }`}
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  {stepName === 'order' ? (
                    <svg
                      className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                    </svg>
                  ) : (
                    <span className='mr-2'>1</span>
                  )}
                  Order <span className='hidden sm:inline-flex sm:ml-2'>Summaries</span>
                </span>
              </li>
            </TabsTrigger>
            <TabsTrigger disabled={stepName !== 'payment'} value='payment' className='w-full'>
              <li
                className={`flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${
                  stepName === 'payment' ? 'text-blue-600 dark:text-blue-500' : ''
                }`}
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  {stepName === 'payment' ? (
                    <svg
                      className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                    </svg>
                  ) : (
                    <span className='mr-2'>2</span>
                  )}
                  Payment <span className='hidden sm:inline-flex sm:ml-2'>Processing</span>
                </span>
              </li>
            </TabsTrigger>
            <TabsTrigger disabled={stepName !== 'finish'} value='finish' className='w-full'>
              <li
                className={`w-full flex justify-start ${
                  stepName === 'finish' ? 'text-blue-600 dark:text-blue-500' : ''
                }`}
              >
                {stepName === 'finish' ? (
                  <svg
                    className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                  </svg>
                ) : (
                  <span className='mr-2'>3</span>
                )}
                Finish
              </li>
            </TabsTrigger>
          </TabsList>
        </ol>
        <div className='min-h-screen my-4 pt-4 pb-16 px-8 rounded-md bg-gray-100 dark:bg-slate-900'>
          <OrderSummary />
          <PaymentProcessing />
          <Finish />
        </div>
      </Tabs>
    </div>
  ) : (
    <div className='w-full lg:w-11/12 mx-auto min-h-screen py-8 lg:px-8'>
      <ol className='flex items-center w-full text-sm font-medium text-center  sm:text-base'>
        <ul className='mx-auto w-full max-w-[800px] grid grid-cols-3 place-items-start'>
          <li className='flex md:w-full items-center  '>
            <Skeleton className='w-full  h-11 rounded-md px-8' />
          </li>
          <li className='flex md:w-full items-center  '>
            <Skeleton className='w-full  h-11 rounded-md px-8' />
          </li>
          <li className='flex md:w-full items-center  '>
            <Skeleton className='w-full  h-11 rounded-md px-8' />
          </li>
        </ul>
      </ol>
      <div className='min-h-screen my-4 pt-4 pb-16 px-8 rounded-md bg-gray-100 dark:bg-slate-900'>
        <Skeleton className='w-full h-full rounded-md px-8' />
      </div>
    </div>
  );
}
