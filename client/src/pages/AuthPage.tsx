import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Mail, Lock, LogIn, Shield, Eye, EyeOff } from 'lucide-react'

export const AuthPage = () => {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [tab, setTab] = useState<'login' | 'signup'>('login')

  return (
    <div className="min-h-screen w-full flex bg-[var(--color-bg-deep)] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.06] top-[-100px] right-[-100px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-emerald)] opacity-[0.04] bottom-[-80px] left-[-80px]" />

      {/* Left Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative p-12">
        <div className="max-w-md space-y-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-emerald)] flex items-center justify-center shadow-lg shadow-[var(--color-primary-glow)]">
              <Shield size={24} className="text-white" />
            </div>
            <span className="text-3xl font-bold text-white">Car<span className="gradient-text">Sage</span></span>
          </div>
          <h1 className="text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
            The Ethereal Guardian of <span className="gradient-text">Automotive Data</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            AI-powered verification that sees what others miss. Join 1,400+ smart buyers who verify before they sign.
          </p>

          {/* Trust Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: '1,432', label: 'Cars Verified' },
              { value: '99.2%', label: 'Accuracy' },
              { value: '$84k', label: 'Saved' },
            ].map((stat, i) => (
              <div key={i} className="kpi-card p-4 text-center">
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Auth Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-10 space-y-7 relative overflow-hidden">
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" />

            <div className="text-center lg:text-left">
              <div className="lg:hidden flex items-center gap-2 justify-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-emerald)] flex items-center justify-center">
                  <Shield size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-white">Car<span className="gradient-text">Sage</span></span>
              </div>
              <h2 className="text-2xl font-bold text-white">{tab === 'login' ? 'Welcome back' : 'Create account'}</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                {tab === 'login' ? 'Sign in to your account' : 'Start verifying cars for free'}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex p-1 bg-[var(--color-bg-glass)] rounded-xl border border-[var(--color-border-glass)]">
              {(['login', 'signup'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                    tab === t
                      ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary-glow)]'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  {t === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard') }}>
              {tab === 'signup' && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-4 py-3.5 bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] rounded-xl text-white placeholder-[var(--color-text-muted)] text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full pl-11 pr-4 py-3.5 bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] rounded-xl text-white placeholder-[var(--color-text-muted)] text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  className="w-full pl-11 pr-12 py-3.5 bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] rounded-xl text-white placeholder-[var(--color-text-muted)] text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <button
                type="submit"
                className="liquid-glass-btn w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
              >
                <LogIn size={16} />
                {tab === 'login' ? 'Sign In' : 'Create Account'}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--color-border-glass)]" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-[var(--color-bg-card)] text-[var(--color-text-muted)]">Or continue with</span>
                </div>
              </div>

              {/* Google OAuth */}
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="ghost-btn w-full py-3.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
