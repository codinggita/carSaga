import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn } from 'lucide-react'

export const AuthPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-stone-900 py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full glass-card p-10 space-y-8"
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-slate-50">Welcome to CarSaga</h2>
          <p className="mt-2 text-sm text-slate-300">Sign in to verify your future car</p>
        </div>
        
        <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
          <button className="flex-1 py-2 text-sm font-medium rounded-md bg-[#84cc16]/20 text-[#84cc16] shadow-sm">Buyer</button>
          <button className="flex-1 py-2 text-sm font-medium rounded-md text-slate-300 hover:text-white transition-colors">Mechanic</button>
          <button className="flex-1 py-2 text-sm font-medium rounded-md text-slate-300 hover:text-white transition-colors">Dealer</button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input type="email" required className="appearance-none relative block w-full px-10 py-3 border border-white/20 bg-white/5 placeholder-slate-400 text-white rounded-lg focus:outline-none focus:ring-[#84cc16] focus:border-[#84cc16] sm:text-sm" placeholder="Email address" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input type="password" required className="appearance-none relative block w-full px-10 py-3 border border-white/20 bg-white/5 placeholder-slate-400 text-white rounded-lg focus:outline-none focus:ring-[#84cc16] focus:border-[#84cc16] sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-[#84cc16] hover:bg-[#65a30d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-[#84cc16] transition-colors shadow-[0_0_15px_rgba(132,204,22,0.4)]">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-black group-hover:text-black/80" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-stone-900 text-slate-400">Or continue with</span>
            </div>
          </div>
          
          <div>
            <button type="button" onClick={() => navigate('/dashboard')} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-white/20 rounded-lg shadow-sm bg-white/5 text-sm font-medium text-white hover:bg-white/10 focus:outline-none transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
              Google
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
