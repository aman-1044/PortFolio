import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Bell, Settings, Search, Grid3x3, HelpCircle } from 'lucide-react'

const SFCloudLogo = () => (
  <svg width="30" height="20" viewBox="0 0 400 274" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M166.7 60.4c9.8-10.2 23.5-16.5 38.7-16.5 19.8 0 37.1 10.8 46.6 27 8.1-3.6 17-5.6 26.4-5.6 35.9 0 65 29.1 65 65 0 3.5-.3 7-.8 10.3C359.4 147.4 374 165.9 374 188c0 26.5-21.5 48-48 48H103c-31.4 0-56.9-25.5-56.9-56.9 0-23.2 13.9-43.3 34-52.2-.4-3-.6-6-.6-9.1 0-41.8 33.9-75.7 75.7-75.7 4.2 0 8.3.4 12.3 1 4.6-18.1 14.5-34 28.2-45.7z"
      fill="white"
    />
  </svg>
)

export default function GlobalHeader({ searchQuery, setSearchQuery }) {
  const [bellActive, setBellActive] = useState(false)

  return (
    <header
      style={{
        background: 'var(--sf-header)',
        borderBottom: '1px solid var(--sf-border)',
        boxShadow: '0 1px 12px rgba(0,0,0,0.5)',
      }}
      className="sticky top-0 z-50 h-12 flex items-center px-3 gap-3"
    >
      {/* Left — Logo + App Launcher */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '6px', borderRadius: '6px', background: 'transparent', border: 'none', cursor: 'pointer' }}
          title="App Launcher"
        >
          <Grid3x3 size={18} color="var(--sf-muted)" />
        </motion.button>

        <div className="flex items-center gap-2">
          <SFCloudLogo />
        </div>

        <div
          className="badge badge-cyan"
          style={{ fontSize: '10px', letterSpacing: '0.08em' }}
        >
          <span style={{
            display: 'inline-block', width: 6, height: 6,
            borderRadius: '50%', background: 'var(--neon-cyan)',
            boxShadow: 'var(--glow-cyan)', animation: 'blink 2s infinite',
            marginRight: 4,
          }} />
          Developer Edition
        </div>
      </div>

      {/* Center — Search */}
      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <Search
            size={13}
            style={{
              position: 'absolute', left: 10, top: '50%',
              transform: 'translateY(-50%)', color: 'var(--sf-muted)', pointerEvents: 'none',
            }}
          />
          <input
            id="global-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Aman's Portfolio..."
            className="sf-input"
            style={{
              paddingLeft: 32,
              paddingTop: 6, paddingBottom: 6,
              borderRadius: 20,
              fontSize: 12,
              background: 'rgba(0,212,255,0.04)',
            }}
          />
        </div>
      </div>

      {/* Right — Action icons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {[
          { icon: Star,       title: 'Favorites',      onClick: undefined },
          { icon: Bell,       title: 'Notifications',  onClick: () => setBellActive(!bellActive), dot: true },
          { icon: Settings,   title: 'Setup',          rotate: true },
          { icon: HelpCircle, title: 'Help',           onClick: undefined },
        ].map(({ icon: Icon, title, onClick, dot, rotate }) => (
          <motion.button
            key={title}
            whileHover={{ scale: 1.1, ...(rotate ? { rotate: 20 } : {}) }}
            onClick={onClick}
            title={title}
            style={{
              padding: 7, borderRadius: 6,
              background: 'transparent', border: 'none', cursor: 'pointer',
              position: 'relative',
            }}
          >
            <Icon size={16} color="var(--sf-muted)" />
            {dot && (
              <span style={{
                position: 'absolute', top: 6, right: 6,
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--neon-cyan)',
                boxShadow: 'var(--glow-cyan)',
              }} />
            )}
          </motion.button>
        ))}

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          title="Aman Anand"
          style={{ position: 'relative', marginLeft: 4, cursor: 'pointer' }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: '#fff',
            background: 'linear-gradient(135deg, var(--sf-blue), var(--neon-cyan))',
            boxShadow: '0 0 12px rgba(0,212,255,0.4)',
            fontFamily: 'Orbitron, sans-serif',
          }}>
            AA
          </div>
          <span style={{
            position: 'absolute', bottom: -1, right: -1,
            width: 10, height: 10, borderRadius: '50%',
            background: 'var(--neon-green)',
            boxShadow: 'var(--glow-green)',
            border: '2px solid var(--sf-header)',
          }} />
        </motion.div>
      </div>
    </header>
  )
}
