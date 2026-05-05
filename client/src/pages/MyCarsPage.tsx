import { useEffect, useState } from 'react'
import { ArrowLeft, Car, Loader2, Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { getCarImage } from '../utils/imageUtils'
import type { Vehicle } from './DashboardPage'

export const MyCarsPage = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/cars');
        setVehicles(data);
      } catch (error) {
        console.error("Failed to load cars", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredVehicles = vehicles.filter(car => 
    `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] p-4 sm:p-6 md:p-10 relative overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary-light)] opacity-20 top-[-100px] right-[-100px]" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 max-w-5xl mx-auto relative z-10 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="ghost-btn p-2.5 rounded-xl transition-colors bg-white">
            <ArrowLeft size={18} className="text-[#0f172a]" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 text-[#0f172a]">My Garage</h1>
            <p className="text-[var(--color-text-muted)] text-sm">Manage and review all your verified vehicles</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-[var(--color-border-glass)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--color-primary)] w-56 text-[#0f172a] placeholder-[var(--color-text-muted)] shadow-sm transition-all"
            />
          </div>
          {/* Mobile Search */}
          <div className="relative md:hidden w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-[var(--color-border-glass)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--color-primary)] w-full text-[#0f172a] placeholder-[var(--color-text-muted)] shadow-sm transition-all"
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

      <main className="max-w-5xl mx-auto relative z-10">
        <div className="glass-card p-6 bg-white min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
              <Car size={20} className="text-[var(--color-primary)]" /> All Vehicles
            </h3>
            <span className="text-xs text-[var(--color-text-secondary)] bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              {filteredVehicles.length} total
            </span>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 text-[var(--color-primary)] animate-spin" /></div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center p-20 text-[var(--color-text-muted)]">
                <p className="text-lg font-bold text-[#0f172a] mb-2">No vehicles found</p>
                <p className="text-sm">Start a new verification report to add a car to your garage.</p>
              </div>
            ) : filteredVehicles.map((car) => (
              <div
                key={car._id}
                onClick={() => navigate(`/report/${car._id}`)}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 hover:border-gray-200 cursor-pointer transition-all group shadow-sm gap-3"
              >
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 shrink-0 shadow-sm relative group-hover:border-[var(--color-primary)]/50 transition-colors">
                    <img src={getCarImage(car.make, car.model, car.brandImage)} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-lg font-bold text-[#0f172a]">{car.year} {car.make} {car.model}</p>
                    <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-0.5">Added on {new Date(car.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${
                    car.riskLevel === 'low' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    car.riskLevel === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    'bg-red-50 text-red-600 border border-red-100'
                  }`}>
                    {car.riskLevel} Risk
                  </span>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${
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
      </main>
    </div>
  )
}
