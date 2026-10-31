import { z } from 'zod'

// The client sends the whole (short) conversation each time because the API is
// stateless. Caps keep cost and abuse bounded: few messages, short messages,
// and the last one must be from the visitor.
export const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(500),
      }),
    )
    .min(1)
    .max(10)
    .refine((msgs) => msgs[msgs.length - 1].role === 'user', {
      message: 'The last message must come from the user',
    }),
})

export type ChatInput = z.infer<typeof chatSchema>
