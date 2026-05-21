import express from 'express'
import nodemailer from 'nodemailer'
import Message from '../models/Message.js'

const router = express.Router()

// ── Nodemailer Transporter (Gmail) ───────────────────────────
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,   // amananand1044@gmail.com
      pass: process.env.GMAIL_PASS,   // Gmail App Password (16-char)
    },
  })
}

// ── Email Template ────────────────────────────────────────────
const buildEmailHTML = ({ name, email, message }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #050d1a; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #0d1b2e; border: 1px solid rgba(0,212,255,0.2); border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0070d2, #00d4ff22); padding: 32px 36px; border-bottom: 1px solid rgba(0,212,255,0.2); }
    .header h1 { margin: 0; color: #00d4ff; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0; color: #8ea8c3; font-size: 13px; }
    .body { padding: 32px 36px; }
    .field { margin-bottom: 24px; }
    .label { font-size: 11px; font-weight: 600; color: #00d4ff; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .value { color: #e2e8f0; font-size: 15px; line-height: 1.6; background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.12); border-radius: 8px; padding: 12px 16px; }
    .message-box { white-space: pre-wrap; }
    .footer { background: rgba(0,0,0,0.3); padding: 20px 36px; text-align: center; color: #4a6785; font-size: 12px; border-top: 1px solid rgba(0,212,255,0.1); }
    .badge { display: inline-block; background: rgba(0,112,210,0.2); color: #00d4ff; border: 1px solid rgba(0,212,255,0.3); border-radius: 20px; padding: 3px 12px; font-size: 12px; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <span class="badge">⚡ Portfolio Contact</span>
      <h1>New Message Received</h1>
      <p>Someone reached out through your Salesforce Portfolio</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">👤 From</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">📧 Email</div>
        <div class="value"><a href="mailto:${email}" style="color:#00d4ff;text-decoration:none;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">💬 Message</div>
        <div class="value message-box">${message}</div>
      </div>
    </div>
    <div class="footer">
      Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })} IST<br>
      Aman Anand • Portfolio Contact System
    </div>
  </div>
</body>
</html>
`

// ── POST /api/contact ─────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields (name, email, message) are required.' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    // 1️⃣ Save to MongoDB (if connected)
    let savedDoc = null
    try {
      savedDoc = await Message.create({ name, email, message })
      console.log(`[Contact] Saved to DB — id: ${savedDoc._id}`)
    } catch (dbErr) {
      console.warn('[Contact] DB save skipped (no connection):', dbErr.message)
    }

    // 2️⃣ Send email notification
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const transporter = createTransporter()
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
          to: process.env.GMAIL_USER,          // sends to yourself: amananand1044@gmail.com
          replyTo: email,                        // reply goes directly to the sender
          subject: `⚡ New Contact: ${name} — Portfolio`,
          html: buildEmailHTML({ name, email, message }),
          text: `New message from ${name} (${email}):\n\n${message}`,
        })
        console.log(`[Contact] ✉️  Email sent to ${process.env.GMAIL_USER} from ${name} <${email}>`)
      } catch (mailErr) {
        console.error('[Contact] Email send failed:', mailErr.message)
        // Don't fail the whole request — still return success if DB save worked
      }
    } else {
      console.warn('[Contact] ⚠️  GMAIL_USER / GMAIL_PASS not set — email skipped.')
    }

    res.status(201).json({
      success: true,
      id: savedDoc?._id ?? null,
      message: 'Message received! Aman will get back to you soon.',
    })

  } catch (err) {
    console.error('[Contact] Error:', err)
    res.status(500).json({ error: 'Internal server error.' })
  }
})

export default router
