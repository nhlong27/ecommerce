import prisma from '@/lib/prisma';
import axios from 'axios';
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
  if (req.method === 'POST') {
    let buf = await buffer(req);
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

        console.log('checkout.session.completed:', event);
        console.log('metadata:', event.data.object.metadata);

        const order = await prisma.order.update({
          where: {
            id: parseInt(event.data.object.metadata.id),
          },
          data: {
            status: 'confirmed',
          },
          include: {
            orderItems: true,
          }
        });

        const payment = await prisma.paymentDetails.create({
          data: {
            orderId: order.id,
            userId: order.userId,
            amount_total: event.data.object.amount_total,
            currency: event.data.object.currency,
            status: event.data.object.payment_status,
          }
        });
        
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/stock_service`, order);

        
      case 'payment_intent.succeeded':
        // Handle payment_intent.succeeded event
        console.log('payment_intent.succeeded:', event);
        console.log('metadata:', event.data.object.metadata);
        
        break;

      case 'payment_intent.payment_failed':
        console.log('payment_intent.payment_failed:', event);
        
        await prisma.order.update({
          where: {
            id: parseInt(event.data.object.metadata.id),
          },
          data: {
            status: 'failed',
          },
          include: {
            orderItems: true,
          }
        });

      default:
        console.log('Unhandled event type:', event.type);
        console.log('event:', event);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
