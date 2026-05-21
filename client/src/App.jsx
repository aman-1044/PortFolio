import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import GlobalHeader   from './components/GlobalHeader'
import AppNavBar      from './components/AppNavBar'
import SubHeader      from './components/SubHeader'
import HeroWidget     from './components/HeroWidget'
import ProjectsWidget from './components/ProjectsWidget'
import SkillsWidget   from './components/SkillsWidget'
import StatsWidget    from './components/StatsWidget'
import CertsWidget    from './components/CertsWidget'
import ChatterFeed    from './components/ChatterFeed'
import { useGitHubRepos } from './hooks/useGitHubRepos'

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
}

function DashboardCard({ children, index, className = '', style = {} }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const { repos, stats, loading, error, refetch } = useGitHubRepos()

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    refetch()
    setTimeout(() => {
      setIsRefreshing(false)
      setRefreshKey((k) => k + 1)
    }, 1200)
  }, [refetch])

  return (
    <div style={{ background: 'var(--sf-bg)', minHeight: '100vh' }}>
      {/* Fixed top bars */}
      <GlobalHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AppNavBar />
      <SubHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      {/* Main content */}
      <main className="px-4 py-4 max-w-[1400px] mx-auto space-y-4">

        {/* Hero — full width */}
        <DashboardCard index={0}>
          <HeroWidget />
        </DashboardCard>

        {/* Row 1: Projects (60%) + Right column (40%) */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          {/* Projects — 3/5 = 60% */}
          <DashboardCard index={1} className="xl:col-span-3">
            <AnimatePresence mode="wait">
              <ProjectsWidget
                key={`projects-${refreshKey}`}
                searchQuery={searchQuery}
                isRefreshing={isRefreshing}
                repos={repos}
                loading={loading}
                stats={stats}
              />
            </AnimatePresence>
          </DashboardCard>

          {/* Right column — 2/5 = 40% */}
          <div className="xl:col-span-2 flex flex-col gap-4">
            <DashboardCard index={2}>
              <SkillsWidget
                key={`skills-${refreshKey}`}
                isRefreshing={isRefreshing}
              />
            </DashboardCard>

            <DashboardCard index={3}>
              <StatsWidget
                key={`stats-${refreshKey}`}
                stats={stats}
                loading={loading}
                isRefreshing={isRefreshing}
              />
            </DashboardCard>
          </div>
        </div>

        {/* Row 2: Certs — full width */}
        <DashboardCard index={4}>
          <CertsWidget
            key={`certs-${refreshKey}`}
            isRefreshing={isRefreshing}
          />
        </DashboardCard>

        {/* Row 3: Chatter — full width */}
        <DashboardCard index={5}>
          <ChatterFeed
            key={`chatter-${refreshKey}`}
            isRefreshing={isRefreshing}
          />
        </DashboardCard>

      </main>

      {/* Footer */}
      <footer
        className="mt-8 py-4 px-6 text-center text-xs"
        style={{
          borderTop: '1px solid var(--sf-border)',
          color: 'var(--sf-muted)',
          background: 'var(--sf-header)',
        }}
      >
        <span>
          Aman Anand · Salesforce Developer Portfolio ·{' '}
          <a href="https://github.com/aman-1044" target="_blank" rel="noopener noreferrer"
             style={{ color: 'var(--sf-blue-lt)' }}>
            github.com/aman-1044
          </a>
          {' · '}Built with React + Vite · Styled like Salesforce Lightning
        </span>
      </footer>
    </div>
  )
}
