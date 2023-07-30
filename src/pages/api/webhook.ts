import { NextApiRequest, NextApiResponse } from 'next';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = require('stripe')(stripeSecretKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

// https://stackoverflow.com/questions/73664867/how-do-i-replace-micros-buffer-function-inside-my-serverless-nextjs-function-ru
async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  if (req.method === 'POST') {
    const buf = await buffer(req);

    const sig = req.headers['stripe-signature'];

    let event;

    try {
      // Verify the stripe event using the webhook secret
      event = stripe.webhooks.constructEvent(buf.toString(), sig, stripeWebhookSecret);
    } catch (err: any) {
      console.log(`Webhook error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event as needed
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle checkout.session.completed event
          // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
          const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
              expand: ['line_items'],
            }
          );
          const lineItems = sessionWithLineItems.line_items;
      
          // Fulfill the purchase...
          fulfillOrder(lineItems);
        break;
      case 'payment_intent.succeeded':
        // Handle payment_intent.succeeded event
        console.log('Payment intent succeeded:', event);
        break;
      // Add other event types as needed

      default:
        console.log('Unhandled event type:', event.type);
    }

    res.status(200).json({ received: true });

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}


const fulfillOrder = (lineItems: any) => {
  // TODO: fill me in
  console.log("Fulfilling order", lineItems);
}