import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useGetOrderQuery } from '../../hooks/useGetOrderQuery';
import { Skeleton } from '@/components/ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Payment = () => {
  const router = useRouter();
  const { data, error, isLoading } = useGetOrderQuery(router.query.orderId as string);
  const queryClient = useQueryClient();

  return data ? (
    <form
      // action='/api/checkout_sessions'
      // method='POST'
      // target='_blank'
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post('/api/checkout_sessions', {
            ...data.order, id: parseInt(data.order.id),
          })
          .then((response) => {
            queryClient.invalidateQueries(['order', router.query.orderId as string]);
            window.open(response.data.session.url, '_blank');
          })
      }}
    >
      <section>
        <Button
          type='submit'
          size='lg'
          variant='default'
          className='w-full uppercase tracking-widest'
        >
          Pay
        </Button>
      </section>
    </form>
  ) : <Skeleton className='w-full bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-11 rounded-md px-8' />;
};

export default Payment;
