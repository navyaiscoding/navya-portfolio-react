import nodemailer from 'nodemailer'
import { config, smtpIsConfigured } from '../config/env.js'
import type { ContactInput } from '../schemas/contact.schema.js'

// Real transporter, used once SMTP_HOST/USER/PASS are set in .env (e.g. a
// Gmail app password, or a free Mailtrap/Ethereal test inbox).
const transporter = smtpIsConfigured
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: { user: config.smtp.user, pass: config.smtp.pass },
    })
  : null

export async function sendContactEmail(payload: ContactInput): Promise<void> {
  const { name, email, message } = payload

  if (!transporter) {
    // Dev mode fallback: no SMTP configured yet, so just log what *would*
    // have been sent. This keeps the API fully runnable while you're still
    // learning, without requiring real email credentials.
    console.log('\n📬 [DEV MODE] Contact form submission (no SMTP configured, not actually sent):')
    console.log({ name, email, message, to: config.contactToEmail || '(set CONTACT_TO_EMAIL)' })
    return
  }

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${config.smtp.user}>`,
    to: config.contactToEmail,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `${message}\n\n— ${name} (${email})`,
  })
}
