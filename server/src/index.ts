import { app } from './app.js'
import { config, smtpIsConfigured } from './config/env.js'

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`)
  console.log(`CORS allowed origin: ${config.corsOrigin}`)
  console.log(
    smtpIsConfigured
      ? 'SMTP configured — contact form emails will be sent for real.'
      : 'SMTP not configured — contact form submissions will be logged to the console (dev mode).',
  )
})
