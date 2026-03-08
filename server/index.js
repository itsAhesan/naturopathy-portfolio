import express from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://drsmangal.com',
  'https://www.drsmangal.com',
  'https://naturopathy-portfolio.onrender.com',
]

const envAllowedOrigins = String(process.env.CORS_ORIGINS || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)

const allowedOrigins = envAllowedOrigins.length > 0 ? envAllowedOrigins : defaultAllowedOrigins

function normalizeOrigin(origin) {
  return String(origin || '').trim().replace(/\/$/, '')
}

const normalizedAllowedOrigins = new Set(allowedOrigins.map((origin) => normalizeOrigin(origin)))

// Apply CORS before JSON parsing so preflight and parser errors still include CORS headers.
app.use((req, res, next) => {
  const origin = normalizeOrigin(req.headers.origin)
  const isAllowedOrigin = origin && normalizedAllowedOrigins.has(origin)

  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(isAllowedOrigin ? 204 : 403)
  }

  return next()
})
// Parse JSON request bodies from the contact form.
app.use(express.json({ limit: '100kb' }))

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  ADMIN_EMAIL,
} = process.env

const smtpHost = String(EMAIL_HOST || '').trim()
const smtpPort = Number(String(EMAIL_PORT || '').trim())
const smtpUser = String(EMAIL_USER || '').trim()
const smtpPass = String(EMAIL_PASS || '').trim()
const adminEmail = String(ADMIN_EMAIL || '').trim()

const hasMailConfig = Boolean(
  smtpHost && smtpPort && smtpUser && smtpPass && adminEmail,
)

if (!hasMailConfig) {
  console.warn('Missing SMTP environment variables. Email sending is disabled.')
}

// SMTP transporter used for both admin and user emails.
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  requireTLS: smtpPort !== 465,
  // Render/Gmail sometimes resolve IPv6 first; forcing IPv4 can avoid ETIMEDOUT on connect.
  family: 4,
  connectionTimeout: 20000,
  greetingTimeout: 15000,
  socketTimeout: 30000,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
})

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())
}

const PHONE_RULES_BY_CODE = {
  '+91': { min: 10, max: 10 },
  '+1': { min: 10, max: 10 },
  '+44': { min: 9, max: 10 },
  '+61': { min: 9, max: 9 },
  '+49': { min: 10, max: 11 },
  '+33': { min: 9, max: 9 },
  '+34': { min: 9, max: 9 },
  '+971': { min: 9, max: 9 },
  '+966': { min: 9, max: 9 },
  '+65': { min: 8, max: 8 },
}

function normalizeDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function normalizeCountryCode(value) {
  const raw = String(value || '').trim()
  if (!raw) return ''
  return raw.startsWith('+') ? raw : `+${raw}`
}

function validatePhoneByCountryCode(phone, countryCode) {
  const rawPhone = String(phone || '').trim()
  if (!rawPhone) return { ok: true, normalized: '' }

  const normalizedCountryCode = normalizeCountryCode(countryCode)
  const rule = PHONE_RULES_BY_CODE[normalizedCountryCode]
  if (!rule) return { ok: false }

  const dialDigits = normalizeDigits(normalizedCountryCode)
  const fullDigits = normalizeDigits(rawPhone)
  if (!fullDigits || !fullDigits.startsWith(dialDigits)) return { ok: false }

  const localDigits = fullDigits.slice(dialDigits.length)
  if (localDigits.length < rule.min || localDigits.length > rule.max) return { ok: false }
  if (/^0+$/.test(localDigits)) return { ok: false }

  return { ok: true, normalized: `${normalizedCountryCode} ${localDigits}` }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const {
    name = '',
    email = '',
    phone = '',
    phoneCountryCode = '',
    message = '',
  } = req.body || {}

  const trimmedName = String(name).trim()
  const trimmedEmail = String(email).trim()
  const trimmedPhone = String(phone).trim()
  const trimmedPhoneCountryCode = String(phoneCountryCode).trim()
  const trimmedMessage = String(message).trim()

  const missingFields = []
  if (!trimmedName) missingFields.push('name')
  if (!trimmedEmail) missingFields.push('email')
  if (!trimmedMessage) missingFields.push('message')

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Failed to send message',
      missingFields,
    })
  }

  if (!isValidEmail(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Failed to send message',
    })
  }

  const phoneValidation = validatePhoneByCountryCode(trimmedPhone, trimmedPhoneCountryCode)
  if (!phoneValidation.ok) {
    return res.status(400).json({
      success: false,
      message: 'Failed to send message',
      invalidFields: ['phone'],
    })
  }

  const normalizedPhone = phoneValidation.normalized

  if (!hasMailConfig) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
    })
  }

  const adminBody = [
    'New Contact Form Submission',
    '----------------------------------------',
    '',
    `Name: ${trimmedName}`,
    `Email: ${trimmedEmail}`,
    `Phone: ${normalizedPhone || '(not provided)'}`,
    '',
    'Message:',
    trimmedMessage,
  ].join('\n')

  const userBody = [
    `Dear ${trimmedName},`,
    '',
    'Thank you very much for taking the time to contact us through our website.',
    'We have received your message and will get back to you as soon as possible.',
    '',
    'We appreciate your patience and trust.',
    '',
    'With gratitude,',
    'Dr. Sovan Mangal',
  ].join('\n')

  const safeName = escapeHtml(trimmedName)
  const safeEmail = escapeHtml(trimmedEmail)
  const safePhone = escapeHtml(normalizedPhone || 'Not provided')
  const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br />')

  const userHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank you for your message</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f7f4;font-family:Arial,sans-serif;color:#1f2937;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f3f7f4;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;background-color:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
            <tr>
              <td style="padding:28px 28px 20px;background:linear-gradient(135deg,#14532d,#166534);color:#ffffff;">
                <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.92;">Message Received</p>
                <h1 style="margin:0;font-size:26px;line-height:1.25;font-weight:700;">Thank you for reaching out</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 28px 8px;">
                <p style="margin:0 0 14px 0;font-size:16px;line-height:1.7;">Dear ${safeName},</p>
                <p style="margin:0 0 12px 0;font-size:16px;line-height:1.7;">Thank you very much for contacting us through our website. We are grateful for your trust.</p>
                <p style="margin:0 0 18px 0;font-size:16px;line-height:1.7;">Your message has been received successfully, and we will respond as soon as possible.</p>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f8faf8;border:1px solid #e5e7eb;border-radius:10px;">
                  <tr>
                    <td style="padding:16px 16px 10px;">
                      <p style="margin:0 0 10px 0;font-size:14px;font-weight:700;color:#14532d;">Your submitted details</p>
                      <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Name:</strong> ${safeName}</p>
                      <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Email:</strong> ${safeEmail}</p>
                      <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;"><strong>Phone:</strong> ${safePhone}</p>
                      <p style="margin:0;font-size:14px;line-height:1.6;"><strong>Message:</strong><br />${safeMessage}</p>
                    </td>
                  </tr>
                </table>

                <p style="margin:18px 0 0 0;font-size:15px;line-height:1.7;">With gratitude,<br /><strong>Dr. Sovan Mangal</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 24px;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#6b7280;">This is an automated confirmation email. Please do not reply to this message.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim()

  try {
    // Email 1: Notify admin about the incoming contact request.
    await transporter.sendMail({
      from: smtpUser,
      to: adminEmail,
      replyTo: trimmedEmail,
      subject: 'New Contact Form Submission',
      text: adminBody,
    })

    // Email 2: Confirm to the user that we received the message.
    await transporter.sendMail({
      from: smtpUser,
      to: trimmedEmail,
      subject: 'Thank you for your message',
      text: userBody,
      html: userHtml,
    })

    return res.json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Email sending error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
    })
  }
})

app.listen(port, () => {
  console.log(`Contact server listening on port ${port}`)
})
