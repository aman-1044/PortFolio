import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const GITHUB_USER = 'aman-1044'
const CACHE_KEY = 'sf_portfolio_gh_repos'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Curated project metadata to enrich the raw GitHub data
const PROJECT_META = {
  'PRODIGY_ML_01':      { tech: ['Python', 'ML', 'Pandas'], type: 'AI/ML Project' },
  'weather-website':    { tech: ['JavaScript', 'REST API', 'CSS'], type: 'Web App' },
  'Calculator':         { tech: ['JavaScript', 'HTML', 'CSS'], type: 'Utility' },
  'Landing-Page':       { tech: ['HTML', 'CSS'], type: 'Frontend' },
  'Registration-form':  { tech: ['HTML', 'CSS', 'JavaScript'], type: 'Frontend' },
  'Pricing-Page':       { tech: ['CSS', 'HTML'], type: 'UI Component' },
}

const FEATURED_REPOS = [
  'PRODIGY_ML_01',
  'weather-website',
  'Calculator',
  'Landing-Page',
  'Registration-form',
  'Pricing-Page',
]

export function useGitHubRepos() {
  const [repos, setRepos]       = useState([])
  const [stats, setStats]       = useState({ followers: 0, stars: 0, repoCount: 0 })
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [lastFetched, setLastFetched] = useState(null)

  const fetchRepos = useCallback(async (force = false) => {
    setLoading(true)
    setError(null)

    // Try cache first
    if (!force) {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, ts } = JSON.parse(cached)
          if (Date.now() - ts < CACHE_TTL) {
            setRepos(data.repos)
            setStats(data.stats)
            setLastFetched(new Date(ts))
            setLoading(false)
            return
          }
        }
      } catch (_) { /* ignore cache errors */ }
    }

    try {
      const [reposRes, userRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
        axios.get(`https://api.github.com/users/${GITHUB_USER}`),
      ])

      const allRepos = reposRes.data
      const user     = userRes.data

      // Calculate total stars
      const totalStars = allRepos.reduce((sum, r) => sum + r.stargazers_count, 0)

      // Build featured list — use curated order, fall back to any unmatched
      const featured = FEATURED_REPOS
        .map((name) => allRepos.find((r) => r.name === name))
        .filter(Boolean)

      // Supplement with meta
      const enriched = featured.map((r, i) => ({
        id:          r.id,
        index:       i + 1,
        name:        r.name,
        description: r.description || '',
        url:         r.html_url,
        stars:       r.stargazers_count,
        language:    r.language,
        tech:        PROJECT_META[r.name]?.tech || (r.language ? [r.language] : ['Code']),
        type:        PROJECT_META[r.name]?.type || 'Project',
        status:      'Live',
        updatedAt:   r.updated_at,
      }))

      const statsData = {
        followers:  user.followers,
        stars:      totalStars,
        repoCount:  user.public_repos,
      }

      // Cache it
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        data: { repos: enriched, stats: statsData },
        ts: Date.now(),
      }))

      setRepos(enriched)
      setStats(statsData)
      setLastFetched(new Date())
    } catch (err) {
      console.error('GitHub API error:', err)
      setError(err.message)
      // Fallback data
      setRepos(FEATURED_REPOS.map((name, i) => ({
        id:      i,
        index:   i + 1,
        name,
        description: '',
        url:     `https://github.com/${GITHUB_USER}/${name}`,
        stars:   0,
        language: null,
        tech:    PROJECT_META[name]?.tech || ['Code'],
        type:    PROJECT_META[name]?.type || 'Project',
        status:  'Live',
        updatedAt: new Date().toISOString(),
      })))
      setStats({ followers: 4, stars: 9, repoCount: 18 })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchRepos() }, [fetchRepos])

  return { repos, stats, loading, error, refetch: () => fetchRepos(true), lastFetched }
}
