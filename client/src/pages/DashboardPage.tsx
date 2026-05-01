import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Car, CheckCircle2, Search, Settings, HelpCircle, LogOut, Shield, Plus, TrendingUp, MessageSquare, BarChart3, Loader2, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { logout } from '../store/authSlice'
import api from '../services/api'
import { getCarImage } from '../utils/imageUtils'

const navItems = [
  { icon: Activity, label: 'Dashboard', active: true },
  { icon: Car, label: 'My Cars' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: MessageSquare, label: 'Saga AI', path: '/chat' },
]

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  status: 'pending' | 'verified' | 'flagged';
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: string;
  brandImage?: string;
  challanStatus?: { totalChallan: number; statusMessage: string };
}

interface AnalyticsSummary {
  totalCars: number;
  verified: number;
  flagged: number;
  pending: number;
  totalReports: number;
  monthlyChecks: { name: string; checks: number }[];
}

export const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, analyticsRes] = await Promise.all([
          api.get('/cars'),
          api.get('/analytics/summary'),
        ]);
        setVehicles(carsRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  // Build KPIs from live data
  const kpis = analytics ? [
    { label: 'Cars Verified', value: analytics.totalCars.toString(), change: `${analytics.verified} verified`, icon: Car, color: 'var(--color-primary)' },
    { label: 'Pending Reports', value: analytics.pending.toString(), change: `${analytics.totalReports} total reports`, icon: Activity, color: 'var(--color-warning)' },
    { label: 'Clean Verified', value: analytics.verified.toString(), change: analytics.totalCars > 0 ? `${Math.round((analytics.verified / analytics.totalCars) * 100)}% pass rate` : '0%', icon: CheckCircle2, color: 'var(--color-emerald)' },
    { label: 'Flagged', value: analytics.flagged.toString(), change: analytics.flagged > 0 ? 'Review needed' : 'All clear', icon: AlertTriangle, color: analytics.flagged > 0 ? '#ef4444' : 'var(--color-emerald)' },
  ] : [
    { label: 'Cars Verified', value: '0', change: 'Start verifying!', icon: Car, color: 'var(--color-primary)' },
    { label: 'Pending Reports', value: '0', change: 'No reports yet', icon: Activity, color: 'var(--color-warning)' },
    { label: 'Clean Verified', value: '0', change: '0%', icon: CheckCircle2, color: 'var(--color-emerald)' },
    { label: 'Flagged', value: '0', change: 'All clear', icon: AlertTriangle, color: 'var(--color-emerald)' },
  ];

  const chartData = analytics?.monthlyChecks || [];

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] flex">
      {/* Glass Sidebar */}
      <aside className="w-72 glass-sidebar flex flex-col p-6 sticky top-0 h-screen hidden md:flex">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-warning)] flex items-center justify-center shadow-lg shadow-[var(--color-primary-glow)]">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-[#0f172a]">Car<span className="gradient-text">Saga</span></span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ icon: Icon, label, active, path }) => (
            <button
              key={label}
              onClick={() => path && navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:bg-black/5 hover:text-[#0f172a]'
              }`}
            >
              <Icon size={18} className={active ? 'text-[var(--color-primary)]' : ''} />
              {label}
            </button>
          ))}
        </nav>

        <div className="space-y-1 mb-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-text-muted)] hover:bg-black/5 hover:text-[#0f172a] transition-colors">
            <Settings size={18} /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-text-muted)] hover:bg-black/5 hover:text-[#0f172a] transition-colors">
            <HelpCircle size={18} /> Support
          </button>
        </div>

        <div className="pt-4 border-t border-[var(--color-border-glass)]">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-[#0f172a]">{user?.name || 'User'}</span>
              <span className="text-[var(--color-text-muted)] text-xs capitalize">{user?.role || 'Buyer'} • Free Plan</span>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto hide-scrollbar relative">
        <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary-light)] opacity-20 top-[-100px] right-[-100px]" />
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-[#0f172a]">Your Garage</h1>
            <p className="text-[var(--color-text-muted)] text-sm">Overview of your recent car verifications</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search cars..."
                className="bg-white border border-[var(--color-border-glass)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--color-primary)] w-56 text-[#0f172a] placeholder-[var(--color-text-muted)] shadow-sm transition-all"
              />
            </div>
            <button
              onClick={() => navigate('/verification')}
              className="liquid-glass-btn px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 shadow-lg shadow-[var(--color-primary-glow)]"
            >
              <Plus size={16} /> New Report
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8 relative z-10">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="kpi-card p-6 group bg-white">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-semibold text-[var(--color-text-secondary)]">{kpi.label}</p>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all" style={{ background: `color-mix(in srgb, ${kpi.color} 10%, transparent)` }}>
                    <Icon size={18} style={{ color: kpi.color }} />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-[#0f172a]">{kpi.value}</p>
                <p className="text-xs mt-2 font-medium" style={{ color: kpi.color }}>{kpi.change}</p>
              </div>
            );
          })}
        </div>

        {/* Chart + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 relative z-10">
          {/* Chart */}
          <div className="glass-card p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#0f172a]">Verification Activity</h3>
              <span className="text-xs text-[var(--color-text-secondary)] bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">Last 6 months</span>
            </div>
            <div className="h-[250px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorChecks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FE654F" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#FE654F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(0,0,0,0.2)" tick={{fill: '#475569', fontSize: 12}} dy={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(0,0,0,0.2)" tick={{fill: '#475569', fontSize: 12}} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: 'var(--color-border-glass)', borderRadius: '12px', backdropFilter: 'blur(20px)', color: '#0f172a', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                      itemStyle={{ color: '#FE654F', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="checks" stroke="#FE654F" strokeWidth={3} fillOpacity={1} fill="url(#colorChecks)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                  No verification activity yet. Start by verifying a car!
                </div>
              )}
            </div>
          </div>

          {/* Recent Reports Table */}
          <div className="glass-card p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#0f172a]">Recent Reports</h3>
              <button onClick={() => navigate('/analytics')} className="text-xs text-[var(--color-primary)] hover:underline font-semibold">View all</button>
            </div>
            <div className="space-y-2">
              {isLoading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-[var(--color-primary)]" /></div>
              ) : vehicles.length === 0 ? (
                <div className="text-center p-8 text-[var(--color-text-muted)] text-sm">No vehicles added yet. Start a new report!</div>
              ) : vehicles.map((car) => (
                <div
                  key={car._id}
                  onClick={() => navigate(`/report/${car._id}`)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 hover:border-gray-200 cursor-pointer transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 shrink-0 shadow-sm relative group-hover:border-[var(--color-primary)]/50 transition-colors">
                      <img src={getCarImage(car.make, car.model, car.brandImage)} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f172a]">{car.year} {car.make} {car.model}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{new Date(car.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full capitalize ${
                      car.riskLevel === 'low' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      car.riskLevel === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {car.riskLevel} Risk
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full capitalize ${
                      car.status === 'verified'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : car.status === 'flagged' ? 'bg-red-50 text-red-600 border border-red-100'
                        : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {car.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
