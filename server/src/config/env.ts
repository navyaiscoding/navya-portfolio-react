import 'dotenv/config'

// Centralizing config here means every other file imports typed values instead
// of reading process.env (and its `string | undefined` types) all over the place.
export const config = {
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  contactToEmail: process.env.CONTACT_TO_EMAIL ?? '',
  smtp: {
    host: process.env.SMTP_HOST ?? '',
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
  },
  // Powers the "ask about Navya" chat bot. Without a key the endpoint answers 503
  // and the frontend hides the chat bubble.
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY ?? '',
    model: process.env.CHAT_MODEL ?? 'claude-haiku-5-5',
  },
  isProduction: process.env.NODE_ENV === 'production',
}

export const smtpIsConfigured =
  config.smtp.host.length > 0 && config.smtp.user.length > 0 && config.smtp.pass.length > 0
