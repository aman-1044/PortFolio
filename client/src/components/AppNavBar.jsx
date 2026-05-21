import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const TABS = [
  { id: 'home',           label: 'Home',           section: 'hero' },
  { id: 'projects',       label: 'Projects',        section: 'projects' },
  { id: 'skills',         label: 'Skills',          section: 'skills' },
  { id: 'experience',     label: 'Experience',      section: 'stats' },
  { id: 'certifications', label: 'Certifications',  section: 'certs' },
  { id: 'contact',        label: 'Contact',         section: 'contact' },
]

export default function AppNavBar() {
  const [activeTab, setActiveTab] = useState('home')
  const tabRefs = useRef({})

  const scrollToSection = (tab) => {
    const el = document.getElementById(tab.section)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setActiveTab(tab.id)
  }

  // Scroll-spy: update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120
      let current = 'home'
      for (const tab of TABS) {
        const el = document.getElementById(tab.section)
        if (el && el.offsetTop <= scrollY) {
          current = tab.id
        }
      }
      setActiveTab(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        background: 'var(--sf-nav)',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
      className="sticky top-12 z-40"
    >
      <div className="flex items-center h-10 px-4">
        {/* App Title */}
        <div className="flex items-center gap-2 pr-6 border-r border-white/20 mr-2 flex-shrink-0">
          <span className="text-white font-bold text-sm tracking-wide">Aman Anand</span>
          <span className="text-white/50 text-sm">|</span>
          <span className="text-white/80 text-xs">Portfolio App</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center h-full overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[tab.id] = el)}
                onClick={() => scrollToSection(tab)}
                className="relative h-full px-4 flex items-center gap-1 text-sm font-semibold transition-all duration-150 whitespace-nowrap flex-shrink-0"
                style={{
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                  background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  borderBottom: isActive ? '2px solid #fff' : '2px solid transparent',
                }}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    style={{ borderRadius: '1px 1px 0 0' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Right side — more options */}
        <div className="ml-auto flex items-center gap-1 flex-shrink-0">
          <button
            className="flex items-center gap-1 px-3 py-1 rounded text-white/70 hover:text-white hover:bg-white/10 text-xs transition-colors"
          >
            More <ChevronDown size={12} />
          </button>
        </div>
      </div>
    </nav>
  )
}
