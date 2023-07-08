import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useGetStripeSessionQuery } from '@/features/payment/hooks/useGetStripeSessionQuery';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Button from '@/components/common/Button';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function PaymentPage() {
  const [shouldGetSecret, setShouldGetSecret] = React.useState(false);
  const { data: secret, error, isLoading } = useGetStripeSessionQuery(shouldGetSecret);
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
      {secret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : error instanceof Error ? (
        <div>Error</div>
      ) : isLoading ? (
        <div>
          <Button
            variant='destructive'
            className='cursor-pointer mb-8'
            onClick={() => {console.log('working');
            setShouldGetSecret(true)}}
          >
            Get secret
          </Button>
          Loading...
        </div>
      ) : null}
    </div>
  );
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

  const handleSubmit = async (event: HTMLFormElement) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SERVER}/order`,
      },
    });

    if (error) {  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    //@ts-ignore
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export { CheckoutForm };
export default PaymentPage;
