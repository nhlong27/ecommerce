import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import axios from 'axios';
import connectMongo from '@/lib/mongodb';
import { ProductModel } from '../../../mongoose/models/product.model';
import { AddToOrderSchema, OrderSchema } from './.types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // requests come from order_service, no need for authentication again
  try {
    const { status } = req.body;

    switch (status) {
      case 'pending':
        const { cartItems } = AddToOrderSchema.parse(req.body);

        await connectMongo();
        let availableItems = [];
        let outOfStockItems = [];
        for (const item of cartItems) {
          const product = await ProductModel.findOne({ sku: item.productId });
          if (item.quantity < product.instock_available) {
            await ProductModel.updateOne(
              { sku: item.productId },
              { $inc: { instock_reserved: item.quantity, instock_available: -item.quantity } },
            );
            availableItems.push({
              ...item,
            });
          } else {
            outOfStockItems.push({
              ...item,
            });
          }
        }
        res.status(200).json({ availableItems, outOfStockItems });
        break;

      case 'reject':
        try {
          const { orderItems } = OrderSchema.parse(req.body);

          await connectMongo();

          for (const item of orderItems) {
            const product = await ProductModel.findOne({ sku: item.productId });
            if (item.quantity < product.instock_available) {
              await ProductModel.updateOne(
                { sku: item.productId },
                { $inc: { instock_reserved: -item.quantity, instock_available: item.quantity } },
              );
            }
          }
          res.status(200).end();
        } catch (e) {
          console.log(e);
          res.status(405).end('Problems occured');
        }
        break;

      case 'confirmed':
        try {
          const { orderItems } = OrderSchema.parse(req.body);

          await connectMongo();
          console.log('Settling stocks');
          for (const item of orderItems) {
            await ProductModel.updateOne(
              { sku: item.productId },
              { $inc: { instock_reserved: -item.quantity } },
            );
          }
          console.log('Stocks settled')
          
          res.status(200).end();
        } catch (e) {
          console.log(e);
          res.status(405).end('Problems occured');
        }
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
