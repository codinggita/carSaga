import { useParams, useNavigate } from 'react-router-dom'
import Spline from '@splinetool/react-spline'

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, MapPin, Search, Navigation } from 'lucide-react'

const maintenanceData = [
  { year: '2026', cost: 450 },
  { year: '2027', cost: 600 },
  { year: '2028', cost: 1200 },
  { year: '2029', cost: 850 },
  { year: '2030', cost: 2100 },
]

export const ReportPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-stone-900 text-slate-50">
      {/* Navbar Minimal */}
      <nav className="glass-card sticky top-0 z-50 rounded-none border-t-0 border-x-0 border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
           <div className="bg-[#84cc16] text-black w-8 h-8 rounded shrink-0 flex items-center justify-center font-bold">CS</div>
           <span className="font-bold text-lg hidden sm:block">Report #{id || '123'}</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/chat')} className="border border-[#84cc16] text-[#84cc16] hover:bg-[#84cc16]/10 px-4 py-2 rounded-lg text-sm transition-colors font-medium">Ask Expert</button>
          <button className="bg-[#84cc16] text-black hover:bg-[#65a30d] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Share Report</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: 3D Model & History */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-card p-6 aspect-[4/3] sm:aspect-video relative overflow-hidden flex flex-col group">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span className="bg-amber-500/20 text-amber-500 border border-amber-500/50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md">Medium Risk</span>
            </div>
            
            <div className="w-full flex-grow relative cursor-grab active:cursor-grabbing">
              {/* Note: This is an interactive generic car model from Spline community */}
              <Spline scene="https://prod.spline.design/iW9V4hEOMHtz-h8L/scene.splinecode" />
              
              {/* Mock Hotspots overlays */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                 <div className="absolute top-[30%] right-[30%] pointer-events-auto group-hover:scale-110 transition-transform">
                   <div className="bg-red-500 w-4 h-4 rounded-full animate-ping absolute" />
                   <div className="bg-red-500 w-4 h-4 rounded-full relative z-10 border-2 border-white cursor-pointer group/hotspot">
                     <div className="absolute hidden group-hover/hotspot:block bottom-full mb-2 -left-16 w-36 bg-black/80 backdrop-blur-xl p-2 rounded text-xs border border-white/20 whitespace-normal">
                       Scratch detected on right fender. Estimated repair: $150.
                     </div>
                   </div>
                 </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4 flex justify-between items-center text-sm text-slate-400">
              <span>Drag to rotate. Scroll to zoom.</span>
              <span className="flex items-center gap-1 text-red-400"><AlertTriangle className="w-4 h-4" /> 1 Issue Found</span>
            </div>
          </section>

          <section className="glass-card p-6">
            <h3 className="text-xl font-bold mb-6">Estimated Maintenance Cost</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceData}>
                  <XAxis dataKey="year" stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#84cc16' }}
                  />
                  <Bar dataKey="cost" fill="#84cc16" radius={[4,4,0,0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-slate-400 text-sm mt-4 text-center">Spike expected in 2030 due to routine timing belt and water pump replacements based on model history.</p>
          </section>
        </div>

        {/* Right Col: Details & Maps */}
        <div className="space-y-8">
          <section className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4">Vehicle Specs</h3>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt className="text-slate-400">VIN</dt>
                <dd className="font-mono">JTDKNAM32X012****</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt className="text-slate-400">Make / Model</dt>
                <dd className="font-semibold">Toyota Prius</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt className="text-slate-400">Year</dt>
                <dd>2019</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt className="text-slate-400">Odometer Estimate</dt>
                <dd>~45,210 mi</dd>
              </div>
              <div className="flex justify-between pb-2">
                <dt className="text-slate-400">Previous Owners</dt>
                <dd>2</dd>
              </div>
            </dl>
          </section>

          <section className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
              Nearby Mechanics
              <Search className="w-5 h-5 text-slate-400" />
            </h3>
            <p className="text-slate-400 text-sm mb-4">Book an on-site inspection before purchasing.</p>
            
            <div className="w-full h-48 rounded-lg overflow-hidden relative bg-stone-800 border border-white/10">
               {/* 
                  Requires Google Maps API Key in a real implementation.
                  <Map defaultCenter={{lat: 34.05, lng: -118.24}} defaultZoom={13} mapId="DEMO_MAP_ID">
                    <AdvancedMarker position={{lat: 34.05, lng: -118.24}}>
                      <Pin background={'#84cc16'} borderColor={'#000'} glyphColor={'#000'} />
                    </AdvancedMarker>
                  </Map>
               */}
               <div className="absolute inset-x-0 bottom-0 top-1/2 p-4 pt-10 text-center text-sm font-medium bg-gradient-to-t from-black to-transparent flex items-end justify-center">
                 API Key needed for Maps. Displaying mock data.
               </div>
               {/* Mock Map Image */}
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-50" alt="Map mockup" />
               <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#84cc16] drop-shadow-lg" />
            </div>

            <div className="mt-4 space-y-3">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center hover:bg-white/10 cursor-pointer transition-colors">
                <div>
                  <div className="font-semibold text-sm">Joe's Auto Repair</div>
                  <div className="text-xs text-slate-400">2.1 miles away • 4.8★</div>
                </div>
                <Navigation className="w-5 h-5 text-[#84cc16]" />
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center hover:bg-white/10 cursor-pointer transition-colors">
                <div>
                  <div className="font-semibold text-sm">Elite Diagnostics</div>
                  <div className="text-xs text-slate-400">3.5 miles away • 4.9★</div>
                </div>
                <Navigation className="w-5 h-5 text-[#84cc16]" />
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>
  )
}
