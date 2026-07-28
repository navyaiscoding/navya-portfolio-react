import type { NextFunction, Request, Response } from 'express'
import { config } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

// Express recognizes this as an error handler specifically because it takes
// 4 arguments (err, req, res, next) — that signature is what makes it run
// only when something calls next(err), instead of on every request.
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const status = err instanceof ApiError ? err.status : 500
  const message = err instanceof Error ? err.message : 'Unexpected error'

  if (!config.isProduction) {
    console.error(err)
  }

  res.status(status).json({ error: status === 500 ? 'Something went wrong on our end.' : message })
}
