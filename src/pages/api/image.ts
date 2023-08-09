import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';
import multer from 'multer';
import fs from 'fs';
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Configure multer for handling file uploads
const upload = multer({
  dest: './uploads', // Destination folder to save the uploaded files
});

// Define the API route handler for file uploads
export const config = {
  api: {
    bodyParser: false, // Disable the built-in bodyParser to use multer instead
  },
};

function generateRandomString(length: number) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
}

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest & { [key: string]: any }, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
  }

  if (session && req.method === 'POST') {
    try {
      const s3 = new AWS.S3();

      // const image = req.body;
      await runMiddleware(req, res, upload.single("image"));
      const file = req.file;
      const stream = fs.createReadStream(file.path)

      let key = generateRandomString(10);

      const uploadResponse = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME as string,
          Key: key,
          Body: stream,
        })
        .promise();

      console.log('Image uploaded successfully:', uploadResponse);

      const updatedUser = await prisma.user.update({
        where: {
          email: session.user.email as string,
        },
        data: {
          image: key,
        },
      });

      res.status(200).json({ imageURL: key });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  }
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
