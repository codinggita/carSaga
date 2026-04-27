import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Mail, Lock, LogIn, Shield, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/authSlice'
import api from '../services/api'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      
      dispatch(setCredentials({
        user: { id: data._id, name: data.name, email: data.email, role: data.role },
        token: data.token
      }));
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-[var(--color-bg-deep)] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary-light)] opacity-20 top-[-100px] right-[-100px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-emerald)] opacity-10 bottom-[-80px] left-[-80px]" />

      {/* Left Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative p-12">
        <div className="max-w-md space-y-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-warning)] flex items-center justify-center shadow-lg shadow-[var(--color-primary-glow)]">
              <Shield size={24} className="text-white" />
            </div>
            <span className="text-3xl font-bold text-[#0f172a]">Car<span className="gradient-text">Saga</span></span>
          </div>
          <h1 className="text-5xl font-extrabold text-[#0f172a] leading-[1.1] tracking-tight">
            The Ethereal Guardian of <span className="gradient-text">Automotive Data</span>
          </h1>
          <p className="text-lg font-medium text-[var(--color-text-secondary)] leading-relaxed">
            Join the smart way to verify before you sign. Free to start, unparalleled peace of mind.
          </p>

          {/* Trust Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: '1,432', label: 'Cars Verified' },
              { value: '99.2%', label: 'Accuracy' },
              { value: '$84k', label: 'Saved' },
            ].map((stat, i) => (
              <div key={i} className="kpi-card p-4 text-center bg-white shadow-sm border-gray-100">
                <p className="text-xl font-extrabold text-[#0f172a]">{stat.value}</p>
                <p className="text-[10px] font-bold text-[var(--color-text-secondary)] mt-1">{stat.label}</p>
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
          <div className="glass-card p-10 space-y-7 relative overflow-hidden bg-white/70 shadow-xl border border-gray-200">
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-warning)] to-transparent opacity-80" />

            <div className="text-center lg:text-left">
              <div className="lg:hidden flex items-center gap-2 justify-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-warning)] flex items-center justify-center shadow-md">
                  <Shield size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-[#0f172a]">Car<span className="gradient-text">Saga</span></span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f172a]">Create account</h2>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">
                Start verifying cars for free
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Full name"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0f172a] placeholder-gray-400 font-medium text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors shadow-sm"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0f172a] font-medium placeholder-gray-400 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors shadow-sm"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0f172a] font-medium placeholder-gray-400 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors shadow-sm"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0f172a] font-medium placeholder-gray-400 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors shadow-sm"
                />
              </div>

              <div className="flex justify-between items-center text-xs mt-2">
                <Link to="/sign-in" className="font-bold text-[var(--color-primary)] hover:underline">
                  Already have an account? Sign in
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="liquid-glass-btn w-full py-4 mt-2 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary-glow)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
                Create Account
              </button>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
