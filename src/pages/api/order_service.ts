import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import axios from 'axios';
import prisma from '@/lib/prisma';
import { AddToOrderSchema, ItemsSchema, OrderSchema } from './.types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
  }

  try {
    const { status } = req.body;

    switch (status) {
      case 'pending':
        AddToOrderSchema.parse(req.body);

        const { availableItems, outOfStockItems } = z
          .object({
            availableItems: ItemsSchema,
            outOfStockItems: ItemsSchema,
          })
          .parse(
            (await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/stock_service`, req.body))
              .data,
          );

        if (availableItems.length === 0) {
          res.status(405).end('Out of stock');
        }

        const order = await prisma.order.create({
          data: {
            userId: req.body.userId,
            total: availableItems.length,
            status: req.body.status, // 'pending'
            orderItems: {
              createMany: {
                data: availableItems.map((item) => {
                  return {
                    ...item,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  };
                }),
              },
            },
          },
          include: {
            orderItems: true,
          },
        });

        res.status(200).json({ order, outOfStockItems });
        break;

      case 'reject':

        OrderSchema.parse(req.body);

        await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/stock_service`, req.body)        

        await prisma.orderItem.deleteMany({
          where: {
            orderId: req.body.id,
          },
        });

        await prisma.order.delete({
          where: {
            id: req.body.id,
          },
        });

        res.status(200).end();
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
