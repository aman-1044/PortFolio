import { motion } from 'framer-motion'

const SF_SKILLS = [
  { label: 'Apex',           color: 'sf-pill-blue' },
  { label: 'LWC',            color: 'sf-pill-blue' },
  { label: 'SOQL',           color: 'sf-pill-blue' },
  { label: 'Salesforce CRM', color: 'sf-pill-blue' },
  { label: 'Flow Builder',   color: 'sf-pill-blue' },
  { label: 'SFDX',          color: 'sf-pill-blue' },
]

const DEV_SKILLS = [
  { label: 'JavaScript',  color: 'sf-pill-yellow' },
  { label: 'Python',      color: 'sf-pill-blue'   },
  { label: 'React',       color: 'sf-pill-cyan'   },
  { label: 'Node.js',     color: 'sf-pill-green'  },
  { label: 'HTML',        color: 'sf-pill-orange' },
  { label: 'CSS',         color: 'sf-pill-purple' },
  { label: 'Git',         color: 'sf-pill-orange' },
  { label: 'REST APIs',   color: 'sf-pill-cyan'   },
  { label: 'MongoDB',     color: 'sf-pill-green'  },
]

const badgeVariants = {
  hidden:  { opacity: 0, scale: 0.6 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, type: 'spring', stiffness: 400, damping: 20 },
  }),
}

function SkillBadge({ skill, index }) {
  return (
    <motion.span
      custom={index}
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.08,
        boxShadow: '0 0 8px rgba(27,150,255,0.4)',
        transition: { duration: 0.15 },
      }}
      className={`sf-pill ${skill.color} cursor-default select-none`}
    >
      {skill.label}
    </motion.span>
  )
}

export default function SkillsWidget({ isRefreshing }) {
  const allSkills = [...SF_SKILLS, ...DEV_SKILLS]

  return (
    <div id="skills" className="sf-widget">
      {/* Header */}
      <div className="sf-widget-header">
        <div className="flex items-center gap-3">
          <span className="sf-widget-title">Tech Stack</span>
          <span className="sf-record-count">{SF_SKILLS.length + DEV_SKILLS.length} Skills</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-5">
        {/* Salesforce Track */}
        <div>
          <p className="text-xs font-bold mb-2.5 tracking-widest uppercase"
             style={{ color: 'var(--sf-muted)' }}>
            ☁️ Salesforce Track
          </p>
          {isRefreshing ? (
            <div className="flex flex-wrap gap-2">
              {SF_SKILLS.map((_, i) => (
                <div key={i} className="shimmer-bg rounded-full" style={{ height: 24, width: 70 + i * 8 }} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {SF_SKILLS.map((s, i) => (
                <SkillBadge key={s.label} skill={s} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--sf-border)' }} />

        {/* Dev Track */}
        <div>
          <p className="text-xs font-bold mb-2.5 tracking-widest uppercase"
             style={{ color: 'var(--sf-muted)' }}>
            ⚙️ Dev Track
          </p>
          {isRefreshing ? (
            <div className="flex flex-wrap gap-2">
              {DEV_SKILLS.map((_, i) => (
                <div key={i} className="shimmer-bg rounded-full" style={{ height: 24, width: 65 + i * 5 }} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {DEV_SKILLS.map((s, i) => (
                <SkillBadge key={s.label} skill={s} index={SF_SKILLS.length + i} />
              ))}
            </div>
          )}
        </div>

        {/* Proficiency bar */}
        <div style={{ borderTop: '1px solid var(--sf-border)', paddingTop: 12 }}>
          <p className="text-xs font-bold mb-3 tracking-widest uppercase" style={{ color: 'var(--sf-muted)' }}>
            Proficiency
          </p>
          {[
            { label: 'Salesforce CRM', pct: 85 },
            { label: 'JavaScript / LWC', pct: 80 },
            { label: 'Apex & SOQL', pct: 78 },
            { label: 'Python / ML', pct: 70 },
          ].map(({ label, pct }) => (
            <div key={label} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: 'var(--sf-muted)' }}>{label}</span>
                <span className="font-semibold" style={{ color: 'var(--sf-blue-lt)' }}>{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--sf-card-2)' }}>
                {!isRefreshing && (
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--sf-blue), var(--sf-blue-lt))' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
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
