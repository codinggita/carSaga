import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { Navigation } from 'lucide-react'
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
  { subject: 'Appreciation', A: 60, B: 65, fullMark: 100 },
]

export const AnalyticsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-stone-900 text-slate-50 p-6 md:p-10">
      <header className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 glass-card hover:bg-white/10 rounded-full transition-colors">
            <Navigation className="w-5 h-5 rotate-[-90deg]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold font-heading mb-1">Comparison Analytics</h1>
            <p className="text-slate-400 text-sm">Compare options to aid your purchasing decision.</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Table comparison */}
        <section className="glass-card p-6 md:col-span-2 overflow-x-auto">
          <h3 className="text-xl font-bold mb-4">Head-to-Head</h3>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-sm">
                <th className="pb-3 w-1/3">Feature</th>
                <th className="pb-3 w-1/3 text-[#84cc16]">🚗 Toyota Prius (2019)</th>
                <th className="pb-3 w-1/3 text-blue-400">🚙 Honda Civic (2020)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5">
                <td className="py-4 font-medium text-slate-400">Asking Price</td>
                <td className="py-4">$15,500</td>
                <td className="py-4">$16,200</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 font-medium text-slate-400">Mileage</td>
                <td className="py-4">45,210 mi</td>
                <td className="py-4">38,100 mi</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 font-medium text-slate-400">Issues Found</td>
                <td className="py-4 text-amber-400">1 (Cosmetic)</td>
                <td className="py-4 text-emerald-400">0</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 font-medium text-slate-400">5-Year Maint. Cost</td>
                <td className="py-4">$5,200</td>
                <td className="py-4">$3,750</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Charts */}
        <section className="glass-card p-6 min-h-[350px]">
          <h3 className="text-lg font-semibold mb-6">Cumulative Maintenance Track</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" tick={{fontSize: 12}} dy={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line type="monotone" name="Prius" dataKey="car1" stroke="#84cc16" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                <Line type="monotone" name="Civic" dataKey="car2" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass-card p-6 min-h-[350px]">
          <h3 className="text-lg font-semibold mb-6">Score Radar</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={categoryCompare}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Prius" dataKey="A" stroke="#84cc16" fill="#84cc16" fillOpacity={0.3} />
                <Radar name="Civic" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </main>
    </div>
  )
}
