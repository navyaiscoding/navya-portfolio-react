import type { NextFunction, Request, Response } from 'express'
import { sendContactEmail } from '../services/mailer.js'
import { ApiError } from '../utils/ApiError.js'
import type { ContactInput } from '../schemas/contact.schema.js'

// Controllers hold the "what does this route actually do" logic. Keeping them
// separate from routing (which just says "POST /api/contact -> this function")
// is what lets each piece stay small and testable on its own.
export async function submitContact(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body as ContactInput
    await sendContactEmail(payload)
    res.status(200).json({ ok: true, message: 'Message received.' })
  } catch (err) {
    console.error('sendContactEmail failed:', err)
    next(new ApiError(502, 'Failed to deliver message — please try again shortly.'))
  }
}
