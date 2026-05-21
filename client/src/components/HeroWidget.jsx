import { motion } from 'framer-motion'
import { MapPin, Briefcase, ArrowRight, Send } from 'lucide-react'

export default function HeroWidget() {
  return (
    <div
      id="hero"
      className="sf-widget"
      style={{
        background: 'linear-gradient(135deg, #060f1f 0%, #0a1a2e 60%, #060e1c 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 180,
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.06,
        backgroundImage: `linear-gradient(var(--sf-border) 1px, transparent 1px),
                          linear-gradient(90deg, var(--sf-border) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.15), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -30, left: '30%',
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,47,255,0.1), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        padding: '24px',
        display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
      }}>
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ position: 'relative', flexShrink: 0 }}
        >
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 900, color: '#fff',
            background: 'linear-gradient(135deg, var(--sf-blue), var(--neon-cyan))',
            boxShadow: '0 0 0 3px rgba(0,212,255,0.2), 0 0 30px rgba(0,212,255,0.3)',
            fontFamily: 'Orbitron, sans-serif',
          }}>
            AA
          </div>
          <div style={{
            position: 'absolute', bottom: 2, right: 2,
            width: 16, height: 16, borderRadius: '50%',
            background: 'var(--neon-green)',
            boxShadow: 'var(--glow-green)',
            border: '2px solid #060f1f',
          }} />
        </motion.div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <h1 style={{
                fontSize: 'clamp(20px, 4vw, 28px)',
                fontWeight: 900, color: '#fff', letterSpacing: '0.04em',
                fontFamily: 'Orbitron, sans-serif', margin: 0,
              }}>
                Aman Anand
              </h1>
              <span className="status-live">Open to Work</span>
            </div>
            <p style={{
              fontSize: 15, fontWeight: 600, marginTop: 4,
              color: 'var(--neon-cyan)',
              fontFamily: 'Space Grotesk, sans-serif',
              textShadow: '0 0 12px rgba(0,212,255,0.4)',
            }}>
              Salesforce Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 8, flexWrap: 'wrap' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
              <Briefcase size={12} /> Salesforce CRM · LWC · Apex · Flows
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>
              <MapPin size={12} /> India
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, flexWrap: 'wrap' }}
          >
            <a
              href="https://www.linkedin.com/in/aman-anand-201b5219a/"
              target="_blank" rel="noopener noreferrer"
              className="sf-btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Connect on LinkedIn <ArrowRight size={13} />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="sf-btn-ghost"
              style={{ textDecoration: 'none' }}
            >
              <Send size={12} /> Send Message
            </a>
          </motion.div>
        </div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
          style={{ display: 'flex', gap: 24, flexShrink: 0, flexWrap: 'wrap' }}
        >
          {[
            { label: 'Projects',   value: '18+', color: 'var(--neon-cyan)'   },
            { label: 'Certs',      value: '1+',  color: 'var(--neon-yellow)' },
            { label: 'Tech Skills',value: '15+', color: 'var(--neon-green)'  },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 900, color, fontFamily: 'Orbitron, sans-serif', textShadow: `0 0 15px ${color}`, margin: 0 }}>
                {value}
              </p>
              <p style={{ fontSize: 11, color: 'var(--sf-muted)', marginTop: 2, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.04em' }}>
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
