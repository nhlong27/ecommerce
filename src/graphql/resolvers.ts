import prisma from '@/lib/prisma'

export const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
  },
};
