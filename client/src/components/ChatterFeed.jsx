import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, MessageCircle, ExternalLink, Send, Github, Linkedin, Search, ChevronDown, CheckCircle2, XCircle } from 'lucide-react'
import axios from 'axios'

const FEED_POSTS = [
  {
    id: 'avail',
    avatar: 'AA',
    avatarBg: 'linear-gradient(135deg, var(--sf-blue), var(--neon-cyan))',
    avatarShadow: 'var(--glow-cyan)',
    name: 'Aman Anand',
    handle: '@aman-1044',
    time: 'May 21, 2026',
    content: '🚀 Available for Salesforce Developer roles — LWC, Apex, Flows & more. Open to full-time & contract opportunities. Let\'s connect!',
    likes: 24, comments: 6,
    badge: 'Available', badgeCls: 'badge-green',
  },
  {
    id: 'github',
    avatar: <Github size={17} color="#fff" />,
    avatarBg: '#161B22',
    name: 'GitHub',
    handle: 'github.com/aman-1044',
    time: 'Active',
    content: '18 public repositories including ML projects, web apps, and UI components. Built with Python, JavaScript, HTML/CSS & more.',
    likes: 0, comments: 0,
    link: 'https://github.com/aman-1044', linkLabel: 'View Profile →', actionLabel: 'Follow ↗',
    badge: '18 Repos', badgeCls: 'badge-gray',
  },
  {
    id: 'linkedin',
    avatar: <Linkedin size={17} color="#fff" />,
    avatarBg: '#0A66C2',
    name: 'LinkedIn',
    handle: 'aman-anand-201b5219a',
    time: 'Open to opportunities',
    content: 'Salesforce Developer | LWC Specialist | Building CRM solutions. Connect for opportunities, collaborations or just to say hi!',
    likes: 0, comments: 0,
    link: 'https://www.linkedin.com/in/aman-anand-201b5219a/', linkLabel: 'Connect →', actionLabel: 'Message ↗',
    badge: 'Open to Work', badgeCls: 'badge-blue',
  },
]

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export default function ChatterFeed({ isRefreshing }) {
  const [form, setForm]           = useState({ name: '', email: '', message: '' })
  const [sending, setSending]     = useState(false)
  const [toast, setToast]         = useState(null)
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [feedSearch, setFeedSearch] = useState('')

  const handleLike = (id) => {
    setLikedPosts((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
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
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
        setToast({ type: 'info', msg: 'Message noted! Connect MongoDB to persist messages.' })
        setForm({ name: '', email: '', message: '' })
      } else {
        setToast({ type: 'error', msg: 'Something went wrong. Please try again.' })
      }
    } finally {
      setSending(false)
      setTimeout(() => setToast(null), 4000)
    }
  }

  const filtered = FEED_POSTS.filter((p) => {
    if (!feedSearch) return true
    const q = feedSearch.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
  })

  return (
    <div id="contact" className="sf-widget">
      {/* Header */}
      <div className="sf-widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="sf-widget-title">Chatter</span>
          <span className="sf-record-count">{FEED_POSTS.length} Posts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <Search size={11} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--sf-muted)', pointerEvents: 'none' }} />
            <input
              type="text" placeholder="Search this feed..."
              value={feedSearch} onChange={(e) => setFeedSearch(e.target.value)}
              className="sf-input"
              style={{ paddingLeft: 28, paddingTop: 5, paddingBottom: 5, width: 180, fontSize: 12 }}
            />
          </div>
          <button className="sf-btn-ghost" style={{ fontSize: 11, padding: '4px 10px' }}>
            Most Recent <ChevronDown size={10} />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left: Feed */}
        <div style={{ borderRight: '1px solid var(--sf-border)' }}>
          {isRefreshing ? (
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[1,2,3].map((i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div className="shimmer-bg" style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div className="shimmer-bg" style={{ width: '60%', height: 11 }} />
                    <div className="shimmer-bg" style={{ width: '90%', height: 11 }} />
                    <div className="shimmer-bg" style={{ width: '70%', height: 11 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="chatter-post"
            >
              <div style={{ display: 'flex', gap: 12 }}>
                {/* Avatar */}
                <div
                  className="chatter-avatar"
                  style={{
                    background: post.avatarBg,
                    color: '#fff',
                    boxShadow: post.avatarShadow || 'none',
                    fontFamily: 'Orbitron, sans-serif',
                  }}
                >
                  {typeof post.avatar === 'string' ? post.avatar : post.avatar}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--sf-text)', fontFamily: 'Space Grotesk, sans-serif' }}>{post.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>{post.handle}</span>
                    </div>
                    <span className={`badge ${post.badgeCls}`}>{post.badge}</span>
                  </div>

                  <p style={{ fontSize: 11, color: 'var(--sf-muted)', marginTop: 2, fontFamily: 'Space Grotesk, sans-serif' }}>{post.time}</p>

                  <p style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6, color: '#c5d8ee', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {post.content}
                  </p>

                  {post.link && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                      <a
                        href={post.link} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 12, fontWeight: 700, color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {post.linkLabel} <ExternalLink size={10} />
                      </a>
                      <a href={post.link} target="_blank" rel="noopener noreferrer" className="sf-btn-ghost" style={{ fontSize: 11, padding: '2px 8px', textDecoration: 'none' }}>
                        {post.actionLabel}
                      </a>
                    </div>
                  )}

                  {/* Like / Comment */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10 }}>
                    <button
                      onClick={() => handleLike(post.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5, fontSize: 12,
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: likedPosts.has(post.id) ? 'var(--neon-cyan)' : 'var(--sf-muted)',
                        fontFamily: 'Space Grotesk, sans-serif',
                        transition: 'color 0.2s',
                      }}
                    >
                      <ThumbsUp size={12} />
                      Like {(post.likes + (likedPosts.has(post.id) ? 1 : 0)) > 0 ? `(${post.likes + (likedPosts.has(post.id) ? 1 : 0)})` : ''}
                    </button>
                    <button
                      style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sf-muted)', fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      <MessageCircle size={12} />
                      Comment {post.comments > 0 ? `(${post.comments})` : ''}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Contact Form */}
        <div style={{ padding: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--sf-text)', marginBottom: 4, fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.06em' }}>
            Send a Message
          </h3>
          <p style={{ fontSize: 12, color: 'var(--sf-muted)', marginBottom: 16, fontFamily: 'Space Grotesk, sans-serif' }}>
            Drop Aman a message — he'll respond within 24 hours.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { id: 'contact-name', label: 'Name', type: 'text', key: 'name', placeholder: 'Your name' },
                { id: 'contact-email', label: 'Email', type: 'email', key: 'email', placeholder: 'your@email.com' },
              ].map(({ id, label, type, key, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 5, color: 'var(--sf-muted)', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {label} *
                  </label>
                  <input
                    id={id} type={type} required placeholder={placeholder}
                    value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="sf-input" style={{ fontSize: 12, padding: '7px 10px' }}
                  />
                </div>
              ))}
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 5, color: 'var(--sf-muted)', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Message *
              </label>
              <textarea
                id="contact-message" required rows={4}
                placeholder="Tell Aman about your opportunity or project..."
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="sf-input" style={{ fontSize: 12, padding: '7px 10px', resize: 'none', lineHeight: 1.6 }}
              />
            </div>

            <motion.button
              type="submit" disabled={sending}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="sf-btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: 13 }}
            >
              {sending ? (
                <><motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-flex' }}>⟳</motion.span> Sending...</>
              ) : (
                <><Send size={14} /> Send Message</>
              )}
            </motion.button>
          </form>

          {/* Quick links */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--sf-border)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, marginBottom: 10, color: 'var(--sf-muted)', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Quick Links
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'GitHub Profile',   href: 'https://github.com/aman-1044',                        icon: <Github size={14} color="var(--sf-muted)" /> },
                { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/aman-anand-201b5219a/',  icon: <Linkedin size={14} color="var(--sf-muted)" /> },
              ].map(({ label, href, icon }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 12, padding: '8px 12px', borderRadius: 8,
                    background: 'rgba(0,212,255,0.04)',
                    border: '1px solid var(--sf-border)',
                    color: 'var(--neon-cyan)',
                    fontWeight: 600, textDecoration: 'none',
                    fontFamily: 'Space Grotesk, sans-serif',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon-cyan)'; e.currentTarget.style.boxShadow = 'var(--glow-cyan)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--sf-border)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  {icon}
                  {label}
                  <ExternalLink size={10} color="var(--sf-muted)" style={{ marginLeft: 'auto' }} />
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
              borderColor: toast.type === 'success' ? 'rgba(0,255,157,0.4)' : toast.type === 'error' ? 'rgba(234,0,30,0.4)' : 'rgba(0,212,255,0.4)',
            }}
          >
            {toast.type === 'success'
              ? <CheckCircle2 size={18} color="var(--neon-green)" />
              : toast.type === 'error'
              ? <XCircle size={18} color="var(--sf-red)" />
              : <CheckCircle2 size={18} color="var(--neon-cyan)" />
            }
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13 }}>{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
