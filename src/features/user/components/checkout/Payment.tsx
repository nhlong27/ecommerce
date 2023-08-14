import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useGetOrderQuery } from '../../hooks/useGetOrderQuery';
import { Skeleton } from '@/components/ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { RotatingLines } from 'react-loader-spinner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const Payment = () => {
  const router = useRouter();
  const { data } = useGetOrderQuery(router.query.orderId as string);
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  return data ? (
    <form
      // action='/api/checkout_sessions'
      // method='POST'
      // target='_blank'
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitting(true);
        axios
          .post('/api/checkout_sessions', {
            ...data.order,
            id: parseInt(data.order.id),
          })
          .then((response) => {
            setIsSubmitting(false);
            queryClient.invalidateQueries(['order', router.query.orderId as string]);
            window.open(response.data.session.url, '_blank');
          });
      }}
    >
      <section>
        <Button
          disabled={isSubmitting}
          type='submit'
          size='lg'
          variant='default'
          className='w-full uppercase tracking-widest'
        >
          Pay {isSubmitting && <RotatingLines strokeColor='#C8E7F2' strokeWidth='5' width='20' />}
        </Button>
      </section>
    </form>
  ) : (
    <Skeleton className='w-full bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-11 rounded-md px-8' />
  );
};

export default Payment;
