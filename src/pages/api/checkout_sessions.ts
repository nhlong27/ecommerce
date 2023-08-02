import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { OrderSchema } from "./.types";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).end()
  }
  if (req.method === 'POST') {
    try {
      
      const {orderItems} = OrderSchema.parse(req.body)
      
      const session = await stripe.checkout.sessions.create({
        line_items: orderItems.map((item) => 
          ({
            //https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-line_items-price_data
            price_data: {
              unit_amount: item.productPrice*100 + 50,
              currency: 'usd',
              product_data: {
                name: item.productTitle,
                description: item.orderId,
                images: [`${process.env.NEXT_PUBLIC_DATA_SOURCE}${item.productImage}`],
              },
            },
            quantity: item.quantity,
          })
          ),
        metadata: {
          id: req.body.id,
          userId: req.body.userId,
          status: req.body.status,
          total: req.body.total,
        },
        payment_intent_data: {
          metadata: {
            id: req.body.id,
            userId: req.body.userId,
            status: req.body.status,
            total: req.body.total,
          },
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER}/checkout?step=finish&orderId=${req.body.id.toString()}&redirect=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER}/account/cart`,
      });
      res.json( {session});
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === 'PATCH') {
    try {
      const session = await stripe.checkout.sessions.expire(req.body.id);
      res.json( {session});
    }
    catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

