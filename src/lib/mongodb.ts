// import { MongoClient } from 'mongodb'

const { MONGO_URL } = process.env
if (!MONGO_URL) {
  throw new Error(
    'Please define the MONGO_URL environment variable inside .env.local'
  )
}

// const options = {
//   // useUnifiedTopology: true,
//   // useNewUrlParser: true,
// }

// let client
// let clientPromise

// if (process.env.NODE_ENV === 'development') {
//   //@ts-ignore
//   if (!global.mongo) {
//     client = new MongoClient(MONGO_URL, options)
//     //@ts-ignore
//     global.mongo = client.connect()
//   }
//   //@ts-ignore
//   clientPromise = global.mongo as Promise<MongoClient>
// } else {
//   client = new MongoClient(MONGO_URL, options)
//   clientPromise = client.connect() as Promise<MongoClient>
// }

// export default clientPromise as Promise<MongoClient>


import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(MONGO_URL as string);

export default connectMongo;