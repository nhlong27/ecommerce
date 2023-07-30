import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import axios from 'axios';
import connectMongo from '@/lib/mongodb';
import { ProductModel } from '../../../mongoose/models/product.model';

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
  // const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   res.status(401).end();
  // }

  try {
    const {status, cartItems} = PaymentIntentSchema.parse(req.body);

    switch (status){
      case 'pending':
        await connectMongo();
        let availableItems = []
        let outOfStockItems = []
        for (const item of cartItems) {
          const product = await ProductModel.findOne({ sku: item.productId });
          if (item.quantity < product.instock_available) {
            await ProductModel.updateOne(
              { sku: item.productId },
              { $inc: { instock_reserved: item.quantity, instock_available: -item.quantity } }
            );
            availableItems.push({productId: item.productId, instock_available: product.instock_available - item.quantity, instock_reserved: product.instock_reserved + item.quantity  });
          } 
          else {
            outOfStockItems.push({productId: item.productId, instock_available: product.instock_available, instock_reserved: product.instock_reserved});
          }
        }
        res.status(200).json({availableItems, outOfStockItems});
        break;
      case 'reject':
        break;
      case 'confirm': 
        break;
      default:
        break;
    }
    res.end();
  }
  catch (e) {
    console.log(e);
    res.status(405).end('Problems occured');
  }
};
