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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
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

  const handleGoogleSignup = () => {
    setError('');
    setIsGoogleLoading(true);

    if (!(window as any).google) {
      setError('Google sign-in is still loading. Please try again in a moment.');
      setIsGoogleLoading(false);
      return;
    }

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError('Google sign-in is not configured.');
      setIsGoogleLoading(false);
      return;
    }

    (window as any).google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: any) => {
        try {
          const { data } = await api.post('/auth/google', { credential: response.credential });

          dispatch(setCredentials({
            user: { id: data._id, name: data.name, email: data.email, role: data.role },
            token: data.token
          }));

          navigate('/dashboard');
        } catch (err: any) {
          setError(err.response?.data?.message || 'Google sign-up failed. Please try again.');
        } finally {
          setIsGoogleLoading(false);
        }
      },
    });

    (window as any).google.accounts.id.prompt();
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

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-400 font-bold">Or sign up with</span>
                </div>
              </div>

              {/* Google OAuth */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={isGoogleLoading}
                className="ghost-btn w-full py-3.5 rounded-xl text-sm font-bold text-[#0f172a] border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center gap-3 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGoogleLoading ? (
                  <Loader2 size={18} className="animate-spin text-gray-400" />
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                Continue with Google
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
