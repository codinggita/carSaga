import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Car, CheckCircle2, AlertTriangle, User, Search, Settings, HelpCircle, LogOut, Shield, Plus, TrendingUp, MessageSquare, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const monthlyChecks = [
  { name: 'Jan', checks: 4, cost: 400 },
  { name: 'Feb', checks: 3, cost: 300 },
  { name: 'Mar', checks: 7, cost: 700 },
  { name: 'Apr', checks: 6, cost: 600 },
  { name: 'May', checks: 12, cost: 1200 },
  { name: 'Jun', checks: 8, cost: 800 },
]

const recentCars = [
  { id: '1', make: 'Toyota', model: 'Camry', year: 2021, status: 'Verified', risk: 'Low', date: '2026-04-20' },
  { id: '2', make: 'Honda', model: 'Civic', year: 2019, status: 'Flagged', risk: 'High', date: '2026-04-18' },
  { id: '3', make: 'Ford', model: 'Mustang', year: 2022, status: 'Verified', risk: 'Medium', date: '2026-04-10' },
  { id: '4', make: 'BMW', model: 'X3', year: 2021, status: 'Verified', risk: 'Low', date: '2026-04-05' },
]

const navItems = [
  { icon: Activity, label: 'Dashboard', active: true },
  { icon: Car, label: 'My Cars' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: MessageSquare, label: 'Sage AI', path: '/chat' },
]

export const DashboardPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] flex">
      {/* Glass Sidebar */}
      <aside className="w-72 glass-sidebar flex flex-col p-6 sticky top-0 h-screen hidden md:flex">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-emerald)] flex items-center justify-center shadow-lg shadow-[var(--color-primary-glow)]">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white">Car<span className="gradient-text">Sage</span></span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ icon: Icon, label, active, path }) => (
            <button
              key={label}
              onClick={() => path && navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-[var(--color-primary)]/10 text-white border border-[var(--color-primary)]/20'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-glass-hover)] hover:text-white'
              }`}
            >
              <Icon size={18} className={active ? 'text-[var(--color-primary-light)]' : ''} />
              {label}
            </button>
          ))}
        </nav>

        <div className="space-y-1 mb-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-bg-glass-hover)] hover:text-white transition-colors">
            <Settings size={18} /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-bg-glass-hover)] hover:text-white transition-colors">
            <HelpCircle size={18} /> Support
          </button>
        </div>

        <div className="pt-4 border-t border-[var(--color-border-glass)]">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-emerald)] flex items-center justify-center text-white font-bold text-sm">
              RJ
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-white">Rituraj</span>
              <span className="text-[var(--color-text-muted)] text-xs">Buyer • Free Plan</span>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto hide-scrollbar">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">Your Garage</h1>
            <p className="text-[var(--color-text-muted)] text-sm">Overview of your recent car verifications</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search cars..."
                className="bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--color-primary)] w-56 text-white placeholder-[var(--color-text-muted)] backdrop-blur-xl transition-colors"
              />
            </div>
            <button
              onClick={() => navigate('/verification')}
              className="liquid-glass-btn px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2"
            >
              <Plus size={16} /> New Report
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Cars Verified', value: '1,432', change: '+12%', icon: Car, color: 'var(--color-primary)' },
            { label: 'Pending Reports', value: '24', change: '3 new', icon: Activity, color: 'var(--color-warning)' },
            { label: 'Clean Verified', value: '1,146', change: '80%', icon: CheckCircle2, color: 'var(--color-emerald)' },
            { label: 'Savings Found', value: '$84.2k', change: '+$12k', icon: TrendingUp, color: 'var(--color-emerald)' },
          ].map(({ label, value, change, icon: Icon, color }, i) => (
            <div key={i} className="kpi-card p-6 group">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}>
                  <Icon size={18} style={{ color }} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-xs mt-2 font-medium" style={{ color }}>{change}</p>
            </div>
          ))}
        </div>

        {/* Chart + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Chart */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Verification Activity</h3>
              <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-glass)] px-3 py-1.5 rounded-lg border border-[var(--color-border-glass)]">Last 6 months</span>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyChecks} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorChecks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(148,163,184,0.4)" tick={{fill: 'rgba(148,163,184,0.6)', fontSize: 12}} dy={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(148,163,184,0.4)" tick={{fill: 'rgba(148,163,184,0.6)', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(148,163,184,0.15)', borderRadius: '12px', backdropFilter: 'blur(20px)' }}
                    itemStyle={{ color: '#60a5fa' }}
                  />
                  <Area type="monotone" dataKey="checks" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorChecks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Reports Table */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Recent Reports</h3>
              <button className="text-xs text-[var(--color-primary-light)] hover:underline">View all</button>
            </div>
            <div className="space-y-2">
              {recentCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => navigate(`/report/${car.id}`)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-glass-hover)] hover:border-[var(--color-border-glass)] cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-elevated)] flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
                      <Car size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary-light)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{car.year} {car.make} {car.model}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{car.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      car.risk === 'Low' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      car.risk === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {car.risk}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      car.status === 'Verified'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
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
