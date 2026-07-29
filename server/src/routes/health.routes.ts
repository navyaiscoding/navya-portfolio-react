import { Router } from 'express'

export const healthRouter = Router()

// Simple liveness check — useful for uptime monitors and for confirming the
// server is reachable before you go debugging anything more complex.
healthRouter.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})
