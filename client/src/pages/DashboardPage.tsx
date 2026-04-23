import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Car, CheckCircle2, AlertTriangle, User, Search, Settings, HelpCircle, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const monthlyChecks = [
  { name: 'Jan', checks: 4, cost: 400 },
  { name: 'Feb', checks: 3, cost: 300 },
  { name: 'Mar', checks: 2, cost: 200 },
  { name: 'Apr', checks: 6, cost: 600 },
  { name: 'May', checks: 8, cost: 800 },
  { name: 'Jun', checks: 5, cost: 500 },
]

const recentCars = [
  { id: '1', make: 'Toyota', model: 'Camry', year: 2021, status: 'Verified', risk: 'Low', date: '2026-04-20' },
  { id: '2', make: 'Honda', model: 'Civic', year: 2019, status: 'Flagged', risk: 'High', date: '2026-04-18' },
  { id: '3', make: 'Ford', model: 'Mustang', year: 2022, status: 'Verified', risk: 'Medium', date: '2026-04-10' },
]

export const DashboardPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-stone-900 text-slate-50 flex">
      {/* Glass Sidebar */}
      <aside className="w-64 glass-sidebar flex flex-col p-6 sticky top-0 h-screen hidden md:flex">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-[#84cc16] text-[#030526] p-2 rounded-lg font-bold">CS</div>
          <span className="text-xl font-heading font-semibold">CarSaga</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white transition-colors">
            <Activity className="w-5 h-5 text-[#84cc16]" /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <Car className="w-5 h-5" /> My Cars
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <HelpCircle className="w-5 h-5" /> Support
          </button>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-stone-700 w-10 h-10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-medium">User Account</span>
              <span className="text-slate-400 text-xs text-ellipsis overflow-hidden">Buyer</span>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-white/5 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">Your Garage</h1>
            <p className="text-slate-400 text-sm">Overview of your recent car verifications</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search saved cars..." className="bg-black/20 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#84cc16] w-64 text-slate-50" />
            </div>
            <button onClick={() => navigate('/verify')} className="bg-[#84cc16] hover:bg-[#65a30d] text-black font-semibold py-2 px-6 rounded-full shadow-[0_0_15px_rgba(132,204,22,0.4)] transition-all">
              + New Report
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-slate-400 font-medium">Total Cars Checked</h3>
              <Car className="w-5 h-5 text-[#84cc16]" />
            </div>
            <div className="text-4xl font-bold">28</div>
            <div className="text-[#84cc16] text-sm mt-2 flex items-center gap-1">+12% from last month</div>
          </div>
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-slate-400 font-medium">Safe to Buy</h3>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-4xl font-bold">19</div>
            <div className="text-emerald-400 text-sm mt-2 flex items-center gap-1">Highly recommended</div>
          </div>
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-slate-400 font-medium">High Risk Flagged</h3>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-4xl font-bold">4</div>
            <div className="text-slate-400 text-sm mt-2 flex items-center gap-1">Avoided bad purchases</div>
          </div>
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="glass-card p-6 min-h-[350px]">
            <h3 className="text-lg font-semibold mb-6">Verification Activity</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyChecks} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorChecks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} dy={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#84cc16' }}
                  />
                  <Area type="monotone" dataKey="checks" stroke="#84cc16" strokeWidth={3} fillOpacity={1} fill="url(#colorChecks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-6">Recent Reports</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-sm">
                  <th className="pb-3 font-medium">Vehicle</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                  <th className="pb-3 font-medium text-center">Risk</th>
                  <th className="pb-3 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentCars.map((car) => (
                  <tr key={car.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate(`/report/${car.id}`)}>
                    <td className="py-4">
                      <div className="font-semibold">{car.make} {car.model}</div>
                      <div className="text-xs text-slate-400">{car.year}</div>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        car.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {car.status}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`inline-flex items-baseline text-xs ${
                        car.risk === 'Low' ? 'text-emerald-400' : 
                        car.risk === 'Medium' ? 'text-amber-400' : 'text-red-500'
                      }`}>
                        {car.risk} Risk
                      </span>
                    </td>
                    <td className="py-4 text-right text-sm text-slate-300">{car.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
