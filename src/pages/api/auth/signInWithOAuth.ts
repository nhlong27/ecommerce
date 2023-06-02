import prisma from '@/lib/prisma';

type ProfileType = {
  email: string;
  name?: string;
  email_verified?: boolean;
  picture?: string;
}

export async function signInWithOAuth(profile:ProfileType) {
  const user = await prisma.user.findFirst({
    where: {
      email: profile.email,
    }
  })
  if (!user){
    const newUser = await prisma.user.create({
      data:{
      name: profile.name,
      email: profile.email,
      emailVerified: profile.email_verified,
      image: profile.picture,
      role: 'USER'
      }})
    return newUser
  }
  if (user){
    return user
  } else {
    return null
  }
}