import { Router } from 'express'
import { submitContact } from '../controllers/contact.controller.js'
import { contactRateLimiter } from '../middleware/rateLimiter.js'
import { validateBody } from '../middleware/validate.js'
import { contactSchema } from '../schemas/contact.schema.js'

export const contactRouter = Router()

// Middleware chain reads left to right: rate-limit first (cheap, rejects
// abuse early), then validate the body shape, then run the actual handler.
contactRouter.post('/', contactRateLimiter, validateBody(contactSchema), submitContact)
