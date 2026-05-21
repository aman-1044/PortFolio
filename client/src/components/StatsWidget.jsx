import { motion } from 'framer-motion'
import { FunnelChart, Funnel, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { Users, Star, FolderGit2 } from 'lucide-react'

const FUNNEL_DATA = [
  { name: 'Salesforce Developer', value: 100, color: '#0176D3' },
  { name: 'GitHub Repositories',  value: 75,  color: '#00d4ff' },
  { name: 'Community Stars',      value: 45,  color: '#00ff9d' },
  { name: 'Open to Work ✓',       value: 20,  color: '#FFB75D' },
]

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--sf-card-2)',
      border: '1px solid var(--sf-border)',
      borderRadius: 6, padding: '8px 14px', fontSize: 12,
      fontFamily: 'Space Grotesk, sans-serif', color: 'var(--sf-text)',
    }}>
      {payload[0].payload.name}
    </div>
  )
}

export default function StatsWidget({ stats, loading, isRefreshing }) {
  const show = !loading && !isRefreshing

  const statPills = [
    { icon: Users,      label: 'Followers', value: stats.followers, color: 'var(--neon-cyan)'   },
    { icon: Star,       label: 'Stars',     value: stats.stars,     color: 'var(--neon-yellow)' },
    { icon: FolderGit2, label: 'Repos',     value: stats.repoCount, color: 'var(--neon-green)'  },
  ]

  return (
    <div id="stats" className="sf-widget">
      <div className="sf-widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="sf-widget-title">Experience Stats</span>
          <span className="sf-record-count">Live</span>
        </div>
        <span className="status-live">GitHub Synced</span>
      </div>

      {/* Funnel Chart */}
      <div style={{ padding: '16px 16px 0' }}>
        {isRefreshing || loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            {[100, 80, 60, 40].map((w, i) => (
              <div key={i} className="shimmer-bg" style={{ height: 36, width: `${w}%`, borderRadius: 6 }} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <ResponsiveContainer width="100%" height={200}>
              <FunnelChart>
                <Tooltip content={<CustomTooltip />} />
                <Funnel
                  dataKey="value"
                  data={FUNNEL_DATA}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={900}
                >
                  {FUNNEL_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {FUNNEL_DATA.map((d) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'Space Grotesk, sans-serif' }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0, boxShadow: `0 0 6px ${d.color}` }} />
            <span style={{ color: 'var(--sf-muted)' }}>{d.name}</span>
          </div>
        ))}
      </div>

      {/* Stat pills */}
      <div style={{
        padding: '12px 16px 16px',
        borderTop: '1px solid var(--sf-border)',
        display: 'flex', gap: 8, flexWrap: 'wrap',
      }}>
        {statPills.map(({ icon: Icon, label, value, color }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.05, y: -2 }}
            style={{
              flex: 1, minWidth: 72,
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', borderRadius: 8,
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid var(--sf-border)',
              transition: 'box-shadow 0.2s',
            }}
          >
            <Icon size={14} color={color} />
            <div>
              {isRefreshing || loading ? (
                <div className="shimmer-bg" style={{ width: 24, height: 14, borderRadius: 4 }} />
              ) : (
                <p style={{ fontWeight: 800, fontSize: 14, color: color, fontFamily: 'Orbitron, sans-serif', lineHeight: 1, margin: 0, textShadow: `0 0 10px ${color}` }}>
                  {value}
                </p>
              )}
              <p style={{ fontSize: 10, color: 'var(--sf-muted)', marginTop: 2, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.04em' }}>
                {label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
