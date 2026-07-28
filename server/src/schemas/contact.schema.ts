import { z } from 'zod'

// Zod gives us runtime validation *and* a TypeScript type for free — the schema
// is the single source of truth for what a valid request body looks like.
export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Must be a valid email address'),
  message: z.string().trim().min(1, 'Message is required').max(2000),
})

export type ContactInput = z.infer<typeof contactSchema>
