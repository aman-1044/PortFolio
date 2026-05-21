import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, GitFork, ChevronRight, ArrowUpRight } from 'lucide-react'

// Tech tag color mapping
const TECH_COLORS = {
  Python:        'sf-pill-blue',
  ML:            'sf-pill-purple',
  Pandas:        'sf-pill-cyan',
  JavaScript:    'sf-pill-yellow',
  'REST API':    'sf-pill-cyan',
  CSS:           'sf-pill-purple',
  HTML:          'sf-pill-orange',
  React:         'sf-pill-cyan',
  'Node.js':     'sf-pill-green',
  Git:           'sf-pill-orange',
  MongoDB:       'sf-pill-green',
  Code:          'sf-pill-gray',
}

function TechBadge({ tech }) {
  const cls = TECH_COLORS[tech] || 'sf-pill-gray'
  return <span className={`sf-pill ${cls}`}>{tech}</span>
}

function SkeletonRow() {
  return (
    <tr>
      {[40, 160, 140, 90, 70, 80].map((w, i) => (
        <td key={i} className="px-3 py-3">
          <div
            className="shimmer-bg rounded"
            style={{ height: 12, width: w }}
          />
        </td>
      ))}
    </tr>
  )
}

const rowVariants = {
  hidden:  { opacity: 0, x: -12 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.07, duration: 0.35, ease: 'easeOut' } }),
}

export default function ProjectsWidget({ searchQuery, isRefreshing, repos, loading, stats }) {
  const [hoveredRow, setHoveredRow] = useState(null)

  const filtered = repos.filter((r) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      r.name.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.tech.some((t) => t.toLowerCase().includes(q))
    )
  })

  const showSkeleton = loading || isRefreshing

  return (
    <div id="projects" className="sf-widget flex flex-col h-full">
      {/* Header */}
      <div className="sf-widget-header">
        <div className="flex items-center gap-3">
          <span className="sf-widget-title">Client Projects</span>
          <span className="sf-record-count">{showSkeleton ? '–' : filtered.length} Records</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/aman-1044"
            target="_blank"
            rel="noopener noreferrer"
            className="sf-btn-ghost text-xs flex items-center gap-1"
          >
            All Repos <ArrowUpRight size={11} />
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="sf-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>#</th>
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
                    <td colSpan={7} className="px-4 py-8 text-center" style={{ color: 'var(--sf-muted)' }}>
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
                      background: hoveredRow === repo.id ? 'var(--sf-card-2)' : 'transparent',
                    }}
                  >
                    {/* Index */}
                    <td className="px-3 py-2.5">
                      <span className="text-xs font-bold" style={{ color: 'var(--sf-muted)' }}>
                        {repo.index}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-sm transition-colors hover:underline"
                          style={{ color: 'var(--sf-blue-lt)' }}
                        >
                          {repo.name}
                        </a>
                      </div>
                      {repo.description && (
                        <p
                          className="text-xs mt-0.5 truncate max-w-[180px]"
                          style={{ color: 'var(--sf-muted)' }}
                        >
                          {repo.description}
                        </p>
                      )}
                    </td>

                    {/* Tech */}
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 flex-wrap">
                        {repo.tech.slice(0, 3).map((t) => (
                          <TechBadge key={t} tech={t} />
                        ))}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-3 py-2.5">
                      <span className="text-xs" style={{ color: 'var(--sf-muted)' }}>
                        {repo.type}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-2.5">
                      <span className="sf-pill sf-pill-green">
                        <span
                          className="sf-status-dot"
                          style={{ background: 'var(--sf-green)', width: 6, height: 6, marginRight: 4 }}
                        />
                        Live
                      </span>
                    </td>

                    {/* Stars */}
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--sf-muted)' }}>
                        <Star size={11} style={{ color: '#FFB75D' }} />
                        {repo.stars}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-3 py-2.5">
                      <motion.a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="sf-btn-ghost text-xs flex items-center gap-1 w-fit"
                      >
                        View Code
                        <ExternalLink size={10} />
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
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--sf-border)' }}
      >
        <button
          className="flex items-center gap-1 text-xs font-semibold transition-colors hover:underline"
          style={{ color: 'var(--sf-blue-lt)' }}
        >
          View Report <ChevronRight size={12} />
        </button>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--sf-muted)' }}>
          {!loading && (
            <>
              <span className="flex items-center gap-1">
                <Star size={11} style={{ color: '#FFB75D' }} />
                {stats.stars} stars
              </span>
              <span>•</span>
              <span>{stats.repoCount} public repos</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
