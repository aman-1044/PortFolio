import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Bell, Settings, Search, Grid3x3, HelpCircle } from 'lucide-react'

// Salesforce Cloud SVG logo
const SFCloudLogo = () => (
  <svg width="32" height="22" viewBox="0 0 400 274" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      style={{ background: 'var(--sf-header)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      className="sticky top-0 z-50 h-12 flex items-center px-3 gap-3"
    >
      {/* Left — Logo + App Launcher + Brand */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-1 rounded hover:bg-white/10 transition-colors"
          title="App Launcher"
        >
          <Grid3x3 size={18} color="#8A9BB0" />
        </motion.button>

        <div className="flex items-center gap-2">
          <SFCloudLogo />
        </div>

        <div
          className="sf-pill sf-pill-blue text-[10px] font-bold tracking-wide"
          style={{ background: 'rgba(1,118,211,0.15)', borderColor: 'rgba(1,118,211,0.4)' }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-sf-bluelt mr-1 animate-pulse" />
          Developer Edition
        </div>
      </div>

      {/* Center — Search */}
      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sf-muted pointer-events-none"
          />
          <input
            id="global-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Aman's Portfolio..."
            className="sf-input pl-9 py-1.5 text-xs h-8"
            style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.07)' }}
          />
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded hover:bg-white/10 transition-colors"
          title="Favorites"
        >
          <Star size={16} color="#8A9BB0" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setBellActive(!bellActive)}
          className="p-2 rounded hover:bg-white/10 transition-colors relative"
          title="Notifications"
        >
          <Bell size={16} color="#8A9BB0" />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--sf-blue-lt)' }}
          />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 20 }}
          className="p-2 rounded hover:bg-white/10 transition-colors"
          title="Setup"
        >
          <Settings size={16} color="#8A9BB0" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="p-2 rounded hover:bg-white/10 transition-colors"
          title="Help"
        >
          <HelpCircle size={16} color="#8A9BB0" />
        </motion.button>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative ml-1 cursor-pointer"
          title="Aman Anand"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #0176D3, #1B96FF)' }}
          >
            AA
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
            style={{
              background: 'var(--sf-green)',
              borderColor: 'var(--sf-header)',
            }}
          />
        </motion.div>
      </div>
    </header>
  )
}
