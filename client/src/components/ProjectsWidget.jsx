import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, ChevronRight, ArrowUpRight } from 'lucide-react'

const TECH_COLORS = {
  Python:      'badge-blue',
  ML:          'badge-purple',
  Pandas:      'badge-cyan',
  JavaScript:  'badge-yellow',
  'REST API':  'badge-cyan',
  CSS:         'badge-purple',
  HTML:        'badge-orange',
  React:       'badge-cyan',
  'Node.js':   'badge-green',
  Git:         'badge-orange',
  MongoDB:     'badge-green',
  Code:        'badge-gray',
}

function TechBadge({ tech }) {
  const cls = TECH_COLORS[tech] || 'badge-gray'
  return <span className={`badge ${cls}`}>{tech}</span>
}

function SkeletonRow() {
  return (
    <tr>
      {[36, 160, 140, 90, 70, 60, 72].map((w, i) => (
        <td key={i} style={{ padding: '10px 12px' }}>
          <div className="shimmer-bg" style={{ height: 11, width: w }} />
        </td>
      ))}
    </tr>
  )
}

const rowVariants = {
  hidden:  { opacity: 0, x: -10 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.07, duration: 0.3, ease: 'easeOut' } }),
}

export default function ProjectsWidget({ searchQuery, isRefreshing, repos, loading, stats }) {
  const [hoveredRow, setHoveredRow] = useState(null)

  const filtered = repos.filter((r) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return r.name.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.tech.some((t) => t.toLowerCase().includes(q))
  })

  const showSkeleton = loading || isRefreshing

  return (
    <div id="projects" className="sf-widget" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="sf-widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="sf-widget-title">Client Projects</span>
          <span className="sf-record-count">{showSkeleton ? '–' : filtered.length} Records</span>
        </div>
        <a
          href="https://github.com/aman-1044"
          target="_blank" rel="noopener noreferrer"
          className="sf-btn-ghost"
          style={{ fontSize: 11, padding: '3px 10px', textDecoration: 'none' }}
        >
          All Repos <ArrowUpRight size={10} />
        </a>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', flex: 1 }}>
        <table className="sf-table">
          <thead>
            <tr>
              <th style={{ width: 32 }}>#</th>
              <th>Project Name</th>
              <th>Tech Stack</th>
              <th>Type</th>
              <th>Status</th>
              <th>Stars</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {showSkeleton
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={`sk-${i}`} />)
                : filtered.length === 0
                ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
                      No projects match "<em>{searchQuery}</em>"
                    </td>
                  </tr>
                )
                : filtered.map((repo, i) => (
                  <motion.tr
                    key={repo.id}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    onHoverStart={() => setHoveredRow(repo.id)}
                    onHoverEnd={() => setHoveredRow(null)}
                    style={{
                      background: hoveredRow === repo.id ? 'var(--sf-row-hover)' : 'transparent',
                      borderLeft: hoveredRow === repo.id ? '3px solid var(--neon-cyan)' : '3px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--sf-muted)', fontFamily: 'Orbitron, sans-serif' }}>
                        {repo.index}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <a
                        href={repo.url} target="_blank" rel="noopener noreferrer"
                        style={{
                          fontWeight: 700, fontSize: 13,
                          color: 'var(--neon-cyan)',
                          textDecoration: 'none',
                          textShadow: 'none',
                          transition: 'text-shadow 0.2s',
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}
                        onMouseEnter={e => e.target.style.textShadow = 'var(--glow-cyan)'}
                        onMouseLeave={e => e.target.style.textShadow = 'none'}
                      >
                        {repo.name}
                      </a>
                      {repo.description && (
                        <p style={{ fontSize: 11, marginTop: 2, color: 'var(--sf-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180, fontFamily: 'Space Grotesk, sans-serif' }}>
                          {repo.description}
                        </p>
                      )}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {repo.tech.slice(0, 3).map((t) => <TechBadge key={t} tech={t} />)}
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--sf-muted)', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif' }}>
                      {repo.type}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span className="status-live">Live</span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        <Star size={11} style={{ color: 'var(--neon-yellow)' }} />
                        {repo.stars}
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <motion.a
                        href={repo.url} target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="sf-btn-ghost"
                        style={{ fontSize: 11, padding: '3px 8px', textDecoration: 'none' }}
                      >
                        View Code <ExternalLink size={9} />
                      </motion.a>
                    </td>
                  </motion.tr>
                ))
              }
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--sf-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: 'var(--neon-cyan)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          View Report <ChevronRight size={12} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
          {!loading && (
            <>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={10} style={{ color: 'var(--neon-yellow)' }} /> {stats.stars} stars
              </span>
              <span>·</span>
              <span>{stats.repoCount} public repos</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
