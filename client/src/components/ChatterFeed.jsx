import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, MessageCircle, ExternalLink, Send, Github, Linkedin, Search, ChevronDown, CheckCircle2, XCircle } from 'lucide-react'
import axios from 'axios'

const FEED_POSTS = [
  {
    id: 'avail',
    avatar: 'AA',
    avatarBg: 'linear-gradient(135deg, #0176D3, #1B96FF)',
    name: 'Aman Anand',
    handle: '@aman-1044',
    time: 'May 21, 2026',
    content: '🚀 Available for Salesforce Developer roles — LWC, Apex, Flows & more. Open to full-time & contract opportunities. Let\'s connect!',
    likes: 24,
    comments: 6,
    badge: 'Available',
    badgeClass: 'sf-pill-green',
  },
  {
    id: 'github',
    avatar: <Github size={18} color="#fff" />,
    avatarBg: '#161B22',
    name: 'GitHub',
    handle: 'github.com/aman-1044',
    time: 'Active',
    content: '18 public repositories including ML projects, web apps, and UI components. Built with Python, JavaScript, HTML/CSS & more.',
    likes: 0,
    comments: 0,
    link: 'https://github.com/aman-1044',
    linkLabel: 'View Profile →',
    actionLabel: 'Follow ↗',
    badge: '18 Repos',
    badgeClass: 'sf-pill-gray',
  },
  {
    id: 'linkedin',
    avatar: <Linkedin size={18} color="#fff" />,
    avatarBg: '#0A66C2',
    name: 'LinkedIn',
    handle: 'aman-anand-201b5219a',
    time: 'Open to opportunities',
    content: 'Salesforce Developer | LWC Specialist | Building CRM solutions. Connect for opportunities, collaborations or just to say hi!',
    likes: 0,
    comments: 0,
    link: 'https://www.linkedin.com/in/aman-anand-201b5219a/',
    linkLabel: 'Connect →',
    actionLabel: 'Message ↗',
    badge: 'Open to Work',
    badgeClass: 'sf-pill-blue',
  },
]

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export default function ChatterFeed({ isRefreshing }) {
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [toast, setToast]     = useState(null)
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [feedSearch, setFeedSearch] = useState('')

  const handleLike = (id) => {
    setLikedPosts((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, form, { timeout: 8000 })
      setToast({ type: 'success', msg: 'Message sent! Aman will get back to you soon.' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      // Still show success-like message if backend not configured
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
        setToast({ type: 'info', msg: 'Message noted! (Backend not yet connected — configure .env to persist.)' })
        setForm({ name: '', email: '', message: '' })
      } else {
        setToast({ type: 'error', msg: 'Something went wrong. Please try again.' })
      }
    } finally {
      setSending(false)
      setTimeout(() => setToast(null), 4000)
    }
  }

  const filteredPosts = FEED_POSTS.filter((p) => {
    if (!feedSearch) return true
    const q = feedSearch.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
  })

  return (
    <div id="contact" className="sf-widget">
      {/* Header */}
      <div className="sf-widget-header">
        <div className="flex items-center gap-3">
          <span className="sf-widget-title">Chatter</span>
          <span className="sf-record-count">{FEED_POSTS.length} Posts</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--sf-muted)' }} />
            <input
              type="text"
              placeholder="Search this feed..."
              value={feedSearch}
              onChange={(e) => setFeedSearch(e.target.value)}
              className="sf-input text-xs py-1 pl-7 pr-3 h-7"
              style={{ width: 180 }}
            />
          </div>
          <button className="sf-btn-ghost text-xs flex items-center gap-1">
            Most Recent <ChevronDown size={11} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x" style={{ borderColor: 'var(--sf-border)' }}>
        {/* Left: Feed Posts */}
        <div>
          {isRefreshing ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="shimmer-bg rounded-full flex-shrink-0" style={{ width: 36, height: 36 }} />
                  <div className="flex-1 space-y-2">
                    <div className="shimmer-bg rounded" style={{ width: '60%', height: 12 }} />
                    <div className="shimmer-bg rounded" style={{ width: '90%', height: 12 }} />
                    <div className="shimmer-bg rounded" style={{ width: '75%', height: 12 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="chatter-post"
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div
                    className="chatter-avatar flex-shrink-0"
                    style={{ background: post.avatarBg, color: '#fff' }}
                  >
                    {typeof post.avatar === 'string' ? post.avatar : post.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{post.name}</span>
                        <span className="text-xs" style={{ color: 'var(--sf-muted)' }}>{post.handle}</span>
                      </div>
                      <span className={`sf-pill ${post.badgeClass}`}>{post.badge}</span>
                    </div>

                    <p className="text-xs mt-0.5" style={{ color: 'var(--sf-muted)' }}>{post.time}</p>

                    <p className="text-sm mt-2 leading-relaxed" style={{ color: '#D0DCF0' }}>
                      {post.content}
                    </p>

                    {/* Links */}
                    {post.link && (
                      <div className="flex items-center gap-3 mt-2">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold flex items-center gap-1 transition-colors hover:underline"
                          style={{ color: 'var(--sf-blue-lt)' }}
                        >
                          {post.linkLabel} <ExternalLink size={10} />
                        </a>
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sf-btn-ghost py-0.5 px-2"
                        >
                          {post.actionLabel}
                        </a>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1.5 text-xs transition-colors"
                        style={{ color: likedPosts.has(post.id) ? 'var(--sf-blue-lt)' : 'var(--sf-muted)' }}
                      >
                        <ThumbsUp size={12} />
                        Like {(post.likes + (likedPosts.has(post.id) ? 1 : 0)) > 0 ? `(${post.likes + (likedPosts.has(post.id) ? 1 : 0)})` : ''}
                      </button>
                      <button
                        className="flex items-center gap-1.5 text-xs transition-colors hover:text-white"
                        style={{ color: 'var(--sf-muted)' }}
                      >
                        <MessageCircle size={12} />
                        Comment {post.comments > 0 ? `(${post.comments})` : ''}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Right: Contact Form */}
        <div className="p-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white">Send a Message</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--sf-muted)' }}>
              Drop Aman a message — he'll respond within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--sf-muted)' }}>
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="sf-input text-xs py-2"
                />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--sf-muted)' }}>
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="sf-input text-xs py-2"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--sf-muted)' }}>
                Message *
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="Tell Aman about your opportunity or project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="sf-input text-xs py-2 resize-none"
                style={{ lineHeight: 1.6 }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02, brightness: 1.1 }}
              whileTap={{ scale: 0.97 }}
              className="sf-btn-primary w-full justify-center py-2.5 text-sm"
            >
              {sending ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="inline-block"
                  >
                    ⟳
                  </motion.span>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>

          {/* Quick links */}
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--sf-border)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--sf-muted)' }}>QUICK LINKS</p>
            <div className="space-y-2">
              {[
                { label: 'GitHub Profile',   href: 'https://github.com/aman-1044',                          icon: <Github size={14} /> },
                { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/aman-anand-201b5219a/',  icon: <Linkedin size={14} /> },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs py-2 px-3 rounded-md transition-all"
                  style={{ background: 'var(--sf-card-2)', border: '1px solid var(--sf-border)', color: 'var(--sf-blue-lt)' }}
                >
                  {icon}
                  <span className="font-semibold">{label}</span>
                  <ExternalLink size={10} className="ml-auto" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="sf-toast"
            style={{
              borderColor: toast.type === 'success'
                ? 'var(--sf-green)'
                : toast.type === 'error'
                ? 'var(--sf-red)'
                : 'var(--sf-blue)',
            }}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} color="var(--sf-green)" />
            ) : toast.type === 'error' ? (
              <XCircle size={18} color="var(--sf-red)" />
            ) : (
              <CheckCircle2 size={18} color="var(--sf-blue-lt)" />
            )}
            <span className="text-sm">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
