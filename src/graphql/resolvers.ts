import prisma from '@/lib/prisma'
import { mongo } from '../../mongoose/client'
import { BookDocument, BookModel } from '../../mongoose/models/book.model'

import connectMongo from '@/lib/mongodb';

export const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    books: async (_: any, args: any) =>
    {
      await connectMongo();
      return await BookModel.find(args.title, {}, { lean: true })
    }
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
      })
      return updateUser
    },
    addBook: async (
      _: any,
      args: Omit<BookDocument, 'createdAt' | 'updatedAt'>
    ) => {
      await connectMongo();
      await BookModel.create({ ...args })
      return { ...args }
    },
  },
}
