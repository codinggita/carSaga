import { useParams, useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, MapPin, Search, ArrowLeft, Shield, CheckCircle, MessageSquare, Share2, Download, Eye } from 'lucide-react'

const maintenanceData = [
  { year: '2026', cost: 450 },
  { year: '2027', cost: 600 },
  { year: '2028', cost: 1200 },
  { year: '2029', cost: 850 },
  { year: '2030', cost: 2100 },
]

const findings = [
  { label: 'Right fender scratch', severity: 'warning', cost: '$150-$300' },
  { label: 'Battery health at 87%', severity: 'info', cost: 'Monitor' },
  { label: 'Tires at 60% tread', severity: 'info', cost: '$400-$600' },
]

export const ReportPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[var(--color-bg-deep)]/80 backdrop-blur-2xl border-b border-[var(--color-border-glass)] px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors">
              <ArrowLeft size={16} /> Dashboard
            </button>
            <div className="h-5 w-[1px] bg-[var(--color-border-glass)]" />
            <span className="text-sm font-semibold text-white">Report #{id || '123'}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/chat')} className="ghost-btn px-4 py-2 rounded-xl text-sm font-medium text-white flex items-center gap-2">
              <MessageSquare size={14} /> Ask Sage AI
            </button>
            <button className="ghost-btn px-4 py-2 rounded-xl text-sm font-medium text-white flex items-center gap-2">
              <Share2 size={14} /> Share
            </button>
            <button className="liquid-glass-btn px-4 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-2">
              <Download size={14} /> Export PDF
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Overview Card */}
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-emerald)] to-transparent opacity-50" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="verified-badge px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle size={12} /> Verified
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Medium Risk
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-1">2019 Toyota Prius</h1>
                <p className="text-[var(--color-text-muted)] text-sm font-mono">VIN: JTDKNAM32X012****</p>
              </div>
              <div className="flex gap-4">
                {[
                  { label: 'Condition', value: '8.2/10', color: 'var(--color-emerald)' },
                  { label: 'Market Value', value: '$15.5k', color: 'var(--color-primary-light)' },
                  { label: 'Issues', value: '1', color: 'var(--color-warning)' },
                ].map((stat, i) => (
                  <div key={i} className="kpi-card px-5 py-4 text-center min-w-[90px]">
                    <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Analysis */}
          <div className="glass-card p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Eye size={18} className="text-[var(--color-primary-light)]" /> Visual Analysis
              </h3>
              <span className="text-xs text-[var(--color-text-muted)]">AI-detected findings</span>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden relative bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] mb-6">
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60" alt="Car analysis" />

              {/* Hotspot overlay */}
              <div className="absolute top-[25%] right-[30%]">
                <div className="bg-amber-500 w-4 h-4 rounded-full animate-ping absolute" />
                <div className="bg-amber-500 w-4 h-4 rounded-full relative z-10 border-2 border-white cursor-pointer" />
              </div>
              <div className="absolute bottom-[30%] left-[20%]">
                <div className="bg-[var(--color-primary)] w-3 h-3 rounded-full animate-ping absolute opacity-60" />
                <div className="bg-[var(--color-primary)] w-3 h-3 rounded-full relative z-10 border-2 border-white cursor-pointer" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                <span className="text-xs text-[var(--color-text-secondary)]">Click hotspots for details</span>
                <span className="flex items-center gap-1.5 text-xs text-amber-400">
                  <AlertTriangle size={12} /> 1 Issue Found
                </span>
              </div>
            </div>

            {/* Findings List */}
            <div className="space-y-3">
              {findings.map((f, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)]">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${f.severity === 'warning' ? 'bg-amber-400' : 'bg-[var(--color-primary-light)]'}`} />
                    <span className="text-sm text-white">{f.label}</span>
                  </div>
                  <span className="text-xs font-medium text-[var(--color-text-muted)]">{f.cost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Cost Chart */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-6">Projected Maintenance Cost</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceData}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="rgba(148,163,184,0.4)" tickLine={false} axisLine={false} dy={10} tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(148,163,184,0.15)', borderRadius: '12px' }}
                    itemStyle={{ color: '#60a5fa' }}
                    formatter={(value: number) => [`$${value}`, 'Est. Cost']}
                  />
                  <Bar dataKey="cost" fill="url(#barGrad)" radius={[8, 8, 0, 0]} barSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[var(--color-text-muted)] text-xs mt-4 text-center">Spike in 2030 due to timing belt + water pump replacements based on model history.</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Vehicle Specs */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-5">Vehicle Specs</h3>
            <dl className="space-y-4 text-sm">
              {[
                { label: 'VIN', value: 'JTDKNAM32X012****', mono: true },
                { label: 'Make / Model', value: 'Toyota Prius', bold: true },
                { label: 'Year', value: '2019' },
                { label: 'Odometer', value: '~45,210 mi' },
                { label: 'Previous Owners', value: '2' },
                { label: 'Last Service', value: '2026-01-15' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center pb-3 border-b border-[var(--color-border-subtle)] last:border-0 last:pb-0">
                  <dt className="text-[var(--color-text-muted)]">{item.label}</dt>
                  <dd className={`${item.mono ? 'font-mono text-xs' : ''} ${item.bold ? 'font-semibold' : ''} text-white`}>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Nearby Mechanics */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Nearby Mechanics</h3>
              <Search size={16} className="text-[var(--color-text-muted)]" />
            </div>
            <p className="text-[var(--color-text-muted)] text-sm mb-4">Book an on-site inspection before purchasing.</p>

            <div className="w-full h-40 rounded-xl overflow-hidden relative bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] mb-4">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="Map" />
              <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[var(--color-primary-light)] drop-shadow-lg" />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-center text-[10px] text-[var(--color-text-muted)]">
                Map requires API key • Mock data shown
              </div>
            </div>

            <div className="space-y-2">
              {[
                { name: "Joe's Auto Repair", dist: '2.1 mi', rating: '4.8★' },
                { name: 'Elite Diagnostics', dist: '3.5 mi', rating: '4.9★' },
              ].map((shop, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-glass-hover)] cursor-pointer transition-all">
                  <div>
                    <p className="text-sm font-semibold text-white">{shop.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{shop.dist} • {shop.rating}</p>
                  </div>
                  <MapPin size={16} className="text-[var(--color-primary-light)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
