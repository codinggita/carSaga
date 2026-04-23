import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Menu, X, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--color-bg-deep)]/80 backdrop-blur-2xl border-b border-[var(--color-border-glass)] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-emerald)] flex items-center justify-center shadow-lg shadow-[var(--color-primary-glow)] group-hover:shadow-xl group-hover:shadow-[var(--color-primary-glow)] transition-shadow">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Car<span className="gradient-text">Sage</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">Pricing</a>
          <Link to="/auth" className="ghost-btn px-4 py-2 rounded-lg text-sm text-white font-medium">Log in</Link>
          <Link to="/dashboard" className="liquid-glass-btn px-5 py-2.5 rounded-xl text-sm text-white font-semibold">
            Get Started Free
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--color-bg-deep)]/95 backdrop-blur-2xl border-t border-[var(--color-border-glass)] px-6 py-6 space-y-4"
        >
          <a href="#features" className="block text-[var(--color-text-secondary)] hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="block text-[var(--color-text-secondary)] hover:text-white transition-colors">How it Works</a>
          <Link to="/auth" className="block text-white font-medium">Log in</Link>
          <Link to="/dashboard" className="liquid-glass-btn block text-center px-5 py-3 rounded-xl text-white font-semibold">
            Get Started Free
          </Link>
        </motion.div>
      )}
    </motion.nav>
  )
}
