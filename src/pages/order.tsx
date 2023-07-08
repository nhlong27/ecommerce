import PaymentStatus from '@/features/payment/components/PaymentStatus'
import { useGetStripeSessionQuery } from '@/features/payment/hooks/useGetStripeSessionQuery';
import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const order = () => {
  const { data: secret, error, isLoading } = useGetStripeSessionQuery();
  let options = {};
  if (secret) {
    options = {
      // passing the client secret obtained in step 3
      clientSecret: (secret as any).stripe_secret,
      // Fully customizable with appearance API.
      appearance: {
        /*...*/
      },
    };
  }

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
      <PaymentStatus />
        </Elements>
    </div>
  )
}

export default order