import React from 'react';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/ui/button';
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
import { TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useCancelOrderMutation } from '../../hooks/useCancelOrderMutation';
import { useGetOrderQuery } from '../../hooks/useGetOrderQuery';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RotatingLines } from 'react-loader-spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const PaymentProcessing = () => {
  const router = useRouter();

  const cancelOrderMutation = useCancelOrderMutation();
  const { data } = useGetOrderQuery(router.query.orderId as string);

  const handleCancel = () => {
    if (data) {
      axios.patch('/api/checkout_sessions', { id: router.query.sessionId }).then((response) => {
        console.log(response.data);
        toast({ title: 'Payment cancelled' });
      });

      cancelOrderMutation.mutate(
        { cancelOrder: { ...data.order, status: 'reject' } },
        {
          onSuccess: () => {
            toast({
              title: 'Order canceled',
              description: 'Redirected back to cart page',
            });
            router.push('/account/cart');
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
    }
  };

  return (
    <TabsContent value='payment'>
      <Text variant='2xl/semibold/black' className='mb-8'>
        Processing Payment
      </Text>
      <div className='w-full h-auto bg-white rounded-lg dark:bg-black flex justify-start py-8 px-16 flex-col items-center'>
        <div className='w-full h-auto flex flex-col md:flex-row md:justify-between justify-start items-center my-4'>
          <div className='h-full md:w-[10rem] w-full flex flex-row md:flex-col items-center mb-4'>
            <div className='w-[10rem] h-[10rem] min-w-[150px] relative rounded-xl overflow-hidden flex justify-center items-center '>
              <Image
                alt='placeholder'
                className='h-full w-full object-contain dark:bg-white p-8'
                fill
                src={helper.images.cash_payment}
              />
            </div>
            <div className='px-8 py-4 bg-gray-100 dark:bg-slate-800 rounded-lg'>
              <p className='text-sm mx-auto text-left'>
                Payment processing may take a while during peak hours. You can always check the
                status of this order later.
              </p>
            </div>
          </div>
          <div className='md:ml-24 grow'>
            <Card>
              <CardHeader>
                <CardTitle>For Demo Purposes</CardTitle>
                <CardDescription>Please select the below information to test</CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className=' flex items-center space-x-4 rounded-md border p-4'>
                  <div className='flex-1 space-y-3'>
                    <p className='text-base font-medium leading-none text-red-500 dark:text-red-300 flex gap-2 items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-alert-triangle'
                      >
                        <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' />
                        <path d='M12 9v4' />
                        <path d='M12 17h.01' />
                      </svg>
                      Please DO NOT enter your real information
                    </p>
                    <p className='text-sm font-medium leading-none text-blue-500 dark:text-blue-300'>
                      Use the information provided by Stripe instead
                    </p>
                  </div>
                </div>
                <div>
                  <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                    <span className='flex h-2 w-2 translate-y-1 rounded-full bg-blue-500' />
                    <div className='space-y-1'>
                      <p className='text-sm font-medium leading-none'>Email</p>
                      <p className='text-sm text-muted-foreground'>Any email</p>
                    </div>
                  </div>
                  <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                    <span className='flex h-2 w-2 translate-y-1 rounded-full bg-blue-500' />
                    <div className='space-y-1'>
                      <p className='text-sm font-medium leading-none'>Card code</p>
                      <p className='text-sm text-muted-foreground'>
                        4242 4242 4242 4242 -{' '}
                        <span className='text-green-500 dark:text-green-300'>Success payment</span>
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        4000 0000 0000 0002 -{' '}
                        <span className='text-red-500 dark:text-red-300'>Failed payment</span>
                      </p>
                    </div>
                  </div>
                  <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                    <span className='flex h-2 w-2 translate-y-1 rounded-full bg-blue-500' />
                    <div className='space-y-1'>
                      <p className='text-sm font-medium leading-none'>CVC</p>
                      <p className='text-sm text-muted-foreground'>Any 3 digits</p>
                    </div>
                  </div>
                  <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                    <span className='flex h-2 w-2 translate-y-1 rounded-full bg-blue-500' />
                    <div className='space-y-1'>
                      <p className='text-sm font-medium leading-none'>Date</p>
                      <p className='text-sm text-muted-foreground'>Any future date</p>
                    </div>
                  </div>
                  <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                    <span className='flex h-2 w-2 translate-y-1 rounded-full bg-blue-500' />
                    <div className='space-y-1'>
                      <p className='text-sm font-medium leading-none'>Name on Card</p>
                      <p className='text-sm text-muted-foreground'>Any name</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Has A Checkout Page been opened in another tab?</AccordionTrigger>
            <AccordionContent className='flex gap-4 items-center'>
              If not. Please click the link below again to open the Checkout Page.
              {data ? (
                <form
                  // action='/api/checkout_sessions'
                  // method='POST'
                  // target='_blank'
                  onSubmit={(e) => {
                    e.preventDefault();
                    axios
                      .post('/api/checkout_sessions', {
                        ...data.order,
                        id: parseInt(data.order.id),
                      })
                      .then((response) => {
                        window.open(response.data.session.url, '_blank');
                      });
                  }}
                >
                  <section>
                    <Button
                      type='submit'
                      size='lg'
                      variant='ghost'
                      className='w-full tracking-widest'
                    >
                      To Checkout Page
                    </Button>
                  </section>
                </form>
              ) : null}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Want to cancel order?</AccordionTrigger>
            <AccordionContent className='flex gap-4 items-center'>
              Click this{' '}
              <Dialog>
                <DialogTrigger className=' rounded-md h-10 px-4 py-2 bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80'>
                  Cancel
                </DialogTrigger>
                <DialogContent className='text-red-500 dark:text-red-300'>
                  <DialogHeader>
                    <DialogTitle>Delete your order</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. Are you sure absolutely sure?
                    </DialogDescription>
                    <Button
                      disabled={cancelOrderMutation.isLoading}
                      variant='destructive'
                      onClick={handleCancel}
                    >
                      Delete{' '}
                      {cancelOrderMutation.isLoading && (
                        <RotatingLines strokeColor='#C8E7F2' strokeWidth='5' width='20' />
                      )}
                    </Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Payment is done. What&apos;s next?</AccordionTrigger>
            <AccordionContent>
              You should be redirect to the finish step of the checkout process very soon. If not,
              please refresh the page.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </TabsContent>
  );
};

export default PaymentProcessing;
