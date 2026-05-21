import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const TABS = [
  { id: 'home',           label: 'Home',          section: 'hero'     },
  { id: 'projects',       label: 'Projects',      section: 'projects' },
  { id: 'skills',         label: 'Skills',        section: 'skills'   },
  { id: 'experience',     label: 'Experience',    section: 'stats'    },
  { id: 'certifications', label: 'Certifications',section: 'certs'    },
  { id: 'contact',        label: 'Contact',       section: 'contact'  },
]

export default function AppNavBar() {
  const [activeTab, setActiveTab] = useState('home')

  const scrollToSection = (tab) => {
    document.getElementById(tab.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveTab(tab.id)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120
      let current = 'home'
      for (const tab of TABS) {
        const el = document.getElementById(tab.section)
        if (el && el.offsetTop <= scrollY) current = tab.id
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
        borderBottom: '1px solid rgba(0,0,0,0.3)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
        position: 'sticky',
        top: 48,
        zIndex: 40,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: 40, padding: '0 16px' }}>
        {/* App Title */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          paddingRight: 20, borderRight: '1px solid rgba(255,255,255,0.2)',
          marginRight: 8, flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.04em' }}>
            Aman Anand
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif' }}>
            Portfolio App
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', overflowX: 'auto', flexShrink: 1 }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab)}
                style={{
                  position: 'relative',
                  height: '100%',
                  padding: '0 16px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.72)',
                  background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #fff' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.01em',
                }}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                      background: '#fff', borderRadius: '1px 1px 0 0',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* More */}
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 12px', borderRadius: 4,
            color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 600,
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'Space Grotesk, sans-serif',
            transition: 'color 0.15s',
          }}>
            More <ChevronDown size={12} />
          </button>
        </div>
      </div>
    </nav>
  )
}
