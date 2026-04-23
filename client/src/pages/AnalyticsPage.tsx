import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { ArrowLeft, TrendingUp, Scale } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const costOverTime = [
  { year: '2026', car1: 450, car2: 300 },
  { year: '2027', car1: 600, car2: 700 },
  { year: '2028', car1: 1200, car2: 750 },
  { year: '2029', car1: 850, car2: 900 },
  { year: '2030', car1: 2100, car2: 1100 },
]

const categoryCompare = [
  { subject: 'Reliability', A: 80, B: 90, fullMark: 100 },
  { subject: 'Safety', A: 95, B: 85, fullMark: 100 },
  { subject: 'Cost to Own', A: 70, B: 88, fullMark: 100 },
  { subject: 'Features', A: 90, B: 75, fullMark: 100 },
  { subject: 'Value Hold', A: 60, B: 65, fullMark: 100 },
]

const tooltipStyle = {
  contentStyle: { backgroundColor: 'rgba(15,23,42,0.95)', borderColor: 'rgba(148,163,184,0.15)', borderRadius: '12px' },
}

export const AnalyticsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] p-6 md:p-10 relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-primary)] opacity-[0.03] top-0 right-0" />

      <header className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="ghost-btn p-2.5 rounded-xl transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">Comparison Analytics</h1>
            <p className="text-[var(--color-text-muted)] text-sm">Side-by-side comparison to aid your purchase decision.</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Head-to-Head Table */}
        <section className="glass-card p-6 md:col-span-2 overflow-x-auto relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-emerald)] to-transparent opacity-40" />

          <div className="flex items-center gap-3 mb-6">
            <Scale size={20} className="text-[var(--color-primary-light)]" />
            <h3 className="text-xl font-bold">Head-to-Head</h3>
          </div>

          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[var(--color-border-glass)] text-sm">
                <th className="pb-4 text-[var(--color-text-muted)] font-medium w-1/3">Feature</th>
                <th className="pb-4 w-1/3">
                  <span className="text-[var(--color-primary-light)] font-semibold">🚗 Toyota Prius</span>
                  <span className="text-[var(--color-text-muted)] text-xs ml-2">2019</span>
                </th>
                <th className="pb-4 w-1/3">
                  <span className="text-[var(--color-emerald)] font-semibold">🚙 Honda Civic</span>
                  <span className="text-[var(--color-text-muted)] text-xs ml-2">2020</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { feature: 'Asking Price', a: '$15,500', b: '$16,200' },
                { feature: 'Mileage', a: '45,210 mi', b: '38,100 mi' },
                { feature: 'Issues Found', a: '1 (Cosmetic)', aClass: 'text-amber-400', b: '0', bClass: 'text-[var(--color-emerald)]' },
                { feature: '5-Year Maint. Cost', a: '$5,200', b: '$3,750' },
                { feature: 'Condition Score', a: '8.2/10', aClass: 'text-[var(--color-primary-light)]', b: '9.0/10', bClass: 'text-[var(--color-emerald)]' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-glass)] transition-colors">
                  <td className="py-4 text-[var(--color-text-muted)] font-medium">{row.feature}</td>
                  <td className={`py-4 ${row.aClass || 'text-white'}`}>{row.a}</td>
                  <td className={`py-4 ${row.bClass || 'text-white'}`}>{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Maintenance Line Chart */}
        <section className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={18} className="text-[var(--color-primary-light)]" />
            <h3 className="text-lg font-bold">Maintenance Track</h3>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" vertical={false} />
                <XAxis dataKey="year" stroke="rgba(148,163,184,0.4)" tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 12 }} dy={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(148,163,184,0.4)" tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
                <Line type="monotone" name="Prius" dataKey="car1" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }} />
                <Line type="monotone" name="Civic" dataKey="car2" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Radar Chart */}
        <section className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Score Radar</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={categoryCompare}>
                <PolarGrid stroke="rgba(148,163,184,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Prius" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Civic" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip {...tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  )
}
