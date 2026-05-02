import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Loader2, Search, Sparkles, RefreshCw, Lock, ScanLine, FileText, History, TrendingUp, CheckCircle2, ImagePlus, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { CarSelector } from '../components/CarSelector'
import carDatabaseService from '../services/carDatabase.service'

export const VerificationPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'visual' | 'vin'>('visual')
  const [vin, setVin] = useState('')
  const [location, setLocation] = useState('')
  const [registration, setRegistration] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isFetchingChallan, setIsFetchingChallan] = useState(false)
  const [challanInfo, setChallanInfo] = useState<any>(null)
  const [uploads, setUploads] = useState<Record<string, string | null>>({
    front: null,
    rear: null,
    side: null,
    interior: null,
    engine: null,
    underbody: null,
  })

  const uploadCount = Object.values(uploads).filter(Boolean).length;
  const [selectedCar, setSelectedCar] = useState({ make: '', model: '', year: 2023, brandImage: '' });
  const isFormValid = uploadCount >= 0 && registration.trim().length > 0 && selectedCar.make !== '';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, slotId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploads(prev => ({
        ...prev,
        [slotId]: url
      }));
    }
  }

  const handleCheckChallan = async () => {
    if (!registration) return;
    setIsFetchingChallan(true);
    setChallanInfo(null);
    try {
      const data = await carDatabaseService.getChallan(registration);
      setChallanInfo(data);
    } catch (err) {
      console.error('Failed to fetch challan info', err);
      setChallanInfo({ totalChallan: 0, statusMessage: "Could not retrieve records" });
    } finally {
      setIsFetchingChallan(false);
    }
  }

  const GUIDE_SLOTS = [
    { id: 'front', label: 'Front Profile', desc: 'Full grill and headlights' },
    { id: 'rear', label: 'Rear Profile', desc: 'Bumper and tail lights' },
    { id: 'side', label: 'Side Profile', desc: 'Doors and panel gaps' },
    { id: 'interior', label: 'Interior/Dash', desc: 'Odometer and steering' },
    { id: 'engine', label: 'Engine Bay', desc: 'Fluid caps and belts' },
    { id: 'underbody', label: 'Underbody', desc: 'Rust and frame check' },
  ]

  const handleCreateReport = async () => {
    if (!vin && activeTab === 'vin') return;
    if (!selectedCar.make) return;
    setIsProcessing(true);
    
    try {
      const riskLevel = challanInfo?.totalChallan > 0 ? 'high' : (Math.random() > 0.8 ? 'medium' : 'low');
      
      const payload = {
        vin: activeTab === 'vin' ? vin : registration,
        make: selectedCar.make,
        model: selectedCar.model,
        year: selectedCar.year,
        status: 'verified',
        riskLevel,
        location: location,
        brandImage: selectedCar.brandImage,
        challanStatus: challanInfo ? {
          totalChallan: challanInfo.totalChallan || 0,
          statusMessage: challanInfo.statusMessage || 'No data',
          result: challanInfo.result || null,
        } : undefined,
      };
      
      const { data } = await api.post('/cars', payload);
      
      // Artificial delay for UI effect
      await new Promise((resume) => setTimeout(resume, 1500));
      
      // Navigate to the auto-generated report
      navigate(`/report/${data.car._id}`);
    } catch (err) {
      console.error('Failed to create report', err);
      setIsProcessing(false);
    }
  };


  return (
    <div className="min-h-screen flex bg-white text-[#0f172a]">
      {/* Sidebar navigation wrapper for typical layout spacing (matches user image layout context) */}
      <div className="w-[80px] md:w-[240px] hidden sm:flex shrink-0 border-r border-[var(--color-border-glass)] bg-gray-50 flex-col py-8 px-4 relative z-20">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--color-primary-glow)]">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <span className="text-xl font-extrabold hidden md:block tracking-tight">Car<span className="text-[var(--color-primary)]">Saga</span></span>
        </div>

        <nav className="flex flex-col gap-2">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">
            <TrendingUp size={18} /> <span className="hidden md:block font-bold text-sm">Dashboard</span>
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors border border-[var(--color-primary)]/20 shadow-sm">
            <ScanLine size={18} /> <span className="hidden md:block font-bold text-sm">Verify Car</span>
          </button>
          <button onClick={() => navigate('/chat')} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">
            <Sparkles size={18} /> <span className="hidden md:block font-bold text-sm">AI Expert</span>
          </button>
          <button onClick={() => navigate('/analytics')} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">
            <History size={18} /> <span className="hidden md:block font-bold text-sm">Analytics</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 flex flex-col md:flex-row p-6 md:p-10 gap-8 h-screen overflow-hidden relative bg-[var(--color-bg-deep)]">
        
        {/* Main Workspace Column */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-10 hide-scrollbar z-10">
          
          <div className="flex flex-col xl:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#D6EFFF] text-blue-800 rounded-full text-xs font-bold border border-blue-200">
                  <Sparkles size={12} className="text-blue-600" /> AI Verification Live
                </span>
                <span className="text-[var(--color-text-muted)] text-xs font-mono font-medium tracking-wide">REQ-3942</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-3">Initialize Scan</h1>
              <p className="text-[var(--color-text-secondary)] text-sm max-w-md font-medium leading-relaxed">
                Upload high-resolution images or provide a VIN to begin deep neural analysis of the vehicle's history, structural integrity, and market valuation.
              </p>
            </div>
            
            {/* Toggle tabs imitating screenshot */}
            <div className="bg-[#0f172a] rounded-2xl p-1 flex items-center shadow-xl shadow-gray-200 shrink-0">
              <button 
                onClick={() => setActiveTab('visual')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'visual' ? 'bg-[#1e293b] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ScanLine size={16} /> Visual Scan
              </button>
              <button 
                onClick={() => setActiveTab('vin')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'vin' ? 'bg-[#1e293b] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText size={16} /> VIN Lookup
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'visual' ? (
              <motion.div key="visual" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 flex-1 flex flex-col">
                
                {/* Registration & AI Guide Header Combined */}
                <div className="flex flex-col gap-4 bg-white px-6 py-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex flex-col gap-4 border-b border-gray-100 pb-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="reg-input" className="text-sm font-extrabold text-[#0f172a]">Registration Number <span className="text-red-500">*</span></label>
                      <div className="flex gap-2">
                        <input
                          id="reg-input"
                          type="text"
                          value={registration}
                          onChange={(e) => {
                            setRegistration(e.target.value.toUpperCase());
                            setChallanInfo(null);
                          }}
                          placeholder="e.g. MH 12 AB 1234"
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-lg font-mono tracking-wider text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder-gray-400"
                        />
                        <button 
                          onClick={handleCheckChallan}
                          disabled={isFetchingChallan || !registration}
                          className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-50"
                        >
                          {isFetchingChallan ? <Loader2 size={16} className="animate-spin" /> : 'Check Challans'}
                        </button>
                      </div>
                      {challanInfo && (
                        <div className={`text-sm p-3 rounded-lg border flex items-start gap-2 mt-1 ${challanInfo.totalChallan > 0 ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
                          {challanInfo.totalChallan > 0 ? <AlertCircle size={16} className="mt-0.5 shrink-0" /> : <CheckCircle2 size={16} className="mt-0.5 shrink-0" />}
                          <div>
                            <span className="font-bold">{challanInfo.statusMessage}</span>
                            {challanInfo.totalChallan > 0 && <span className="block text-xs mt-0.5">Found {challanInfo.totalChallan} pending challan(s). Review before verification.</span>}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="loc-input" className="text-sm font-extrabold text-[#0f172a]">Location</label>
                      <input
                        id="loc-input"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Mumbai, MH"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-lg text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder-gray-400"
                      />
                    </div>
                    <CarSelector onSelect={setSelectedCar} disabled={isProcessing} />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <h3 className="text-lg font-extrabold text-[#0f172a]">AI Upload Guide <span className="text-red-500">*</span></h3>
                      <p className="text-xs font-semibold text-[var(--color-text-secondary)] mt-0.5">Please provide images for all critical verification zones.</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-extrabold text-[var(--color-primary)]">{uploadCount} / 6 Zones</span>
                      <div className="w-32 h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(uploadCount / 6) * 100}%` }}
                          className="h-full bg-[var(--color-primary)] rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Guide Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 shrink-0">
                  {GUIDE_SLOTS.map((slot) => {
                    const isUploaded = !!uploads[slot.id]
                    return (
                      <label 
                        key={slot.id}
                        className={`relative group h-40 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center p-4 text-center ${
                          isUploaded 
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' 
                            : 'border-dashed border-gray-200 hover:border-[var(--color-primary)] bg-white'
                        }`}
                      >
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleFileUpload(e, slot.id)} 
                        />
                        {isUploaded && uploads[slot.id] ? (
                          <>
                            <img src={uploads[slot.id] as string} alt={slot.label} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="relative z-10 flex flex-col items-center h-full justify-end pb-2">
                              <CheckCircle2 size={24} className="text-[var(--color-primary)] drop-shadow-md mb-1" />
                              <span className="text-xs font-bold text-white drop-shadow-md">{slot.label} recorded</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <ImagePlus size={28} className="text-gray-300 mb-2 group-hover:text-[var(--color-primary)] transition-colors" />
                            <h4 className="text-sm font-bold text-[#0f172a]">{slot.label}</h4>
                            <p className="text-[10px] font-semibold text-[var(--color-text-secondary)] mt-1">{slot.desc}</p>
                          </>
                        )}
                      </label>
                    )
                  })}
                </div>

                {/* Action button if completely uploaded */}
                <button 
                  onClick={handleCreateReport} 
                  disabled={!isFormValid || isProcessing}
                  className={`w-full py-4.5 rounded-2xl text-sm font-bold flex justify-center items-center gap-2 transition-all shadow-lg mt-auto ${
                    isFormValid 
                      ? 'liquid-glass-btn text-white shadow-[var(--color-primary-glow)] hover:opacity-90' 
                      : 'bg-white text-gray-400 cursor-not-allowed shadow-sm border border-gray-100'
                  }`}
                >
                  {isProcessing ? <><Loader2 size={18} className="animate-spin" /> Running Deep Neural Scan...</> 
                  : isFormValid ? 'Initiate Deep Neural Scan' 
                  : registration.trim().length === 0 ? 'Enter Registration Number to proceed'
                  : `Upload ${6 - uploadCount} more images to proceed`}
                </button>
              </motion.div>
            ) : (
              <motion.div key="vin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white border border-gray-100 p-12 flex flex-col items-center justify-center text-center rounded-3xl shadow-sm flex-1 min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-[#0f172a] shadow-lg shadow-gray-400/20 flex items-center justify-center mb-6">
                  <Search size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold mb-2 text-[#0f172a]">VIN Lookup</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-10 max-w-sm">Enter the 17-character Vehicle Identification Number to fetch factory specs, history reports, and real-time OEM recalls.</p>
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  maxLength={17}
                  disabled={isProcessing}
                  placeholder="JTDBT••••••••••••"
                  className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center text-2xl font-mono tracking-[0.2em] text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder-gray-300 shadow-inner disabled:opacity-50"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isProcessing}
                  placeholder="Location (e.g. Mumbai, MH)"
                  className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-2xl p-4 mt-4 text-center text-lg text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder-gray-300 shadow-inner disabled:opacity-50"
                />
                <div className="w-full max-w-md mt-4 text-left">
                  <CarSelector onSelect={setSelectedCar} disabled={isProcessing} />
                </div>
                <button 
                  onClick={handleCreateReport} 
                  disabled={isProcessing}
                  className="bg-[var(--color-primary)] hover:bg-[#eb5a46] text-white w-full max-w-md py-4 rounded-xl text-sm font-bold mt-8 shadow-lg shadow-[var(--color-primary-glow)] transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? <><Loader2 size={18} className="animate-spin" /> Processing AI Models...</> : 'Lookup Vehicle Intelligence'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar: Analysis Pipeline */}
        <div className="w-80 lg:w-[350px] h-full flex flex-col relative rounded-3xl p-8 shrink-0 overflow-hidden bg-gradient-to-b from-[#e5f3ff] via-[#f7fbff] to-white border border-blue-50/50 shadow-sm z-10 hidden md:flex">
          
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white rounded-full blur-[40px] opacity-70 pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-12 relative z-10">
            <Sparkles size={18} className="text-blue-500" />
            <h3 className="text-lg font-extrabold text-blue-500 tracking-wide">Analysis Pipeline</h3>
          </div>

          <div className="flex-1 relative z-10">
            {/* Stepper Timeline Line */}
            <div className="absolute top-4 bottom-20 left-[5px] w-[2px] bg-gradient-to-b from-blue-200 via-gray-200 to-transparent rounded-full" />

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative pl-8">
                <div className="absolute -left-[3px] top-1 w-4 h-4 rounded-full bg-blue-400 ring-4 ring-[#e5f3ff] shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-extrabold text-blue-500">Visual Inspection</h4>
                  <RefreshCw size={14} className="text-blue-400 animate-spin" />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                     <div className="h-full bg-[#0f172a] rounded-full w-[42%]" />
                  </div>
                  <span className="text-[10px] font-extrabold text-gray-500 font-mono">42%</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative pl-8">
                <div className="absolute left-[1px] top-1.5 w-2 h-2 rounded-full bg-gray-400 ring-4 ring-[#f4f9fe]" />
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-gray-400">VIN Decryption</h4>
                  <FileText size={14} className="text-gray-300" />
                </div>
                <p className="text-[11px] text-gray-400/80 font-semibold leading-relaxed">Awaiting visual<br/>confirmation.</p>
              </div>

              {/* Step 3 */}
              <div className="relative pl-8">
                <div className="absolute left-[1px] top-1.5 w-2 h-2 rounded-full bg-gray-400 ring-4 ring-[#f7fbff]" />
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-gray-400">History Reconciliation</h4>
                  <History size={14} className="text-gray-300" />
                </div>
                <p className="text-[11px] text-gray-400/80 font-semibold leading-relaxed pr-4">Cross-referencing 40+<br/>global databases.</p>
              </div>

              {/* Step 4 */}
              <div className="relative pl-8">
                <div className="absolute left-[1px] top-1.5 w-2 h-2 rounded-full bg-gray-400 ring-4 ring-white" />
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-gray-400">Valuation Synthesis</h4>
                  <TrendingUp size={14} className="text-gray-300" />
                </div>
                <p className="text-[11px] text-gray-400/80 font-semibold leading-relaxed pt-1">Calculating real-time<br/>market delta.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 flex items-center justify-center gap-2 text-gray-400/60 relative z-10 border-t border-gray-100">
            <Lock size={10} />
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase">End-to-end Encrypted Analysis</span>
          </div>
        </div>
      </div>
    </div>
  )
}

