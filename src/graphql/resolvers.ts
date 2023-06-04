import prisma from '@/lib/prisma'

export const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
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
  },
}
