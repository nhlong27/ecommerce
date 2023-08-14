import prisma from '@/lib/prisma';
import { SHA256 } from 'crypto-js';

type CredentialsType = {
  email: string;
  password: string;
  name?: string;
};

export async function signInWithCredentials(credentials: CredentialsType) {
  const user = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  });
  if (user) {
    if (user.password !== SHA256(credentials.password).toString()) {
      return null;
    }
    const { password, ...userWithoutPass } = user;
    return userWithoutPass;
  } else {
    return null;
  }
}
