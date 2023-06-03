import prisma from '@/lib/prisma';


type CredentialsType = {
  email: string;
  password: string;
  name?: string;
}

export async function signInWithCredentials(credentials:CredentialsType) {
  const user = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    }
  })
  if (!user){
    const newUser = await prisma.user.create({
      data:{
        name: credentials.name as string,
        email:credentials.email,
        password: credentials.password,
        emailVerified: false,
      }})
    const {password, ...newUserWithoutPass} = newUser;
    return newUserWithoutPass;
  }
  if (user){
    //TODO: bcrypt 
    const {password, ...userWithoutPass} = user;
    return userWithoutPass
  } else {
    return null
  }
}