// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  age: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {id} = req.query
  if (!id || typeof id !=="string")
    return res.status(400)
  
  return res.status(200).json({ name: id, age: 20 })
}
