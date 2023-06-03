import jwt from 'jsonwebtoken'

const secret = process.env.NEXTAUTH_SECRET!

const signJWT = (object: Record<any, any>, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, secret, {
    ...(options && options),
    // algorithm: 'HS256'
  })
}

const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret)
    return {
      valid: true,
      expired: false,
      decoded
    }
  }
  catch(e:any){
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null
    }
  }
}

export {signJWT, verifyJWT}