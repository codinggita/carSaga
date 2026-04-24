import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { ArrowLeft, TrendingUp, Scale } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import analyticsData from '../data/analyticsData.json'

const tooltipStyle = {
  contentStyle: { backgroundColor: 'rgba(255,255,255,0.95)', borderColor: 'var(--color-border-glass)', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold' },
}

export const AnalyticsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] p-6 md:p-10 relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-primary-light)] opacity-20 top-0 right-0" />

      <header className="flex justify-between items-center mb-10 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="ghost-btn p-2.5 rounded-xl transition-colors bg-white">
            <ArrowLeft size={18} className="text-[#0f172a]" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-[#0f172a]">Comparison Analytics</h1>
            <p className="text-[var(--color-text-muted)] text-sm">Side-by-side comparison to aid your purchase decision.</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Head-to-Head Table */}
        <section className="glass-card p-6 md:col-span-2 overflow-x-auto relative bg-white">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-emerald)] to-transparent opacity-40" />

          <div className="flex items-center gap-3 mb-6">
            <Scale size={20} className="text-[var(--color-primary)]" />
            <h3 className="text-xl font-bold text-[#0f172a]">Head-to-Head</h3>
          </div>

          <table className="w-full text-left border-collapse min-w-[600px] text-[#0f172a]">
            <thead>
              <tr className="border-b border-gray-100 text-sm">
                <th className="pb-4 text-[var(--color-text-secondary)] font-semibold w-1/3">Feature</th>
                <th className="pb-4 w-1/3">
                  <span className="text-[var(--color-primary)] font-extrabold">🚗 {analyticsData.headToHead.car1.name}</span>
                  <span className="text-[var(--color-text-muted)] text-xs ml-2">{analyticsData.headToHead.car1.year}</span>
                </th>
                <th className="pb-4 w-1/3">
                  <span className="text-[var(--color-emerald)] font-extrabold">🚙 {analyticsData.headToHead.car2.name}</span>
                  <span className="text-[var(--color-text-muted)] text-xs ml-2">{analyticsData.headToHead.car2.year}</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold">
              {analyticsData.headToHead.features.map((row: any, i: number) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-[var(--color-text-secondary)] font-medium">{row.feature}</td>
                  <td className={`py-4 ${row.aClass || 'text-[#0f172a]'}`}>{row.a}</td>
                  <td className={`py-4 ${row.bClass || 'text-[#0f172a]'}`}>{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Maintenance Line Chart */}
        <section className="glass-card p-6 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={18} className="text-[var(--color-primary)]" />
            <h3 className="text-lg font-bold text-[#0f172a]">Maintenance Track</h3>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.costOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="year" stroke="rgba(0,0,0,0.2)" tick={{ fill: '#475569', fontSize: 12 }} dy={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(0,0,0,0.2)" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '16px', color: '#0f172a', fontWeight: 'bold' }} />
                <Line type="monotone" name="Prius" dataKey="car1" stroke="#FE654F" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                <Line type="monotone" name="Civic" dataKey="car2" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Radar Chart */}
        <section className="glass-card p-6 bg-white">
          <h3 className="text-lg font-bold mb-6 text-[#0f172a]">Score Radar</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={analyticsData.categoryCompare}>
                <PolarGrid stroke="rgba(0,0,0,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Prius" dataKey="A" stroke="#FE654F" fill="#FE654F" fillOpacity={0.2} strokeWidth={3} />
                <Radar name="Civic" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={3} />
                <Tooltip contentStyle={tooltipStyle.contentStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '16px', color: '#0f172a', fontWeight: 'bold' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  )
}
