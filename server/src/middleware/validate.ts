import type { NextFunction, Request, Response } from 'express'
import type { ZodTypeAny } from 'zod'

// A reusable middleware factory: pass it any zod schema and it returns an
// Express middleware that validates req.body against that schema. This is the
// pattern most real APIs use so route handlers never see malformed input.
export function validateBody(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      })
    }

    req.body = result.data
    next()
  }
}
