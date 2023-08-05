import { redis } from "@/lib/redis"

export async function getOrSetCache (key: string, cb: ()=> Promise<any>) {
  await redis.connect()
  const cache = await redis
    .get(key)
    .catch((error) => console.log(error))

  if (cache != null) {
    console.log('Cache hit')
    await redis.disconnect()
    return JSON.parse(cache)
  } else {
    console.log('Cache miss')
    const data = await cb();
    await redis.set(key, JSON.stringify(data), {
      EX: 3600,
      NX: true 
    })
    await redis.disconnect()
    return data
  }
}