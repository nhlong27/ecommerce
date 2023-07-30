import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import axios from 'axios';

const PaymentIntentSchema = z.object({
  userId: z.number(),
  total: z.number(),
  status: z.string(),
  cartItems: z.array(
    z.object({
      id: z.string(),
      userId: z.number(),
      productId: z.string(),
      productTitle: z.string(),
      productPrice: z.number(),
      productCategory: z.string(),
      productSize: z.string(),
      productImage: z.string(),
      productQuantity: z.string(),
      quantity: z.number(),
    }),
  ),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
  }

  try {
    const { status } = PaymentIntentSchema.parse(req.body);

    switch (status) {
      case 'pending':
        const { availableItems, outOfStockItems } = (
          await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/stock_service`, req.body)
        ).data;
        res.status(200).json({ paymentIntent: { ...req.body }, availableItems, outOfStockItems });
        break;
      case 'accept':
        break;
      case 'reject':
        break;
      case 'confirm':
        break;
      default:
        break;
    }
    res.end();
  } catch (e) {
    console.log(e);
    res.status(405).end('Problems occured');
  }
};
