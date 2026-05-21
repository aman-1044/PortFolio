import { motion } from 'framer-motion'
import { Trophy, GraduationCap, FolderGit2, ExternalLink } from 'lucide-react'

const CERTS = [
  {
    id: 'pd1',
    icon: Trophy,
    iconColor: '#FFB75D',
    iconBg: 'rgba(255,183,93,0.1)',
    title: 'Salesforce Platform Developer I',
    subtitle: 'Salesforce Inc. — Official Certification',
    status: 'In Progress',
    statusCls: 'badge-yellow',
    date: 'Expected: 2026',
    glowColor: 'rgba(255,183,93,0.25)',
    borderColor: 'rgba(255,183,93,0.2)',
    link: 'https://trailhead.salesforce.com',
  },
  {
    id: 'ml',
    icon: GraduationCap,
    iconColor: '#00ff9d',
    iconBg: 'rgba(0,255,157,0.08)',
    title: 'ML Internship Certificate',
    subtitle: 'Prodigy InfoTech — Machine Learning',
    status: 'Completed',
    statusCls: 'badge-green',
    date: 'Completed: 2024',
    glowColor: 'rgba(0,255,157,0.2)',
    borderColor: 'rgba(0,255,157,0.2)',
    link: 'https://github.com/aman-1044/PRODIGY_ML_01',
  },
  {
    id: 'github',
    icon: FolderGit2,
    iconColor: '#00d4ff',
    iconBg: 'rgba(0,212,255,0.08)',
    title: '18 GitHub Repositories',
    subtitle: 'Open Source — github.com/aman-1044',
    status: 'Active',
    statusCls: 'badge-cyan',
    date: 'Since 2023',
    glowColor: 'rgba(0,212,255,0.2)',
    borderColor: 'rgba(0,212,255,0.2)',
    link: 'https://github.com/aman-1044',
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.4, ease: 'easeOut' } }),
}

export default function CertsWidget({ isRefreshing }) {
  return (
    <div id="certs" className="sf-widget">
      <div className="sf-widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="sf-widget-title">Certifications & Achievements</span>
          <span className="sf-record-count">{CERTS.length} Records</span>
        </div>
      </div>

      <div style={{
        padding: 16,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
      }}>
        {CERTS.map((cert, i) => {
          const Icon = cert.icon
          return isRefreshing ? (
            <div key={cert.id} className="shimmer-bg" style={{ height: 140, borderRadius: 10 }} />
          ) : (
            <motion.div
              key={cert.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: `0 16px 48px ${cert.glowColor}, 0 0 0 1px ${cert.borderColor}`,
                transition: { duration: 0.2 },
              }}
              onClick={() => window.open(cert.link, '_blank')}
              style={{
                display: 'flex', flexDirection: 'column', gap: 12,
                padding: 16, borderRadius: 10, cursor: 'pointer',
                background: 'rgba(0,0,0,0.25)',
                border: `1px solid ${cert.borderColor}`,
                position: 'relative', overflow: 'hidden',
                transition: 'box-shadow 0.2s',
              }}
            >
              {/* Corner glow */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 80, height: 80, pointerEvents: 'none',
                background: `radial-gradient(circle at top right, ${cert.glowColor}, transparent)`,
                borderRadius: '0 10px 0 0',
              }} />

              {/* Icon + status */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: cert.iconBg, flexShrink: 0,
                  boxShadow: `0 0 16px ${cert.iconColor}30`,
                }}>
                  <Icon size={22} color={cert.iconColor} />
                </div>
                <span className={`badge ${cert.statusCls}`}>{cert.status}</span>
              </div>

              {/* Text */}
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--sf-text)', lineHeight: 1.3, margin: 0, fontFamily: 'Space Grotesk, sans-serif' }}>
                  {cert.title}
                </h3>
                <p style={{ fontSize: 11, marginTop: 4, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
                  {cert.subtitle}
                </p>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ fontSize: 11, color: 'var(--sf-label)', fontFamily: 'Space Grotesk, sans-serif' }}>{cert.date}</span>
                <ExternalLink size={12} color="var(--sf-muted)" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
