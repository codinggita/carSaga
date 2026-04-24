import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, Loader2, Search, Sparkles, RefreshCw, Lock, ScanLine, FileText, History, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const VerificationPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'visual' | 'vin'>('visual')
  const [vin, setVin] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // In a real app, this would advance the pipeline and process images.
    console.log("Files dropped", acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

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
                {/* Upload Dropzone */}
                <div {...getRootProps()} className={`w-full relative bg-gradient-to-br from-[#FEFEFF] to-gray-50/50 p-10 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-50/80 text-center rounded-3xl shrink-0 ${
                  isDragActive ? 'border-[var(--color-primary)] border-2 shadow-sm' : 'border-2 border-dashed border-gray-200 hover:border-gray-300'
                }`}>
                  <input {...getInputProps()} />
                  <div className="w-14 h-14 rounded-full bg-[#0f172a] shadow-lg shadow-gray-400/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <UploadCloud size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#D6EFFF] drop-shadow-sm" style={{ color: '#8fbce8' /* Matching the light pastel blue of screenshot */ }}>Drag & Drop Vehicle Media</h3>
                  <p className="text-xs text-gray-400 max-w-xs font-semibold mt-1">Supported formats: JPG, PNG, HEIC. Upload multiple angles for comprehensive structural analysis.</p>
                </div>

                {/* AI Processing Preview Component */}
                <div className="relative w-full rounded-3xl overflow-hidden bg-[#0a0f1c] aspect-[4/3] shadow-lg border border-gray-200/50 flex-shrink-0 mx-auto max-w-2xl group flex-1 min-h-[300px]">
                  {/* The Car Image Placeholder */}
                  <img src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-70" alt="Car scan" />
                  
                  {/* AI Bounding Boxes overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Scan Line */}
                    <motion.div 
                      animate={{ y: ['0%', '100%', '0%'] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="w-[120%] -left-[10%] h-[1px] bg-blue-400 shadow-[0_0_15px_#60a5fa] opacity-60 relative"
                    />
                    
                    {/* Bounding Box 1 */}
                    <div className="absolute top-[35%] left-[25%] w-[120px] h-[80px] border border-blue-300 bg-blue-400/10 rounded-sm">
                      <div className="absolute -top-7 left-0 bg-blue-300 backdrop-blur-md px-2 py-1 rounded-sm text-[9px] font-mono text-[#0f172a] font-extrabold leading-tight shadow-sm">
                        headlight_L:<br/>95%
                      </div>
                    </div>
                    
                    {/* Bounding Box 2 */}
                    <div className="absolute top-[55%] right-[25%] w-[140px] h-[140px] border border-emerald-400 bg-emerald-400/10 rounded-sm">
                      <div className="absolute -top-5 left-0 bg-emerald-400 backdrop-blur-md px-2 py-1 rounded-sm text-[9px] font-mono text-[#0f172a] font-extrabold shadow-sm">
                        Panel_Gap_OK
                      </div>
                    </div>
                  </div>

                  {/* Processing Badge */}
                  <div className="absolute top-4 right-4 bg-[#0f172a]/70 backdrop-blur-xl border border-emerald-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <Loader2 size={12} className="text-emerald-400 animate-spin" />
                    <span className="text-[10px] font-extrabold text-emerald-400 font-mono tracking-wider">Processing: 42%</span>
                  </div>
                </div>
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
                  placeholder="JTDBT••••••••••••"
                  className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center text-2xl font-mono tracking-[0.2em] text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder-gray-300 shadow-inner"
                />
                <button className="bg-[var(--color-primary)] hover:bg-[#eb5a46] text-white w-full max-w-md py-4 rounded-xl text-sm font-bold mt-8 shadow-lg shadow-[var(--color-primary-glow)] transition-all">
                  Lookup Vehicle Intelligence
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

