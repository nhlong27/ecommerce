import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import fs from 'fs'
AWS.config.update({
  accessKeyId: 'AKIAU473WFTPOXDFCN4H',
  secretAccessKey: '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',
});

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
  }

  if (session && req.method === 'POST') {
    try {
      const s3 = new AWS.S3();

      const image = req.body;

      const uploadResponse = await s3
        .putObject({
          Bucket: process.env.AWS_BUCKET_NAME as string,
          Key: session.user.email as string,
          Body: image,
        })
        .promise();

      console.log('Image uploaded successfully:', uploadResponse);

      res.status(200).end();
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  } else if (session && req.method === 'GET') {
    try {
      const s3 = new AWS.S3();

      s3.getObject({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: session.user.email as string,
      })
        .promise()
        .then((data) => {
          console.log(data);

          res.status(200).send(data.Body);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error retrieving image:', error);
      res.status(500).json({ error: 'Error retrieving image' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
