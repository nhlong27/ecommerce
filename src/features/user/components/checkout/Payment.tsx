import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Payment = () => {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);
  return (
    <div>
      <form action='/api/checkout_sessions' method='POST'>
        <section>
          <Button type='submit' size='lg' variant='default' className='w-full py-6 text-lg'>
            Pay
          </Button>
        </section>
      </form>
    </div>
  );
};

export default Payment;
