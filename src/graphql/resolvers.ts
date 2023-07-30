import prisma from '@/lib/prisma';
import { mongo } from '../../mongoose/client';
import { BookDocument, BookModel } from '../../mongoose/models/book.model';

import connectMongo from '@/lib/mongodb';
import { redis } from '@/lib/redis';
import { getOrSetCache } from '@/utils/getOrSetCache';
import { ProductDocument, ProductModel } from '../../mongoose/models/product.model';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import bcrypt from 'bcrypt';

export const resolvers = {
  Query: {
    product: async (_: any, args: any) => {
      const data = await getOrSetCache(args.sku, async () => {
        await connectMongo();
        const product = await ProductModel.findOne({ sku: args.sku }).lean();
        return product;
      });
      if (!data) throw new Error('Unable to get resources');
      return data;
    },
    products: async (_: any, args: any) => {
      const data = await getOrSetCache('products', async () => {
        await connectMongo();
        const products = await ProductModel.find({
          category: ['coffee_tea', 'energy_drink', 'juice_shake', 'sport_drink', 'water'],
        })
          .limit(100)
          .lean();
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
      return intent.client_secret;
    },
    cartItems: async (_: any, args: any) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!existingUser) throw new Error('User with that email does not exist');
      const cartItems = await prisma.cartItem.findMany({
        where: {
          userId: existingUser.id,
        },
      });
      return cartItems;
    },
  },
  Mutation: {
    updateUser: async (_: any, args: any) => {
      const updateUser = await prisma.user.update({
        where: {
          email: args.email,
        },
        data: {
          name: args.name,
        },
      });
      return updateUser;
    },
    addUser: async (_: any, args: any) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (existingUser) throw new Error('User with that email already exists');
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hashSync(args.password, salt);
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          emailVerified: false,
          password: hash,
        },
      });
      const { password, ...newUserWithoutPassword } = newUser;
      return newUserWithoutPassword;
    },
    addToCart: async (_: any, args: any) => {
      const owner = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!owner) throw new Error('User with that email does not exist');
      const existingCartItewm = await prisma.cartItem.findFirst({
        where: {
          userId: owner.id,
          productId: args.productId,
        },
      });
      if (existingCartItewm) {
        const updatedCartItem = await prisma.cartItem.update({
          where: {
            id: existingCartItewm.id,
          },
          data: {
            quantity: existingCartItewm.quantity + args.quantity,
            productImage: args.productImage,
          },
        });
        return updatedCartItem;
      }
      const newCartItem = await prisma.cartItem.create({
        data: {
          quantity: args.quantity,
          userId: owner.id,
          productId: args.productId,
          productTitle: args.productTitle,
          productPrice: args.productPrice,
          productCategory: args.productCategory,
          productSize: args.productSize,
          productImage: args.productImage,
          productQuantity: args.productQuantity,
        },
      });
      return newCartItem;
    },
  },
};
