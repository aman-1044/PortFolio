import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import contactRouter from './routes/contact.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true)
    
    const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin)
    const isAllowedFrontend = origin === process.env.FRONTEND_URL
    
    if (isLocalhost || isAllowedFrontend) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))

// ── Routes ──────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', ts: new Date() }))
app.use('/api/contact', contactRouter)

// 404
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

// ── MongoDB ─────────────────────────────────────────────────
const startServer = async () => {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('✅ MongoDB connected')
    } catch (err) {
      console.error('❌ MongoDB connection failed:', err.message)
      console.warn('⚠️  Running without DB — contact messages will NOT be persisted.')
    }
  } else {
    console.warn('⚠️  MONGODB_URI not set — running without database.')
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}

startServer()
