import { motion } from 'framer-motion'

const SF_SKILLS = [
  { label: 'Apex',           cls: 'badge-blue'   },
  { label: 'LWC',            cls: 'badge-cyan'   },
  { label: 'SOQL',           cls: 'badge-blue'   },
  { label: 'Salesforce CRM', cls: 'badge-blue'   },
  { label: 'Flow Builder',   cls: 'badge-purple' },
  { label: 'SFDX',          cls: 'badge-cyan'   },
]

const DEV_SKILLS = [
  { label: 'JavaScript', cls: 'badge-yellow' },
  { label: 'Python',     cls: 'badge-blue'   },
  { label: 'React',      cls: 'badge-cyan'   },
  { label: 'Node.js',    cls: 'badge-green'  },
  { label: 'HTML',       cls: 'badge-orange' },
  { label: 'CSS',        cls: 'badge-purple' },
  { label: 'Git',        cls: 'badge-orange' },
  { label: 'REST APIs',  cls: 'badge-cyan'   },
  { label: 'MongoDB',    cls: 'badge-green'  },
]

const BARS = [
  { label: 'Salesforce CRM',    pct: 85 },
  { label: 'JavaScript / LWC',  pct: 80 },
  { label: 'Apex & SOQL',       pct: 78 },
  { label: 'Python / ML',       pct: 70 },
]

const badgeVariants = {
  hidden:  { opacity: 0, scale: 0.5 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.05, type: 'spring', stiffness: 400, damping: 18 },
  }),
}

function SkillBadge({ skill, index }) {
  return (
    <motion.span
      custom={index}
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      className={`badge ${skill.cls}`}
      style={{ cursor: 'default' }}
    >
      {skill.label}
    </motion.span>
  )
}

export default function SkillsWidget({ isRefreshing }) {
  return (
    <div id="skills" className="sf-widget">
      <div className="sf-widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="sf-widget-title">Tech Stack</span>
          <span className="sf-record-count">{SF_SKILLS.length + DEV_SKILLS.length} Skills</span>
        </div>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Salesforce Track */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, marginBottom: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sf-muted)', fontFamily: 'Orbitron, sans-serif' }}>
            ☁️ Salesforce Track
          </p>
          {isRefreshing ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SF_SKILLS.map((_, i) => <div key={i} className="shimmer-bg" style={{ height: 24, width: 70 + i * 8, borderRadius: 20 }} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SF_SKILLS.map((s, i) => <SkillBadge key={s.label} skill={s} index={i} />)}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="neon-divider" />

        {/* Dev Track */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, marginBottom: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sf-muted)', fontFamily: 'Orbitron, sans-serif' }}>
            ⚙️ Dev Track
          </p>
          {isRefreshing ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DEV_SKILLS.map((_, i) => <div key={i} className="shimmer-bg" style={{ height: 24, width: 60 + i * 5, borderRadius: 20 }} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DEV_SKILLS.map((s, i) => <SkillBadge key={s.label} skill={s} index={SF_SKILLS.length + i} />)}
            </div>
          )}
        </div>

        {/* Proficiency bars */}
        <div style={{ borderTop: '1px solid var(--sf-border)', paddingTop: 16 }}>
          <p style={{ fontSize: 10, fontWeight: 700, marginBottom: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sf-muted)', fontFamily: 'Orbitron, sans-serif' }}>
            Proficiency
          </p>
          {BARS.map(({ label, pct }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--neon-cyan)', fontFamily: 'Orbitron, sans-serif' }}>{pct}%</span>
              </div>
              <div className="progress-bar-track">
                {!isRefreshing && (
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
