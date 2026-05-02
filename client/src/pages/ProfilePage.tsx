import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, User, Mail, Shield, Award, Edit3, Key, Camera, Loader2, CheckCircle2, AlertCircle, X, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'motion/react'
import type { RootState } from '../store'
import { setCredentials } from '../store/authSlice'
import api from '../services/api'

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  // Password state
  const [showPwModal, setShowPwModal] = useState(false);
  const [pwData, setPwData] = useState({ current: '', new: '', confirm: '', otp: '' });
  const [pwError, setPwError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCooldown > 0) {
      timer = setInterval(() => setOtpCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpCooldown]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const { data } = await api.patch('/auth/profile', { name });
      dispatch(setCredentials({ user: data, token: token! }));
      setIsEditing(false);
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Update failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (otpCooldown > 0) return;
    setIsLoading(true);
    setPwError('');
    try {
      await api.post('/auth/send-otp');
      setOtpSent(true);
      setOtpCooldown(60);
    } catch (err: any) {
      setPwError(err.response?.data?.message || 'Failed to send OTP. Check email settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');

    if (pwData.new !== pwData.confirm) {
      setPwError('New passwords do not match');
      return;
    }

    if (!pwData.otp) {
      setPwError('Please enter the OTP sent to your email');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.patch('/auth/profile', { 
        currentPassword: pwData.current, 
        newPassword: pwData.new,
        otp: pwData.otp
      });
      dispatch(setCredentials({ user: data, token: token! }));
      setShowPwModal(false);
      setPwData({ current: '', new: '', confirm: '', otp: '' });
      setOtpSent(false);
      setStatus({ type: 'success', message: 'Password changed successfully!' });
    } catch (err: any) {
      setPwError(err.response?.data?.message || 'Password change failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setIsLoading(true);
      try {
        const { data } = await api.patch('/auth/profile', { avatar: base64String });
        dispatch(setCredentials({ user: data, token: token! }));
        setStatus({ type: 'success', message: 'Profile picture updated!' });
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to upload picture' });
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] p-6 md:p-10 relative overflow-hidden flex justify-center items-start font-inter">
      <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary-light)] opacity-20 top-[-100px] right-[-100px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-emerald)] opacity-10 bottom-0 left-0" />

      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-6">
        <header className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/dashboard')} className="ghost-btn p-2.5 rounded-xl transition-colors bg-white shadow-sm border border-gray-100 hover:border-gray-300 group">
            <ArrowLeft size={18} className="text-[#0f172a] group-hover:scale-110 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Settings & Profile</h1>
            <p className="text-[var(--color-text-muted)] text-sm font-medium">Manage your account details and preferences</p>
          </div>
        </header>

        {status && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-bold shadow-sm ${
              status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
            }`}
          >
            {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {status.message}
            <button onClick={() => setStatus(null)} className="ml-auto opacity-50 hover:opacity-100"><X size={16}/></button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="glass-card p-8 bg-white flex flex-col items-center text-center shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-warning)] opacity-40" />
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-white flex items-center justify-center text-[#0f172a] font-extrabold text-4xl shadow-xl overflow-hidden">
                  {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : (user?.name?.[0]?.toUpperCase() || 'U')}
                </div>
                <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-[-8px] right-[-8px] w-10 h-10 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 active:scale-95 transition-transform">
                  <Camera size={18} />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
              </div>
              <h2 className="text-xl font-extrabold text-[#0f172a] mb-1">{user?.name}</h2>
              <p className="text-xs font-bold text-[var(--color-text-muted)] flex items-center gap-1.5 justify-center mb-6"><Mail size={12} /> {user?.email}</p>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="glass-card p-8 bg-white shadow-sm border border-gray-100/50">
              <h3 className="text-lg font-bold text-[#0f172a] mb-6 flex items-center gap-2"><User size={20} className="text-[var(--color-primary)]" /> Personal Information</h3>
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                    <input type="text" disabled={!isEditing} value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-semibold text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all disabled:opacity-60" />
                  </div>
                </div>
                <div className="flex justify-end pt-4 gap-3">
                  {isEditing ? (
                    <>
                      <button type="button" onClick={() => { setIsEditing(false); setName(user?.name || ''); }} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-[#0f172a]">Cancel</button>
                      <button type="submit" disabled={isLoading} className="liquid-glass-btn px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2">{isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Save Changes'}</button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all px-5 py-2.5 rounded-xl border border-[var(--color-primary)]/20"><Edit3 size={16} /> Edit Profile</button>
                  )}
                </div>
              </form>
            </div>

            <div className="glass-card p-8 bg-white shadow-sm border border-gray-100/50">
              <h3 className="text-lg font-bold text-[#0f172a] mb-2 flex items-center gap-2"><Key size={20} className="text-[var(--color-primary)]" /> Security Settings</h3>
              <p className="text-sm font-medium text-[var(--color-text-muted)] mb-6">Changing your password requires email verification.</p>
              <button onClick={() => setShowPwModal(true)} className="flex items-center gap-3 text-sm font-bold text-[#0f172a] px-6 py-3 rounded-2xl border border-gray-100 hover:border-[var(--color-primary)] bg-gray-50 hover:bg-white transition-all group">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[var(--color-primary)] transition-colors"><Key size={16} /></div>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPwModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPwModal(false)} className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl relative z-10 border border-white max-h-[90vh] overflow-y-auto hide-scrollbar">
              <h2 className="text-2xl font-extrabold text-[#0f172a] mb-2">Secure Update</h2>
              <p className="text-sm font-medium text-gray-500 mb-6">Verify your identity via OTP to change password.</p>
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {pwError && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2"><AlertCircle size={14} /> {pwError}</div>}
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Current Password</label>
                  <input type="password" required value={pwData.current} onChange={(e) => setPwData({...pwData, current: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:outline-none focus:border-[var(--color-primary)]" />
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Verification</label>
                    <button type="button" onClick={handleSendOtp} disabled={isLoading || otpCooldown > 0} className="text-[10px] font-bold text-[var(--color-primary)] hover:underline disabled:text-gray-400">
                      {otpCooldown > 0 ? `Resend in ${otpCooldown}s` : (otpSent ? 'Resend OTP' : 'Send OTP')}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                    <input type="text" placeholder="Enter 6-digit OTP" required value={pwData.otp} onChange={(e) => setPwData({...pwData, otp: e.target.value})} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:outline-none focus:border-[var(--color-primary)]" />
                  </div>
                  {otpSent && <p className="text-[10px] font-bold text-emerald-600 mt-2">Code sent to {user?.email}</p>}
                </div>

                <div className="pt-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">New Password</label>
                  <input type="password" required value={pwData.new} onChange={(e) => setPwData({...pwData, new: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:outline-none focus:border-[var(--color-primary)]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Confirm New Password</label>
                  <input type="password" required value={pwData.confirm} onChange={(e) => setPwData({...pwData, confirm: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:outline-none focus:border-[var(--color-primary)]" />
                </div>
                
                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={() => setShowPwModal(false)} className="flex-1 py-4 text-sm font-bold text-gray-500 hover:text-[#0f172a]">Cancel</button>
                  <button type="submit" disabled={isLoading || !otpSent} className="flex-1 liquid-glass-btn py-4 rounded-[1.5rem] text-sm font-bold text-white shadow-lg disabled:opacity-50">
                    {isLoading ? <Loader2 size={18} className="animate-spin m-auto" /> : 'Confirm Change'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
