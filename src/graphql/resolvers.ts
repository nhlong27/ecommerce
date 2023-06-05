import prisma from '@/lib/prisma'
import { mongo } from '../../mongoose/client'
import { BookDocument, BookModel } from '../../mongoose/models/book.model'

import connectMongo from '@/lib/mongodb'
import { redis } from '@/lib/redis'
import { getOrSetCache } from '@/utils/getOrSetCache'

export const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    books: async (_: any, args: any) => {
      const data = await getOrSetCache('books', async () => {
        await connectMongo()
        const books = await BookModel.find(args.title, {}, { lean: true })
        return books
      })
      if (!data) 
        throw new Error('Unable to get resources')
      return data
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
      })
      return updateUser
    },
    addBook: async (
      _: any,
      args: Omit<BookDocument, 'createdAt' | 'updatedAt'>
    ) => {
      await connectMongo()
      const newBook = await BookModel.create({ ...args })
      await redis.connect();
      await redis.del('books')
      await redis.disconnect();
      if (!newBook)
        throw new Error('Unable to create resource')
      return newBook
    },
  },
}
