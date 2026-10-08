import type { NextFunction, Request, Response } from 'express'
import { config } from '../config/env.js'
import { decrementLikes, getStats, incrementLikes, incrementViews } from '../services/stats.js'
import { ApiError } from '../utils/ApiError.js'

// Small wrapper so each handler only states what it does; any failure
// (missing Redis config, network) becomes one consistent 503.
function handle(action: (res: Response) => Promise<void>) {
  return async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await action(res)
    } catch (err) {
      console.error('stats failed:', err)
      // In dev, surface the real cause in the response so it's visible in curl/Network.
      const detail = !config.isProduction && err instanceof Error ? ` (${err.message})` : ''
      next(new ApiError(503, `Stats are unavailable right now.${detail}`))
    }
  }
}

export const readStats = handle(async (res) => {
  // Counts change constantly — don't let the browser/CDN serve a stale copy.
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json({ ok: true, ...(await getStats()) })
})

export const recordView = handle(async (res) => {
  res.status(200).json({ ok: true, views: await incrementViews() })
})

export const addLike = handle(async (res) => {
  res.status(200).json({ ok: true, likes: await incrementLikes() })
})

export const removeLike = handle(async (res) => {
  res.status(200).json({ ok: true, likes: await decrementLikes() })
})
