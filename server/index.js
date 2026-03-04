import express from 'express'
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json({ limit: '100kb' }))

const {
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  SENDGRID_TO_EMAIL,
} = process.env

if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL || !SENDGRID_TO_EMAIL) {
  console.warn('Missing SendGrid environment variables.')
}

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY)
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {}
  const errors = []

  if (!name || !String(name).trim()) errors.push('name')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) errors.push('email')
  if (!message || !String(message).trim()) errors.push('message')

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors })
  }

  if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL || !SENDGRID_TO_EMAIL) {
    return res.status(500).json({ success: false })
  }

  const plainText = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : 'Phone: (not provided)',
    '',
    message,
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone ? phone : '(not provided)'}</p>
      <p><strong>Message:</strong></p>
      <p>${String(message).replace(/\n/g, '<br />')}</p>
    </div>
  `

  try {
    await sgMail.send({

      to: email || SENDGRID_TO_EMAIL,
      from: SENDGRID_FROM_EMAIL,
      subject: `New Contact from ${name}`,
      replyTo: email,
      text: plainText,
      html,
    })

    return res.json({ success: true })
  } catch (error) {
    console.error('SendGrid error:', error)
    return res.status(500).json({ success: false })
  }
})

app.listen(port, () => {
  console.log(`Contact server listening on port ${port}`)
})
