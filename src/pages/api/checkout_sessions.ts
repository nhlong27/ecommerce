import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).end()
  }
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            // productTitle: req.body.productTitle,
            // productId: req.body.productId,
            // currency: 'usd',
            // unit_amount: 2000,

            //https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-line_items-price_data
            price_data: {
              unit_amount: 2,
              currency: 'usd',
              product_data: {
                name: 'Stubborn Attachments',
                description: 'random description',
                images: ['https://i.imgur.com/EHyR2nP.png'],
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER}/checkout?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER}/checkout/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

