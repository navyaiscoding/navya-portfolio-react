import { Redis } from '@upstash/redis'

// Vercel's Upstash integration injects KV_REST_API_*; Upstash's own
// dashboard uses UPSTASH_REDIS_REST_*. Accept either.
// Read lazily (on first use), not at import time, so it doesn't matter
// whether dotenv has loaded yet when this module is evaluated.
let redis: Redis | null = null

function getClient(): Redis | null {
  if (redis) return redis
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  if (url && token) redis = new Redis({ url, token })
  return redis
}

const VIEWS_KEY = 'portfolio:views'
const LIKES_KEY = 'portfolio:likes'

export interface SiteStats {
  views: number
  likes: number
}

function requireRedis(): Redis {
  const client = getClient()
  if (!client) {
    throw new Error(
      'Stats store is not configured: set KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)',
    )
  }
  return client
}

export async function getStats(): Promise<SiteStats> {
  const db = requireRedis()
  const [views, likes] = await Promise.all([db.get<number>(VIEWS_KEY), db.get<number>(LIKES_KEY)])
  return { views: views ?? 0, likes: likes ?? 0 }
}

// INCR/DECR are atomic in Redis, so concurrent visitors can't clobber each other.
export async function incrementViews(): Promise<number> {
  return requireRedis().incr(VIEWS_KEY)
}

export async function incrementLikes(): Promise<number> {
  return requireRedis().incr(LIKES_KEY)
}

export async function decrementLikes(): Promise<number> {
  const db = requireRedis()
  const next = await db.decr(LIKES_KEY)
  if (next < 0) {
    await db.set(LIKES_KEY, 0)
    return 0
  }
  return next
}
