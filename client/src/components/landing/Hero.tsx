import { motion } from 'motion/react'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Orbs */}
      <div className="glow-orb w-[700px] h-[700px] bg-[var(--color-primary)] opacity-[0.07] top-[-200px] right-[-200px]" />
      <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-emerald)] opacity-[0.05] bottom-[-100px] left-[-150px]" />
      <div className="glow-orb w-[300px] h-[300px] bg-[var(--color-primary-light)] opacity-[0.04] top-1/3 left-1/4" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Text */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] backdrop-blur-xl text-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--color-emerald)] animate-pulse" />
            <span className="text-[var(--color-text-secondary)]">Trusted by <span className="text-[#0f172a] font-extrabold">1,400+</span> buyers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[0.95]"
          >
            Don't buy blind.{' '}
            <span className="gradient-text">Verify in seconds.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-xl leading-relaxed"
          >
            Upload car photos, enter a VIN, and get a full AI&#8209;powered verification report — condition, history, and future costs — before you sign.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/verification" className="liquid-glass-btn px-8 py-4 rounded-2xl text-base font-bold text-white inline-flex items-center gap-2.5">
              Start Free Analysis <ArrowRight size={18} />
            </Link>
            <button className="ghost-btn px-6 py-4 rounded-2xl text-base font-bold text-[#0f172a] bg-white border border-gray-200 hover:bg-gray-50 shadow-sm inline-flex items-center gap-2.5">
              <Play size={16} className="text-[var(--color-primary)]" /> View Demo
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap items-center gap-6 pt-4"
          >
            {['No credit card required', 'Free first report', 'AI-powered analysis'].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                <CheckCircle size={14} className="text-[var(--color-emerald)]" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Dashboard Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, type: 'spring', stiffness: 50 }}
          className="lg:w-1/2 relative"
        >
          <div className="glass-card p-1 rounded-2xl relative overflow-hidden">
            {/* Top glow bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-60" />

            <div className="bg-[var(--color-bg-deep)] rounded-xl overflow-hidden">
              {/* Mock Dashboard Header */}
              <div className="px-6 py-4 border-b border-[var(--color-border-glass)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-[var(--color-text-muted)] font-mono">carsaga.ai/dashboard</span>
                <div />
              </div>

              {/* Mock Content */}
              <div className="p-6 space-y-4">
                {/* KPI Row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Cars Verified', value: '1,432', color: 'var(--color-primary)' },
                    { label: 'Issues Found', value: '286', color: 'var(--color-warning)' },
                    { label: 'Savings', value: '$84.2k', color: 'var(--color-emerald)' },
                  ].map((kpi, i) => (
                    <div key={i} className="kpi-card p-4 text-center">
                      <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                      <p className="text-[11px] text-[var(--color-text-muted)] mt-1">{kpi.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mock Chart */}
                <div className="h-36 rounded-lg bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] p-4 relative overflow-hidden">
                  <p className="text-xs text-[var(--color-text-muted)] mb-3">Projected Maintenance Cost</p>
                  <svg width="100%" height="80" viewBox="0 0 400 80" fill="none" className="opacity-80">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 60 Q50 55, 80 45 T160 35 T240 25 T320 40 T400 20" stroke="#2563eb" strokeWidth="2" fill="none" />
                    <path d="M0 60 Q50 55, 80 45 T160 35 T240 25 T320 40 T400 20 L400 80 L0 80 Z" fill="url(#chartGrad)" />
                  </svg>
                </div>

                {/* Live Feed */}
                <div className="space-y-2">
                  {[
                    { car: '2021 BMW X3', status: 'Verified', color: 'var(--color-emerald)' },
                    { car: '2019 Honda Civic', status: 'Processing', color: 'var(--color-primary-light)' },
                    { car: '2020 Toyota Camry', status: 'Flagged', color: 'var(--color-danger)' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)]">
                      <span className="text-sm text-[var(--color-text-primary)]">{item.car}</span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{
                        color: item.color,
                        backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)`,
                      }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Notification */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute -right-4 top-12 glass-card px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--color-emerald)]/20 flex items-center justify-center">
              <CheckCircle size={16} className="text-[var(--color-emerald)]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0f172a]">Report Ready</p>
              <p className="text-[10px] font-medium text-[var(--color-text-secondary)]">2021 BMW X3 — Clean</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
