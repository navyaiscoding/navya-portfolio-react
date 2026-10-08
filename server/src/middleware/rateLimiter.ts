import rateLimit from 'express-rate-limit'

// Looser cap for view/like writes: 30 per IP per 15 minutes is plenty for a
// real visitor toggling a like, but blocks a casual spam loop.
export const statsRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests — please slow down.' },
})

// Caps abuse of the public contact endpoint: 5 submissions per IP per 15
// minutes. Rate limiting is a standard concern for any endpoint that's
// unauthenticated and triggers a side effect (here: sending an email).
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent — please try again in a few minutes.' },
})
