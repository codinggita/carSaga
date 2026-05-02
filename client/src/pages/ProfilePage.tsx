import { ArrowLeft, User, Mail, Shield, Award, Edit3, Key } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] p-6 md:p-10 relative overflow-hidden flex justify-center items-start">
      <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary-light)] opacity-20 top-[-100px] right-[-100px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-emerald)] opacity-10 bottom-0 left-0" />

      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/dashboard')} className="ghost-btn p-2.5 rounded-xl transition-colors bg-white shadow-sm border border-gray-100 hover:border-gray-300">
            <ArrowLeft size={18} className="text-[#0f172a]" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Settings & Profile</h1>
            <p className="text-[var(--color-text-muted)] text-sm">Manage your account details and preferences</p>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="glass-card p-6 bg-white flex flex-col items-center text-center shadow-sm">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary)] flex items-center justify-center text-white font-extrabold text-4xl mb-4 shadow-lg shadow-[var(--color-primary-glow)]">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <h2 className="text-xl font-bold text-[#0f172a] mb-1">{user?.name || 'User Name'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-1.5 justify-center mb-4">
                <Mail size={14} /> {user?.email || 'user@example.com'}
              </p>
              
              <div className="w-full pt-4 border-t border-gray-100 flex flex-col gap-2 text-sm">
                <div className="flex justify-between items-center px-2 py-1">
                  <span className="text-[var(--color-text-muted)] flex items-center gap-2"><Shield size={14}/> Role</span>
                  <span className="font-semibold text-[#0f172a] capitalize">{user?.role || 'Buyer'}</span>
                </div>
                <div className="flex justify-between items-center px-2 py-1">
                  <span className="text-[var(--color-text-muted)] flex items-center gap-2"><Award size={14}/> Status</span>
                  <span className="font-bold text-[var(--color-emerald)] bg-emerald-50 px-2 py-0.5 rounded-md text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="glass-card p-6 bg-white shadow-sm">
              <h3 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                <User size={18} className="text-[var(--color-primary)]" /> Personal Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">Full Name</label>
                  <input type="text" disabled defaultValue={user?.name} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-[#0f172a] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">Email Address</label>
                  <input type="email" disabled defaultValue={user?.email} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-[#0f172a] focus:outline-none" />
                </div>
                <div className="flex justify-end pt-2">
                  <button className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors px-4 py-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200">
                    <Edit3 size={16} /> Edit Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 bg-white shadow-sm">
              <h3 className="text-lg font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                <Key size={18} className="text-[var(--color-primary)]" /> Security Settings
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">Manage your password and security preferences.</p>
              
              <button className="flex items-center gap-2 text-sm font-bold text-[#0f172a] hover:text-[var(--color-primary)] transition-colors px-4 py-2.5 rounded-xl border border-gray-200 hover:border-[var(--color-primary)] bg-gray-50 hover:bg-white shadow-sm">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
