import prisma from '@/lib/prisma';

type ProfileType = {
  email: string;
  name?: string;
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
      name: profile.name ?? profile.email,
      email:profile.email,
      }})
    return newUser
  }
  if (user){
    return user
  } else {
    return null
  }
}