import prisma from '@/lib/prisma';
import { mongo } from '../../mongoose/client';
import { BookDocument, BookModel } from '../../mongoose/models/book.model';

import connectMongo from '@/lib/mongodb';
import { redis } from '@/lib/redis';
import { getOrSetCache } from '@/utils/getOrSetCache';
import { ProductDocument, ProductModel } from '../../mongoose/models/product.model';
import { ProductType } from '@/features/product/types';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    books: async (_: any, args: any) => {
      const data = await getOrSetCache('books', async () => {
        await connectMongo();
        const books = await BookModel.find(args.title, {}, { lean: true });
        return books;
      });
      if (!data) throw new Error('Unable to get resources');
      return data;
    },
    products: async (_: any, args: any) => {
      const data = await getOrSetCache('products', async () => {
        await connectMongo();
        const products = await ProductModel.find().lean();
        return products;
      });
      if (!data) throw new Error('Unable to get resources');
      return data;
    },
    stripe_secret: async (_: any, args: any) => {
      const intent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return intent.client_secret
    },
    // Mutation: {
      // updateUser: async (_: any, args: any) => {
      //   const updateUser = await prisma.user.update({
      //     where: {
      //       email: args.email,
      //     },
      //     data: {
      //       name: args.name,
      //     },
      //   });
      //   return updateUser;
      // },
      // addBook: async (_: any, args: Omit<BookDocument, 'createdAt' | 'updatedAt'>) => {
      //   await connectMongo();
      //   const newBook = await BookModel.create({ ...args });
      //   await redis.connect();
      //   await redis.del('books');
      //   await redis.disconnect();
      //   if (!newBook) throw new Error('Unable to create resource');
      //   return newBook;
      // },
      // addProduct: async (
      //   _: any,
      //   { input }: { input: Omit<ProductDocument, 'createdAt' | 'updatedAt'> },
      // ) => {
      //   await connectMongo();
      //   const newProduct = await ProductModel.create({ ...input });
      //   console.log(newProduct._id.toString());
      //   await redis.connect();
      //   await redis.del('products');
      //   await redis.disconnect();
      //   if (!newProduct) throw new Error('Unable to create resource');
      //   return newProduct as ProductType;
      // },
    // },
  },
};
