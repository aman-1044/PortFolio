import { motion } from 'framer-motion'
import { MapPin, Briefcase, Download, ArrowRight } from 'lucide-react'

export default function HeroWidget() {
  return (
    <div
      id="hero"
      className="relative overflow-hidden rounded-lg"
      style={{
        background: 'linear-gradient(135deg, #0D2137 0%, #0E2A45 50%, #0F1E30 100%)',
        border: '1px solid var(--sf-border)',
        minHeight: 180,
      }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(var(--sf-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--sf-border) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20 blur-3xl"
        style={{ background: 'var(--sf-blue)' }}
      />
      <div
        className="absolute -bottom-8 left-1/3 w-32 h-32 rounded-full opacity-15 blur-2xl"
        style={{ background: 'var(--sf-blue-lt)' }}
      />

      <div className="relative z-10 p-6 flex items-center gap-6 flex-wrap">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative flex-shrink-0"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white relative"
            style={{
              background: 'linear-gradient(135deg, #0176D3 0%, #1B96FF 100%)',
              boxShadow: '0 0 0 4px rgba(1,118,211,0.25), 0 0 24px rgba(27,150,255,0.3)',
            }}
          >
            AA
          </div>
          {/* Online dot */}
          <div
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
            style={{ background: 'var(--sf-green)', borderColor: '#0D2137' }}
          />
        </motion.div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-black text-white tracking-tight">Aman Anand</h1>
              <span className="sf-pill sf-pill-green text-xs">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1" />
                Open to Work
              </span>
            </div>
            <p className="text-base font-semibold mt-0.5" style={{ color: 'var(--sf-blue-lt)' }}>
              Salesforce Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mt-2 flex-wrap"
          >
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--sf-muted)' }}>
              <Briefcase size={12} />
              Salesforce CRM · LWC · Apex · Flows
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--sf-muted)' }}>
              <MapPin size={12} />
              India
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mt-4 flex-wrap"
          >
            <a
              href="https://www.linkedin.com/in/aman-anand-201b5219a/"
              target="_blank"
              rel="noopener noreferrer"
              className="sf-btn-primary text-xs py-2 px-4"
            >
              Connect on LinkedIn <ArrowRight size={12} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="sf-btn-ghost text-xs py-2 px-4"
            >
              <Download size={12} />
              Send Message
            </a>
          </motion.div>
        </div>

        {/* Right: Quick stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="flex gap-4 flex-shrink-0"
        >
          {[
            { label: 'Projects',     value: '18+',    color: 'var(--sf-blue-lt)' },
            { label: 'Certs',        value: '1+',     color: '#FFB75D'            },
            { label: 'Tech Skills',  value: '15+',    color: 'var(--sf-green)'   },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-black" style={{ color }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--sf-muted)' }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
