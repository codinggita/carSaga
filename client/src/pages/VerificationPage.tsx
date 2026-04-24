import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useDropzone } from 'react-dropzone'
import { CheckCircle2, ArrowRight, ArrowLeft, ImagePlus, Search, Sparkles, Camera } from 'lucide-react'
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, type Node, type Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useNavigate } from 'react-router-dom'

const requirements = [
  { id: 'front', label: 'Front Exterior', desc: 'Direct shot of the front bumper and grille.' },
  { id: 'left', label: 'Left Side', desc: 'Driver side profile.' },
  { id: 'right', label: 'Right Side', desc: 'Passenger side profile.' },
  { id: 'rear', label: 'Rear Exterior', desc: 'Direct shot of the rear bumper and trunk.' },
  { id: 'interior', label: 'Dashboard & Interior', desc: 'Clear view of odometer and steering wheel.' },
]

export const VerificationPage = () => {
  const [stage, setStage] = useState(1)
  const navigate = useNavigate()
  
  const [currentReqIndex, setCurrentReqIndex] = useState(0)
  const [capturedPhotos, setCapturedPhotos] = useState<Record<string, string>>({})
  const [vin, setVin] = useState('')

  const onDropForRequirement = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    const url = URL.createObjectURL(acceptedFiles[0])
    setCapturedPhotos(prev => ({ ...prev, [requirements[currentReqIndex].id]: url }))
    // Automatically move to next requirement
    if (currentReqIndex < requirements.length - 1) {
      setCurrentReqIndex(prev => prev + 1)
    }
  }, [currentReqIndex])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropForRequirement, accept: { 'image/*': [] }, maxFiles: 1 })

  const initialNodes: Node[] = [
    { id: '1', position: { x: 50, y: 30 }, data: { label: '📸 AI Scan Completed' }, style: { background: '#FEFEFF', color: '#0f172a', border: '1px solid rgba(254,101,79,0.4)', borderRadius: '12px', padding: '12px 20px', fontSize: '13px', fontFamily: 'Inter', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' } },
    { id: '2', position: { x: 50, y: 130 }, data: { label: '🔍 VIN Decoded' }, style: { background: '#FEFEFF', color: '#0f172a', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '12px', padding: '12px 20px', fontSize: '13px', fontFamily: 'Inter', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' } },
    { id: '3', position: { x: 50, y: 230 }, data: { label: '📋 History Checked' }, style: { background: '#FEFEFF', color: '#0f172a', border: '1px solid rgba(254,209,140,0.8)', borderRadius: '12px', padding: '12px 20px', fontSize: '13px', fontFamily: 'Inter', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' } },
    { id: '4', position: { x: 50, y: 330 }, data: { label: '💰 Valuation Match' }, style: { background: '#FEFEFF', color: '#0f172a', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '12px', padding: '12px 20px', fontSize: '13px', fontFamily: 'Inter', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' } },
  ]
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#FE654F' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#10b981' } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#FED18C' } },
  ]
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const runAnalysis = () => {
    setStage(3)
    setTimeout(() => setStage(4), 3000)
  }

  const stageLabels = ['Visual Scan', 'VIN Lookup', 'Processing', 'Pipeline Analysis']

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] flex flex-col items-center pt-10 px-4 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary-light)] opacity-20 top-[-100px] right-[-100px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-warning)] opacity-10 bottom-[-50px] left-[-50px]" />

      {/* Back */}
      <div className="w-full max-w-4xl mb-6 relative z-10">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#0f172a] transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      <div className="w-full max-w-4xl relative z-10 text-[var(--color-text-primary)]">
        {/* Progress Stepper */}
        <div className="flex justify-between mb-12 relative px-4 text-[#0f172a]">
          <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-[var(--color-border-glass)] -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)]" initial={{ width: 0 }} animate={{ width: `${((stage - 1) / 3) * 100}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
          </div>
          {stageLabels.map((label, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-500 border ${
                stage > i + 1 ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary-glow)]' :
                stage === i + 1 ? 'bg-white border-[var(--color-primary)] text-[var(--color-primary)] shadow-lg shadow-[var(--color-primary-glow)]' :
                'bg-[var(--color-bg-glass)] border-[var(--color-border-glass)] text-[var(--color-text-muted)]'
              }`}>
                {stage > i + 1 ? <CheckCircle2 size={18} /> : i + 1}
              </div>
              <span className={`text-[11px] font-bold ${stage >= i + 1 ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}`}>{label}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Stage 1: AI Guided Image Capture */}
          {stage === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="glass-card p-6 md:p-10 flex flex-col md:flex-row gap-8 w-full max-w-4xl bg-white/90 backdrop-blur-xl">
              
              {/* Sidebar Checklist */}
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[var(--color-border-glass)] pb-6 md:pb-0 md:pr-6 shrink-0">
                <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2 text-[#0f172a]">
                  <Camera size={20} className="text-[var(--color-primary)]" />
                  AI Guided Scan
                </h2>
                <div className="flex flex-col gap-3">
                  {requirements.map((req, index) => {
                    const isCompleted = !!capturedPhotos[req.id];
                    const isActive = index === currentReqIndex;
                    return (
                      <button key={req.id} onClick={() => setCurrentReqIndex(index)} className={`flex items-start gap-3 p-3 rounded-xl text-left transition-colors border ${
                        isActive ? 'bg-[var(--color-bg-elevated)] border-[var(--color-primary-light)] scale-[1.02] shadow-sm' : 'border-transparent hover:bg-black/5'
                      }`}>
                        <div className={`mt-0.5 rounded-full p-1 border flex-shrink-0 transition-all ${isCompleted ? 'bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] border-[var(--color-emerald)]' : isActive ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-[#f1f5f9] text-[var(--color-text-muted)] border-gray-200'}`}>
                          {isCompleted ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 flex items-center justify-center text-[10px] font-bold">{index + 1}</div>}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isActive || isCompleted ? 'text-[#0f172a]' : 'text-[var(--color-text-muted)]'}`}>{req.label}</p>
                          <p className={`text-[11px] mt-0.5 leading-relaxed ${isActive ? 'text-[var(--color-text-secondary)]' : 'hidden md:block text-gray-400'}`}>{req.desc}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Main Capture Area */}
              <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
                {capturedPhotos[requirements[currentReqIndex].id] ? (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden relative group border-2 border-[var(--color-primary-light)] shadow-xl">
                     <img src={capturedPhotos[requirements[currentReqIndex].id]} alt={requirements[currentReqIndex].label} className="w-full h-full object-cover" />
                     <div className="absolute top-4 right-4 bg-[var(--color-emerald)] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                       <CheckCircle2 size={14} /> AI Accepted
                     </div>
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                        <button onClick={() => {
                          const newPhotos = {...capturedPhotos};
                          delete newPhotos[requirements[currentReqIndex].id];
                          setCapturedPhotos(newPhotos);
                        }} className="bg-white/20 hover:bg-white/30 border border-white/50 px-4 py-2 rounded-lg text-white text-sm font-bold flex items-center gap-2 backdrop-blur-md transition-all">
                          <ImagePlus size={16} /> Retake Photo
                        </button>
                     </div>
                  </div>
                ) : (
                  <div {...getRootProps()} className={`w-full aspect-video border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    isDragActive ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 scale-[1.02]' : 'border-gray-300 bg-gray-50 hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-primary-light)]'
                  }`}>
                    <input {...getInputProps()} />
                    <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Camera className={`w-8 h-8 ${isDragActive ? 'text-[var(--color-primary)]' : 'text-gray-400'}`} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0f172a] mb-1">Capture {requirements[currentReqIndex].label}</h3>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)] text-center mb-6 max-w-xs">{isDragActive ? "Drop image here..." : `Click or drag a clear photo of the ${requirements[currentReqIndex].label.toLowerCase()}`}</p>
                    <button className="liquid-glass-btn px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-md shadow-[var(--color-primary-glow)]">Open Camera</button>
                  </div>
                )}
                
                <div className="w-full flex justify-between items-center mt-8 pt-6 border-t border-[var(--color-border-glass)]">
                  <span className="text-sm font-bold text-[var(--color-text-secondary)]">
                    {Object.keys(capturedPhotos).length} / {requirements.length} Completed
                  </span>

                  {Object.keys(capturedPhotos).length === requirements.length ? (
                    <button onClick={() => setStage(2)} className="liquid-glass-btn px-8 py-3.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 shadow-lg shadow-[var(--color-primary-glow)] hover:scale-105 transition-transform">
                      Continue to VIN <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button onClick={() => {
                      if (currentReqIndex < requirements.length - 1) setCurrentReqIndex(prev => prev + 1);
                    }} className="ghost-btn bg-white border-gray-200 hover:border-gray-300 px-6 py-2.5 rounded-xl text-sm font-bold text-[#0f172a] flex items-center gap-2">
                       Skip Step <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Stage 2: VIN Scan */}
          {stage === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="glass-card p-10 flex flex-col items-center text-center bg-white/90 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <Search size={24} className="text-[var(--color-primary)]" />
                <h2 className="text-2xl font-bold text-[#0f172a]">Vehicle Identification</h2>
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm mb-8 max-w-md">Enter the 17-character VIN to fetch history and synchronize with structural photos.</p>

              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                maxLength={17}
                placeholder="JTDBT••••••••••••"
                className="w-full max-w-md bg-white border-2 border-gray-200 rounded-xl p-5 text-center text-2xl font-mono tracking-[0.2em] text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-glow)] transition-all placeholder-gray-300 shadow-inner"
              />

              <div className="flex gap-4 mt-10 w-full max-w-md">
                <button onClick={() => setStage(1)} className="ghost-btn bg-white border-gray-200 hover:bg-gray-50 flex-1 py-3.5 rounded-xl text-sm font-bold text-[#0f172a]">Back to Photos</button>
                <button onClick={runAnalysis} disabled={vin.length < 5} className="liquid-glass-btn flex-1 py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale transition-all shadow-md">
                  Start Analysis <Sparkles size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Stage 3: Processing */}
          {stage === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24">
              <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                <div className="absolute inset-0 border-[4px] border-gray-100 border-t-[var(--color-primary)] rounded-full animate-spin shadow-lg" />
                <div className="absolute inset-3 border-[4px] border-gray-100 border-b-[var(--color-emerald)] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                <div className="absolute inset-6 border-[3px] border-gray-100 border-l-[var(--color-warning)] rounded-full animate-spin" style={{ animationDuration: '2s' }} />
                <Sparkles size={32} className="text-[var(--color-primary)] animate-pulse drop-shadow-md" />
              </div>
              <h2 className="text-3xl font-extrabold mb-3 text-[#0f172a] drop-shadow-sm">Synthesizing Report...</h2>
              <p className="text-[var(--color-text-secondary)] font-medium text-sm bg-white/50 px-4 py-2 rounded-full border border-white/80">Cross-referencing photos with global VIN datasets.</p>
            </motion.div>
          )}

          {/* Stage 4: Workflow Overview */}
          {stage === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden flex flex-col h-[600px] bg-white/90 shadow-xl border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-bold text-[#0f172a]">Analysis Pipeline</h2>
                  <p className="text-[var(--color-text-secondary)] text-sm">Review the AI-generated verification checks.</p>
                </div>
                <button onClick={() => navigate('/report/123')} className="liquid-glass-btn px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 shadow-md shadow-[var(--color-primary-glow)]">
                  View Full Report <ArrowRight size={16} />
                </button>
              </div>
              <div className="flex-1 w-full bg-slate-50/60">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={(c) => setNodes((nds) => applyNodeChanges(c, nds))}
                  onEdgesChange={(c) => setEdges((eds) => applyEdgeChanges(c, eds))}
                  fitView
                >
                  <Background color="rgba(0,0,0,0.05)" gap={20} size={1} />
                  <Controls className="bg-white border border-gray-200 shadow-sm rounded-xl" />
                </ReactFlow>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

