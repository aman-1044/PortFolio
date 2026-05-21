import { motion } from 'framer-motion'
import { Trophy, GraduationCap, FolderGit2, ExternalLink } from 'lucide-react'

const CERTS = [
  {
    id: 'pd1',
    icon: Trophy,
    iconColor: '#FFB75D',
    iconBg: 'rgba(255,183,93,0.12)',
    title: 'Salesforce Platform Developer I',
    subtitle: 'Salesforce Inc. — Official Certification',
    status: 'In Progress',
    statusClass: 'sf-pill-yellow',
    date: 'Expected: 2026',
    glow: 'rgba(255,183,93,0.2)',
    border: 'rgba(255,183,93,0.2)',
    link: 'https://trailhead.salesforce.com',
  },
  {
    id: 'ml',
    icon: GraduationCap,
    iconColor: '#2E844A',
    iconBg: 'rgba(46,132,74,0.12)',
    title: 'ML Internship Certificate',
    subtitle: 'Prodigy InfoTech — Machine Learning',
    status: 'Completed',
    statusClass: 'sf-pill-green',
    date: 'Completed: 2024',
    glow: 'rgba(46,132,74,0.2)',
    border: 'rgba(46,132,74,0.25)',
    link: 'https://github.com/aman-1044/PRODIGY_ML_01',
  },
  {
    id: 'github',
    icon: FolderGit2,
    iconColor: '#1B96FF',
    iconBg: 'rgba(27,150,255,0.1)',
    title: '18 GitHub Repositories',
    subtitle: 'Open Source — github.com/aman-1044',
    status: 'Active',
    statusClass: 'sf-pill-blue',
    date: 'Since 2023',
    glow: 'rgba(1,118,211,0.2)',
    border: 'rgba(1,118,211,0.25)',
    link: 'https://github.com/aman-1044',
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4, ease: 'easeOut' },
  }),
}

export default function CertsWidget({ isRefreshing }) {
  return (
    <div id="certs" className="sf-widget">
      {/* Header */}
      <div className="sf-widget-header">
        <div className="flex items-center gap-3">
          <span className="sf-widget-title">Certifications & Achievements</span>
          <span className="sf-record-count">{CERTS.length} Records</span>
        </div>
      </div>

      {/* Cards */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {CERTS.map((cert, i) => {
          const Icon = cert.icon
          return isRefreshing ? (
            <div
              key={cert.id}
              className="shimmer-bg rounded-lg"
              style={{ height: 140 }}
            />
          ) : (
            <motion.div
              key={cert.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -4,
                boxShadow: `0 12px 40px ${cert.glow}, 0 0 0 1px ${cert.border}`,
                transition: { duration: 0.2 },
              }}
              className="relative flex flex-col gap-3 p-4 rounded-lg cursor-pointer"
              style={{
                background: 'var(--sf-card-2)',
                border: `1px solid ${cert.border}`,
                transition: 'box-shadow 0.2s ease',
              }}
              onClick={() => window.open(cert.link, '_blank')}
            >
              {/* Icon */}
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: cert.iconBg }}
                >
                  <Icon size={22} color={cert.iconColor} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`sf-pill ${cert.statusClass}`}>{cert.status}</span>
                </div>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-sm font-bold text-white leading-snug">{cert.title}</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--sf-muted)' }}>{cert.subtitle}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-1">
                <span className="text-xs" style={{ color: 'var(--sf-muted)' }}>{cert.date}</span>
                <ExternalLink size={12} color="var(--sf-muted)" />
              </div>

              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-16 h-16 rounded-tr-lg opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${cert.iconColor}, transparent)`,
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
