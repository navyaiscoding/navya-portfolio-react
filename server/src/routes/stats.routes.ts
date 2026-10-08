import { Router } from 'express'
import { addLike, readStats, recordView, removeLike } from '../controllers/stats.controller.js'
import { statsRateLimiter } from '../middleware/rateLimiter.js'

// Endpoints are deliberately single-segment (/api/stats, /api/likes): Vercel's
// catch-all function (api/[...path].ts) didn't match nested paths like
// /api/stats/view in production, which returned 404.

// GET  /api/stats  -> { views, likes }
// POST /api/stats  -> counts one visit
export const statsRouter = Router()
statsRouter.get('/', readStats)
// Writes are rate-limited so a script can't trivially spam the counters.
statsRouter.post('/', statsRateLimiter, recordView)

// POST /api/likes   -> add this visitor's like
// DELETE /api/likes -> remove it
export const likesRouter = Router()
likesRouter.post('/', statsRateLimiter, addLike)
likesRouter.delete('/', statsRateLimiter, removeLike)
