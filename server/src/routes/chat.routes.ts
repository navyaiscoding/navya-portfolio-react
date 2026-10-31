import { Router } from 'express'
import { chat } from '../controllers/chat.controller.js'
import { chatRateLimiter } from '../middleware/rateLimiter.js'
import { validateBody } from '../middleware/validate.js'
import { chatSchema } from '../schemas/chat.schema.js'

export const chatRouter = Router()

// Every call costs real money (a paid API), so rate-limit before anything else.
chatRouter.post('/', chatRateLimiter, validateBody(chatSchema), chat)
