import { useParams, useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, MapPin, Search, ArrowLeft, CheckCircle, MessageSquare, Share2, Download, Eye } from 'lucide-react'

import reportData from '../data/reportData.json'

const { maintenanceData, findings } = reportData;

export const ReportPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-[var(--color-border-glass)] px-6 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#0f172a] transition-colors font-semibold">
              <ArrowLeft size={16} /> Dashboard
            </button>
            <div className="h-5 w-[1px] bg-gray-200" />
            <span className="text-sm font-extrabold text-[#0f172a]">Report #{id || '123'}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/chat')} className="ghost-btn px-4 py-2 rounded-xl text-sm font-bold text-[#0f172a] flex items-center gap-2">
              <MessageSquare size={14} /> Ask Sage AI
            </button>
            <button className="ghost-btn px-4 py-2 rounded-xl text-sm font-bold text-[#0f172a] flex items-center gap-2">
              <Share2 size={14} /> Share
            </button>
            <button className="liquid-glass-btn px-4 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-2">
              <Download size={14} /> Export PDF
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary-light)] opacity-20 top-[10%] left-[-100px] absolute pointer-events-none" />
        
        {/* Left: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Overview Card */}
          <div className="glass-card p-8 relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-emerald)] to-transparent opacity-80" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="verified-badge px-3 py-1 text-xs font-extrabold flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <CheckCircle size={12} /> Verified
                  </span>
                  <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                    Medium Risk
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-[#0f172a]">2019 Toyota Prius</h1>
                <p className="text-[var(--color-text-secondary)] text-sm font-mono font-medium">VIN: JTDKNAM32X012****</p>
              </div>
              <div className="flex gap-4">
                {reportData.overviewStats.map((stat, i) => (
                  <div key={i} className="kpi-card px-5 py-4 text-center min-w-[90px] bg-gray-50 border-gray-100 shadow-sm hover:border-gray-200">
                    <p className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[10px] text-[var(--color-text-secondary)] mt-1 font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Analysis */}
          <div className="glass-card p-6 relative overflow-hidden bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold flex items-center gap-2 text-[#0f172a]">
                <Eye size={18} className="text-[var(--color-primary)]" /> Visual Analysis
              </h3>
              <span className="text-xs text-[var(--color-text-secondary)] font-semibold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">AI-detected findings</span>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden relative bg-gray-100 border border-gray-200 mb-6">
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-90" alt="Car analysis" />

              {/* Hotspot overlay */}
              <div className="absolute top-[25%] right-[30%]">
                <div className="bg-amber-500 w-4 h-4 rounded-full animate-ping absolute" />
                <div className="bg-amber-500 w-4 h-4 rounded-full relative z-10 border-2 border-white cursor-pointer shadow-lg" />
              </div>
              <div className="absolute bottom-[30%] left-[20%]">
                <div className="bg-[var(--color-primary)] w-3 h-3 rounded-full animate-ping absolute opacity-60" />
                <div className="bg-[var(--color-primary)] w-3 h-3 rounded-full relative z-10 border-2 border-white cursor-pointer shadow-lg" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                <span className="text-xs text-gray-200 font-medium">Click hotspots for details</span>
                <span className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <AlertTriangle size={12} /> 1 Issue Found
                </span>
              </div>
            </div>

            {/* Findings List */}
            <div className="space-y-3">
              {findings.map((f, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${f.severity === 'warning' ? 'bg-amber-500' : 'bg-[var(--color-primary)]'} shadow-sm`} />
                    <span className="text-sm text-[#0f172a] font-bold">{f.label}</span>
                  </div>
                  <span className="text-xs font-extrabold text-[var(--color-text-secondary)]">{f.cost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Cost Chart */}
          <div className="glass-card p-6 bg-white">
            <h3 className="text-lg font-extrabold mb-6 text-[#0f172a]">Projected Maintenance Cost</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceData}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FE654F" />
                      <stop offset="100%" stopColor="#FB7A6A" opacity={0.6}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="rgba(0,0,0,0.1)" tickLine={false} axisLine={false} dy={10} tick={{ fill: '#475569', fontSize: 12, fontWeight: 'bold' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: 'var(--color-border-glass)', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    itemStyle={{ color: '#FE654F', fontWeight: 'extrabold' }}
                    formatter={(value: any) => [`$${value}`, 'Est. Cost']}
                  />
                  <Bar dataKey="cost" fill="url(#barGrad)" radius={[8, 8, 0, 0]} barSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[var(--color-text-secondary)] text-xs mt-4 text-center font-medium">Spike in 2030 due to timing belt + water pump replacements based on model history.</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Vehicle Specs */}
          <div className="glass-card p-6 bg-white">
            <h3 className="text-lg font-extrabold mb-5 text-[#0f172a]">Vehicle Specs</h3>
            <dl className="space-y-4 text-sm">
              {reportData.vehicleSpecs.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <dt className="text-[var(--color-text-secondary)] font-medium">{item.label}</dt>
                  <dd className={`${item.mono ? 'font-mono text-xs' : ''} ${item.bold ? 'font-extrabold' : 'font-bold'} text-[#0f172a]`}>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Nearby Mechanics */}
          <div className="glass-card p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-[#0f172a]">Nearby Mechanics</h3>
              <Search size={16} className="text-[var(--color-text-secondary)]" />
            </div>
            <p className="text-[var(--color-text-secondary)] text-xs font-medium mb-4">Book an on-site inspection before purchasing.</p>

            <div className="w-full h-40 rounded-xl overflow-hidden relative bg-gray-100 border border-gray-200 mb-4 shadow-inner">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 mix-blend-multiply" alt="Map" />
              <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#FE654F] drop-shadow-xl animate-bounce" />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-white to-white/0 text-center text-[10px] font-bold text-gray-500">
                Map requires API key • Mock data shown
              </div>
            </div>

            <div className="space-y-2">
              {reportData.mechanics.map((shop, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-gray-200 cursor-pointer transition-all">
                  <div>
                    <p className="text-sm font-extrabold text-[#0f172a]">{shop.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] font-bold">{shop.dist} • <span className="text-amber-500">{shop.rating}</span></p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <MapPin size={14} className="text-[var(--color-primary)]" />
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
