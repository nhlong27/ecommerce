import React from 'react';
import Link from 'next/link';
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

const PaymentProcessing = () => {
  const router = useRouter();

  const cancelOrderMutation = useCancelOrderMutation();
  const { data, error, isLoading } = useGetOrderQuery(router.query.orderId as string);

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
        <div className='px-16 py-4 rounded-lg bg-gray-100 mb-4 border dark:bg-slate-900'>
          <p className='text-lg mx-auto text-center'>
            Payment processing may take a while during peak hours. You can always check the status
            of this order later.
          </p>
        </div>
        <div className='w-[10rem] h-[10rem] min-w-[150px] relative rounded-xl overflow-hidden flex justify-center items-center'>
          <Image
            alt='placeholder'
            className='h-full w-full object-contain dark:bg-white p-8'
            fill
            src={helper.images.cash_payment}
          />
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
              Click this {' '}{' '} 
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
                    <Button variant='destructive' onClick={handleCancel}>
                      Delete
                    </Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Payment is done. What's next?</AccordionTrigger>
            <AccordionContent>
              You should be redirect to the finish step of the checkout process very soon. If not, please refresh the page.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </TabsContent>
  );
};

export default PaymentProcessing;
