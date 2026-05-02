import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { ArrowLeft, TrendingUp, Scale, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'


const tooltipStyle = {
  contentStyle: { backgroundColor: 'rgba(255,255,255,0.95)', borderColor: 'var(--color-border-glass)', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold' },
}

interface CarItem {
  _id: string;
  make: string;
  model: string;
  year: number;
}

export const AnalyticsPage = () => {
  const navigate = useNavigate()
  const [cars, setCars] = useState<CarItem[]>([])
  const [car1Id, setCar1Id] = useState('')
  const [car2Id, setCar2Id] = useState('')
  const [comparisonData, setComparisonData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isComparing, setIsComparing] = useState(false)

  // Fetch user's cars
  useEffect(() => {
    api.get('/cars')
      .then(({ data }) => {
        setCars(data);
        if (data.length >= 2) {
          setCar1Id(data[0]._id);
          setCar2Id(data[1]._id);
        }
      })
      .catch(err => console.error('Failed to load cars', err))
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch comparison when both cars selected
  useEffect(() => {
    if (!car1Id || !car2Id || car1Id === car2Id) {
      setComparisonData(null);
      return;
    }
    setIsComparing(true);
    api.get(`/analytics/compare?car1=${car1Id}&car2=${car2Id}`)
      .then(({ data }) => setComparisonData(data))
      .catch(err => console.error('Failed to compare', err))
      .finally(() => setIsComparing(false));
  }, [car1Id, car2Id]);

  // Build display data
  const c1 = comparisonData?.car1;
  const c2 = comparisonData?.car2;

  // Empty state if no data
  if (cars.length >= 2 && !comparisonData) {
    // Only return empty state JSX if we have cars but haven't fetched comparison yet
    // The main render handles the loading spinner
  }

  const headToHead = {
    car1: { name: c1 ? `${c1.car.make} ${c1.car.model}` : '', year: c1 ? c1.car.year.toString() : '', color: 'var(--color-primary)' },
    car2: { name: c2 ? `${c2.car.make} ${c2.car.model}` : '', year: c2 ? c2.car.year.toString() : '', color: 'var(--color-emerald)' },
    features: c1 && c2 ? [
      { feature: 'Risk Level', a: c1.car.riskLevel?.toUpperCase(), aClass: c1.car.riskLevel === 'low' ? 'text-[var(--color-emerald)]' : 'text-amber-500', b: c2.car.riskLevel?.toUpperCase(), bClass: c2.car.riskLevel === 'low' ? 'text-[var(--color-emerald)]' : 'text-amber-500' },
      { feature: 'Status', a: c1.car.status, b: c2.car.status },
      { feature: 'Odometer', a: c1.report?.vehicleSpecs?.odometerEstimate || 'N/A', b: c2.report?.vehicleSpecs?.odometerEstimate || 'N/A' },
      { feature: 'Issues Found', a: (c1.report?.issues?.length ?? 0).toString(), aClass: (c1.report?.issues?.length ?? 0) === 0 ? 'text-[var(--color-emerald)]' : 'text-amber-500', b: (c2.report?.issues?.length ?? 0).toString(), bClass: (c2.report?.issues?.length ?? 0) === 0 ? 'text-[var(--color-emerald)]' : 'text-amber-500' },
      { feature: 'Condition Score', a: c1.report ? `${(c1.report.overallScore / 10).toFixed(1)}/10` : 'N/A', aClass: 'text-[var(--color-primary)]', b: c2.report ? `${(c2.report.overallScore / 10).toFixed(1)}/10` : 'N/A', bClass: 'text-[var(--color-emerald)]' },
      { feature: 'Challans', a: c1.car.challanStatus?.totalChallan?.toString() || '0', b: c2.car.challanStatus?.totalChallan?.toString() || '0' },
    ] : [],
  };

  // Build maintenance comparison chart data
  const costOverTime = (() => {
    if (!c1 || !c2) return [];
    const f1 = c1.report?.maintenanceForecast || [];
    const f2 = c2.report?.maintenanceForecast || [];
    const maxLen = Math.max(f1.length, f2.length);
    const result = [];
    for (let i = 0; i < maxLen; i++) {
      result.push({
        year: f1[i]?.year || f2[i]?.year || `Year ${i + 1}`,
        car1: f1[i]?.estimatedCost || 0,
        car2: f2[i]?.estimatedCost || 0,
      });
    }
    return result;
  })();

  // Build radar chart data
  const categoryCompare = c1 && c2 ? [
    { subject: 'Condition', A: c1.report?.overallScore || 0, B: c2.report?.overallScore || 0, fullMark: 100 },
    { subject: 'Low Issues', A: Math.max(0, 100 - (c1.report?.issues?.length || 0) * 20), B: Math.max(0, 100 - (c2.report?.issues?.length || 0) * 20), fullMark: 100 },
    { subject: 'Clean Challan', A: (c1.car.challanStatus?.totalChallan || 0) === 0 ? 100 : 30, B: (c2.car.challanStatus?.totalChallan || 0) === 0 ? 100 : 30, fullMark: 100 },
    { subject: 'Low Risk', A: c1.car.riskLevel === 'low' ? 95 : c1.car.riskLevel === 'medium' ? 60 : 25, B: c2.car.riskLevel === 'low' ? 95 : c2.car.riskLevel === 'medium' ? 60 : 25, fullMark: 100 },
    { subject: 'Verified', A: c1.car.status === 'verified' ? 100 : 40, B: c2.car.status === 'verified' ? 100 : 40, fullMark: 100 },
  ] : [];

  const car1Label = `${c1?.car.make || 'Car 1'}`;
  const car2Label = `${c2?.car.make || 'Car 2'}`;

  const selectClass = "bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] appearance-none min-w-[200px]";

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] p-6 md:p-10 relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-primary-light)] opacity-20 top-0 right-0" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 max-w-7xl mx-auto relative z-10 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="ghost-btn p-2.5 rounded-xl transition-colors bg-white">
            <ArrowLeft size={18} className="text-[#0f172a]" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-[#0f172a]">Comparison Analytics</h1>
            <p className="text-[var(--color-text-muted)] text-sm">Side-by-side comparison to aid your purchase decision.</p>
          </div>
        </div>

        {/* Car Selectors */}
        {cars.length >= 2 && (
          <div className="flex items-center gap-3">
            <select value={car1Id} onChange={(e) => setCar1Id(e.target.value)} className={selectClass}>
              {cars.map(c => <option key={c._id} value={c._id}>{c.year} {c.make} {c.model}</option>)}
            </select>
            <span className="text-sm font-bold text-[var(--color-text-muted)]">vs</span>
            <select value={car2Id} onChange={(e) => setCar2Id(e.target.value)} className={selectClass}>
              {cars.map(c => <option key={c._id} value={c._id}>{c.year} {c.make} {c.model}</option>)}
            </select>
          </div>
        )}
      </header>

      {isLoading || isComparing ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-[var(--color-primary)] animate-spin" /></div>
      ) : cars.length < 2 ? (
        <div className="max-w-7xl mx-auto text-center py-20 relative z-10">
          <p className="text-lg font-bold text-[#0f172a] mb-2">Need at least 2 verified cars to compare</p>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">Add more cars to your garage to unlock comparison analytics.</p>
        </div>
      ) : !comparisonData ? (
        <div className="max-w-7xl mx-auto text-center py-20 relative z-10">
          <p className="text-lg font-bold text-[#0f172a] mb-2">Select cars to compare</p>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">Choose two cars from the dropdowns above to see head-to-head analytics.</p>
        </div>
      ) : null}

      {comparisonData && (
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
                  <span className="text-[var(--color-primary)] font-extrabold">🚗 {headToHead.car1.name}</span>
                  <span className="text-[var(--color-text-muted)] text-xs ml-2">{headToHead.car1.year}</span>
                </th>
                <th className="pb-4 w-1/3">
                  <span className="text-[var(--color-emerald)] font-extrabold">🚙 {headToHead.car2.name}</span>
                  <span className="text-[var(--color-text-muted)] text-xs ml-2">{headToHead.car2.year}</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold">
              {headToHead.features.map((row: any, i: number) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-[var(--color-text-secondary)] font-medium">{row.feature}</td>
                  <td className={`py-4 capitalize ${row.aClass || 'text-[#0f172a]'}`}>{row.a}</td>
                  <td className={`py-4 capitalize ${row.bClass || 'text-[#0f172a]'}`}>{row.b}</td>
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
              <LineChart data={costOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="year" stroke="rgba(0,0,0,0.2)" tick={{ fill: '#475569', fontSize: 12 }} dy={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(0,0,0,0.2)" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip {...tooltipStyle} formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, undefined]} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '16px', color: '#0f172a', fontWeight: 'bold' }} />
                <Line type="monotone" name={car1Label} dataKey="car1" stroke="#FE654F" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                <Line type="monotone" name={car2Label} dataKey="car2" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Radar Chart */}
        <section className="glass-card p-6 bg-white">
          <h3 className="text-lg font-bold mb-6 text-[#0f172a]">Score Radar</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={categoryCompare}>
                <PolarGrid stroke="rgba(0,0,0,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={car1Label} dataKey="A" stroke="#FE654F" fill="#FE654F" fillOpacity={0.2} strokeWidth={3} />
                <Radar name={car2Label} dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={3} />
                <Tooltip contentStyle={tooltipStyle.contentStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '16px', color: '#0f172a', fontWeight: 'bold' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
      )}
    </div>
  )
}
