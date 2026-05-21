import express from 'express'
import Message from '../models/Message.js'

const router = express.Router()

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields (name, email, message) are required.' })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    const doc = await Message.create({ name, email, message })
    console.log(`[Contact] New message from ${name} <${email}> at ${doc.createdAt}`)

    res.status(201).json({ success: true, id: doc._id })
  } catch (err) {
    console.error('[Contact] Error:', err)
    res.status(500).json({ error: 'Internal server error.' })
  }
})

export default router
