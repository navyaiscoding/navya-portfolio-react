import cors from 'cors'
import express from 'express'
import { config } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'
import { chatRouter } from './routes/chat.routes.js'
import { contactRouter } from './routes/contact.routes.js'
import { healthRouter } from './routes/health.routes.js'
import { competenciesRouter } from './routes/competencies.routes.js'
import { likesRouter, statsRouter } from './routes/stats.routes.js'

export const app = express()

// --- Global middleware -----------------------------------------------------
// Runs on every request, in order, before any route handler.
app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())

// --- Routes ------------------------------------------------------------
app.use('/api/health', healthRouter)
app.use('/api/contact', contactRouter)
app.use('/api/competencies', competenciesRouter)
app.use('/api/stats', statsRouter)
app.use('/api/likes', likesRouter)
app.use('/api/chat', chatRouter)

// --- Fallbacks -----------------------------------------------------------
// notFound only runs if no route above matched. errorHandler only runs when
// something calls next(err) — Express detects it by its 4-argument signature.
app.use(notFound)
app.use(errorHandler)
