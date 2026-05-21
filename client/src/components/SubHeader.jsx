import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, RefreshCw, ChevronDown, ExternalLink, Eye } from 'lucide-react'

function formatDateTime(date) {
  return new Intl.DateTimeFormat('en-US', {
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

  const handleRefresh = async () => {
    if (isRefreshing) return
    onRefresh()
    setLastRefresh(new Date())
  }

  const daysSince = Math.floor((now - lastRefresh) / 86400000)
  const timeSince = daysSince === 0 ? 'today' : `${daysSince} day${daysSince > 1 ? 's' : ''} ago`

  return (
    <div
      style={{
        background: 'var(--sf-bg)',
        borderBottom: '1px solid var(--sf-border)',
      }}
      className="px-4 py-2"
    >
      {/* Row 1: Breadcrumb + Timestamp + Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1">
          <span className="text-sf-muted text-xs font-medium">Dashboard</span>
          <ChevronRight size={12} color="var(--sf-muted)" />
          <span className="text-sf-text text-xs font-semibold">Aman Anand Portfolio</span>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="sf-btn-ghost py-1 px-3 text-xs flex items-center gap-1">
            <ExternalLink size={12} />
            Open
            <ChevronDown size={11} />
          </button>

          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="sf-btn-primary py-1 px-3 text-xs flex items-center gap-1.5"
            style={{ background: 'var(--sf-blue)' }}
          >
            <motion.span
              animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={isRefreshing ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : {}}
            >
              <RefreshCw size={12} />
            </motion.span>
            Refresh
          </motion.button>

          <button className="sf-btn-ghost py-1 px-2 text-xs">
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* Row 2: Status bar */}
      <div className="flex items-center gap-3 mt-1 flex-wrap">
        <AnimatePresence mode="wait">
          {isRefreshing ? (
            <motion.span
              key="refreshing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs"
              style={{ color: 'var(--sf-blue-lt)' }}
            >
              ⟳ Refreshing dashboard...
            </motion.span>
          ) : (
            <motion.span
              key="refreshed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs"
              style={{ color: 'var(--sf-muted)' }}
            >
              Last refreshed {timeSince}.{' '}
              <button
                onClick={handleRefresh}
                className="transition-colors"
                style={{ color: 'var(--sf-blue-lt)' }}
              >
                Refresh this dashboard
              </button>
            </motion.span>
          )}
        </AnimatePresence>

        <span className="text-sf-muted text-xs">•</span>

        <span className="text-xs" style={{ color: 'var(--sf-muted)' }}>
          As of {formatDateTime(now)}
        </span>

        <span className="text-sf-muted text-xs">•</span>

        <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--sf-muted)' }}>
          <Eye size={11} />
          <span>Viewing as </span>
          <strong className="text-white">Aman Anand</strong>
          <button className="text-xs ml-0.5" style={{ color: 'var(--sf-blue-lt)' }}>
            [Change]
          </button>
        </span>
      </div>
    </div>
  )
}
