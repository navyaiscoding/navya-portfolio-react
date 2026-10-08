import { Router } from 'express'
import { addLike, readStats, recordView, removeLike } from '../controllers/stats.controller.js'
import { statsRateLimiter } from '../middleware/rateLimiter.js'

export const statsRouter = Router()

statsRouter.get('/', readStats)
// Writes are rate-limited so a script can't trivially spam the counters.
statsRouter.post('/view', statsRateLimiter, recordView)
statsRouter.post('/like', statsRateLimiter, addLike)
statsRouter.delete('/like', statsRateLimiter, removeLike)
