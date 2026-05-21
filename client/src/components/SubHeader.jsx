import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, RefreshCw, ChevronDown, ExternalLink, Eye } from 'lucide-react'

function formatDateTime(date) {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  }).format(date)
}

export default function SubHeader({ onRefresh, isRefreshing }) {
  const [now, setNow] = useState(new Date())
  const [lastRefresh, setLastRefresh] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    if (isRefreshing) return
    onRefresh()
    setLastRefresh(new Date())
  }

  const daysSince = Math.floor((now - lastRefresh) / 86400000)
  const timeSince = daysSince === 0 ? 'today' : `${daysSince} day${daysSince > 1 ? 's' : ''} ago`

  return (
    <div style={{
      background: 'var(--sf-bg)',
      borderBottom: '1px solid var(--sf-border)',
      padding: '8px 16px',
    }}>
      {/* Row 1 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--sf-muted)', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif' }}>Dashboard</span>
          <ChevronRight size={12} color="var(--sf-muted)" />
          <span style={{ color: 'var(--sf-text)', fontSize: 12, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>
            Aman Anand Portfolio
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="sf-btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }}>
            <ExternalLink size={11} /> Open <ChevronDown size={11} />
          </button>

          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="sf-btn-primary"
            style={{ fontSize: 12, padding: '5px 14px' }}
          >
            <motion.span
              animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={isRefreshing ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : {}}
              style={{ display: 'inline-flex' }}
            >
              <RefreshCw size={12} />
            </motion.span>
            Refresh
          </motion.button>

          <button className="sf-btn-ghost" style={{ padding: '5px 8px' }}>
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* Row 2 — status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
        <AnimatePresence mode="wait">
          {isRefreshing ? (
            <motion.span key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontSize: 12, color: 'var(--neon-cyan)', fontFamily: 'Space Grotesk, sans-serif' }}>
              ⟳ Refreshing dashboard...
            </motion.span>
          ) : (
            <motion.span key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontSize: 12, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
              Last refreshed {timeSince}.{' '}
              <button onClick={handleRefresh}
                style={{ color: 'var(--neon-cyan)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif' }}>
                Refresh this dashboard
              </button>
            </motion.span>
          )}
        </AnimatePresence>

        <span style={{ color: 'var(--sf-muted)', fontSize: 12 }}>•</span>
        <span style={{ fontSize: 12, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
          As of {formatDateTime(now)}
        </span>
        <span style={{ color: 'var(--sf-muted)', fontSize: 12 }}>•</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
          <Eye size={11} />
          Viewing as{' '}
          <strong style={{ color: 'var(--sf-text)' }}>Aman Anand</strong>
          <button style={{ color: 'var(--neon-cyan)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif' }}>
            [Change]
          </button>
        </span>
      </div>
    </div>
  )
}
