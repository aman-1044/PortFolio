import { motion } from 'framer-motion'
import {
  FunnelChart, Funnel, Tooltip, Cell, LabelList,
  ResponsiveContainer,
} from 'recharts'
import { Users, Star, FolderGit2, Briefcase } from 'lucide-react'

const FUNNEL_DATA = [
  { name: 'Salesforce Developer', value: 100, color: '#0176D3', icon: '💼' },
  { name: 'GitHub Repositories',  value: 75,  color: '#1B96FF', icon: '📁' },
  { name: 'Community Stars',      value: 45,  color: '#2E844A', icon: '⭐' },
  { name: 'Open to Work ✓',       value: 20,  color: '#FFB75D', icon: '✅' },
]

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div
      style={{
        background: 'var(--sf-card-2)',
        border: '1px solid var(--sf-border)',
        borderRadius: 6,
        padding: '8px 14px',
        fontSize: 12,
      }}
    >
      <p className="font-bold text-white">{d.icon} {d.name}</p>
    </div>
  )
}

const CustomLabel = ({ x, y, width, value, name }) => {
  if (!width || width < 40) return null
  return (
    <text
      x={x + width / 2}
      y={y + 22}
      fill="#fff"
      textAnchor="middle"
      fontSize={11}
      fontFamily="Nunito, sans-serif"
      fontWeight="600"
    >
      {name}
    </text>
  )
}

export default function StatsWidget({ stats, loading, isRefreshing }) {
  const show = !loading && !isRefreshing

  const statPills = [
    { icon: Users,      label: 'Followers', value: stats.followers, color: 'var(--sf-blue-lt)' },
    { icon: Star,       label: 'Stars',     value: stats.stars,     color: '#FFB75D' },
    { icon: FolderGit2, label: 'Repos',     value: stats.repoCount, color: 'var(--sf-green)' },
  ]

  return (
    <div id="stats" className="sf-widget">
      {/* Header */}
      <div className="sf-widget-header">
        <div className="flex items-center gap-3">
          <span className="sf-widget-title">Experience Stats</span>
          <span className="sf-record-count">Live</span>
        </div>
        <span className="sf-pill sf-pill-green">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse" />
          GitHub Synced
        </span>
      </div>

      {/* Chart */}
      <div className="px-4 pt-4">
        {isRefreshing || loading ? (
          <div className="space-y-2">
            {[100, 80, 60, 40].map((w, i) => (
              <div
                key={i}
                className="shimmer-bg rounded mx-auto"
                style={{ height: 36, width: `${w}%` }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <FunnelChart>
                <Tooltip content={<CustomTooltip />} />
                <Funnel
                  dataKey="value"
                  data={FUNNEL_DATA}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {FUNNEL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
                  ))}
                  <LabelList
                    position="center"
                    content={<CustomLabel />}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="px-4 pb-2">
        <div className="flex flex-col gap-1.5">
          {FUNNEL_DATA.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
              <span style={{ color: 'var(--sf-muted)' }}>{d.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat Pills */}
      <div
        className="px-4 pb-4 pt-3 flex items-center gap-2 flex-wrap"
        style={{ borderTop: '1px solid var(--sf-border)' }}
      >
        {statPills.map(({ icon: Icon, label, value, color }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.05, y: -1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1 min-w-[80px]"
            style={{ background: 'var(--sf-card-2)', border: '1px solid var(--sf-border)' }}
          >
            <Icon size={14} color={color} />
            <div>
              {isRefreshing || loading ? (
                <div className="shimmer-bg rounded" style={{ width: 24, height: 14 }} />
              ) : (
                <motion.p
                  className="font-bold text-sm text-white leading-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={value}
                >
                  {value}
                </motion.p>
              )}
              <p className="text-xs mt-0.5" style={{ color: 'var(--sf-muted)' }}>{label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
