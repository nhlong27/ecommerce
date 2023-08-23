import prisma from '@/lib/prisma';

import connectMongo from '@/lib/mongodb';
import { getOrSetCache } from '@/utils/getOrSetCache';
import { ProductModel } from '../../mongoose/models/product.model';
import { SHA256 } from 'crypto-js';
import { SortOrder } from 'mongoose';

export const resolvers = {
  Query: {
    product: async (_: any, args: any) => {
      await connectMongo();
      const product = await ProductModel.findOne({ sku: args.sku }).lean();
      return product;
    },
    products: async (_: any, args: any) => {
      const data = await getOrSetCache(
        `${args.pageIndex ?? '1'}${args.category ?? 'coffee_tea'}${args.price ?? '10'}${
          args.brand
        }${args.sortBy}${args.keyword}`,
        async () => {
          await connectMongo();
          const filterCriteria: Record<string, string | number | Record<string, string>> = {};
          let sortOptions:
            | string
            | { [key: string]: SortOrder | { $meta: 'textScore' } }
            | [string, SortOrder][]
            | null
            | undefined = {};
          if (args.category) {
            filterCriteria.category = args.category;
          }
          if (args.brand) {
            filterCriteria.title = { $regex: args.brand, $options: 'i' };
          }
          if (args.price) {
            filterCriteria.price = { $lte: args.price };
          }

          if (args.sortBy && args.sortBy === 'best_rating') {
            sortOptions.score = 1;
          }
          if (args.sortBy && args.sortBy === 'most_reviewed') {
            sortOptions.n_o_reviews = 1;
          }

          const itemsPerPage = 12;
          const skipCount = (args.pageIndex - 1) * itemsPerPage;

          if (args.keyword) {
            const products = await ProductModel.find({
              category: args.category,
              title: { $regex: args.keyword, $options: 'i' },
            })
              .skip(skipCount)
              .limit(itemsPerPage)
              .sort(sortOptions)
              .lean();
            console.log(skipCount, products);
            return { products: products, count: products.length };
          } else {
            const count = await ProductModel.countDocuments(filterCriteria);
            const products = await ProductModel.find(filterCriteria)
              .skip(skipCount)
              .limit(itemsPerPage)
              .sort(sortOptions)
              .lean();

            return { products: products, count: count };
          }
        },
      );
      if (!data) throw new Error('Unable to get resources');
      return data;
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
      // cartItems = [] if no cartItems
      return cartItems;
    },
    order: async (_: any, args: any) => {
      const order = await prisma.order.findUnique({
        where: {
          id: parseInt(args.orderId),
        },
        include: {
          orderItems: true,
        },
      });
      if (!order) throw new Error('Order with that id does not exist');
      return { ...order };
    },
    orders: async (_: any, args: any) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!existingUser) throw new Error('User with that email does not exist');
      const orders = await prisma.order.findMany({
        where: {
          userId: existingUser.id,
        },
      });
      return orders;
    },
    user: async (_: any, args: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!user) throw new Error('User with that email does not exist');
      return { ...user };
    },
    paymentDetails: async (_: any, args: any) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!existingUser) throw new Error('User with that email does not exist');
      const paymentDetails = await prisma.paymentDetails.findMany({
        where: {
          userId: existingUser.id,
        },
      });
      return paymentDetails;
    },
    reviews: async (_: any, args: any) => {
      const reviews = await prisma.review.findMany({
        where: {
          productId: args.productId,
        },
      });
      return reviews;
    },
  },
  Mutation: {
    updateUser: async (_: any, args: any) => {
      let updateUser;
      if (args.password) {
        const newPassword = SHA256(args.password).toString();

        updateUser = await prisma.user.update({
          where: {
            email: args.email,
          },
          data: {
            name: args.name,
            password: newPassword,
          },
        });
      } else {
        updateUser = await prisma.user.update({
          where: {
            email: args.email,
          },
          data: {
            name: args.name,
          },
        });
      }
      return updateUser;
    },
    addUser: async (_: any, args: any) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (existingUser) throw new Error('User with that email already exists');
      const newPassword = SHA256(args.password).toString();
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          emailVerified: false,
          password: newPassword,
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
    addReview: async (_: any, args: any) => {
      const owner = await prisma.user.findFirst({
        where: {
          email: args.userEmail,
        },
      });
      if (!owner) throw new Error('User with that email does not exist');
      const newReview = await prisma.review.create({
        data: {
          userId: owner.id,
          userEmail: args.userEmail,
          productId: args.productId,
          rating: args.rating,
          description: args.description,
        },
      });

      const reviews = await prisma.review.findMany({
        where: {
          productId: args.productId,
        },
      });

      let score = 0;
      let n_o_reviews = 0;
      reviews.forEach((review) => {
        score += review.rating;
        n_o_reviews += 1;
      });
      score = score / n_o_reviews;
      score = Math.round(score * 100) / 100;

      await connectMongo();

      const product = await ProductModel.findOneAndUpdate(
        { sku: args.productId },
        {
          score: score,
          n_o_reviews: n_o_reviews,
        },
        { new: true },
      );
      return newReview;
    },
    updateProduct: async (_: any, args: any) => {
      let product = 0; // do nothing
      return product;
    },
    deleteCartItem: async (_: any, args: any) => {
      const deletedCartItem = await prisma.cartItem.delete({
        where: {
          id: Number(args.id),
        },
      });
      return deletedCartItem;
    },
  },
};
