import { app } from '../server/src/app.js'

// Catch-all Vercel serverless function: any request to /api/* lands here.
// Vercel passes the original request through with req.url intact (e.g.
// "/api/health"), so the Express app's existing route mounts
// (app.use('/api/health', ...) etc.) match exactly as they do locally —
// no route changes needed, this file is just an adapter.
export default app
