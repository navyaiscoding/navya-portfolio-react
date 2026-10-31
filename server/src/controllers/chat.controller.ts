import type { NextFunction, Request, Response } from 'express'
import { config } from '../config/env.js'
import type { ChatInput } from '../schemas/chat.schema.js'
import { askAboutNavya, chatIsConfigured } from '../services/chat.js'
import { ApiError } from '../utils/ApiError.js'

export async function chat(req: Request, res: Response, next: NextFunction) {
  if (!chatIsConfigured()) {
    return next(new ApiError(503, 'The assistant is not available right now.'))
  }
  try {
    const { messages } = req.body as ChatInput
    const reply = await askAboutNavya(messages)
    res.status(200).json({ ok: true, reply })
  } catch (err) {
    console.error('chat failed:', err)
    // In dev, include the real cause so it's visible in curl/Network.
    const detail = !config.isProduction && err instanceof Error ? ` (${err.message})` : ''
    next(new ApiError(503, `The assistant is not available right now.${detail}`))
  }
}
