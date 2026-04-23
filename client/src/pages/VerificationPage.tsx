import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useDropzone } from 'react-dropzone'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UploadCloud, CheckCircle2, Loader2, ArrowRight, ArrowLeft, Shield, ImagePlus, Search, Sparkles } from 'lucide-react'
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, type Node, type Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useNavigate } from 'react-router-dom'

interface Photo { id: string; url: string }

const SortableItem = ({ id, url }: { id: string; url: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative aspect-video rounded-xl overflow-hidden border border-[var(--color-border-glass)] cursor-grab active:cursor-grabbing group">
      <img src={url} alt="Car upload" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

export const VerificationPage = () => {
  const [stage, setStage] = useState(1)
  const navigate = useNavigate()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [vin, setVin] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file)
    }))
    setPhotos(prev => [...prev, ...newPhotos])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setPhotos((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id)
        const newIndex = items.findIndex(i => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const initialNodes: Node[] = [
    { id: '1', position: { x: 50, y: 30 }, data: { label: '📸 Photos Uploaded' }, style: { background: 'rgba(15,23,42,0.9)', color: '#f1f5f9', border: '1px solid rgba(37,99,235,0.4)', borderRadius: '12px', padding: '12px 20px', fontSize: '13px', fontFamily: 'Inter' } },
    { id: '2', position: { x: 50, y: 130 }, data: { label: '🔍 VIN Decoded' }, style: { background: 'rgba(15,23,42,0.9)', color: '#f1f5f9', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '12px', padding: '12px 20px', fontSize: '13px', fontFamily: 'Inter' } },
    { id: '3', position: { x: 50, y: 230 }, data: { label: '📋 History Checked' }, style: { background: 'rgba(15,23,42,0.9)', color: '#f1f5f9', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '12px', padding: '12px 20px', fontSize: '13px', fontFamily: 'Inter' } },
    { id: '4', position: { x: 50, y: 330 }, data: { label: '💰 Costs Predicted' }, style: { background: 'rgba(15,23,42,0.9)', color: '#f1f5f9', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '12px', padding: '12px 20px', fontSize: '13px', fontFamily: 'Inter' } },
  ]
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#2563eb' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#10b981' } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#f59e0b' } },
  ]
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const runAnalysis = () => {
    setStage(3)
    setTimeout(() => setStage(4), 3000)
  }

  const stageLabels = ['Upload Photos', 'Enter VIN', 'AI Analysis', 'Workflow']

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] flex flex-col items-center pt-10 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-primary)] opacity-[0.04] top-0 right-0" />

      {/* Back */}
      <div className="w-full max-w-4xl mb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      <div className="w-full max-w-4xl">
        {/* Progress */}
        <div className="flex justify-between mb-12 relative px-4">
          <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-[var(--color-border-glass)] -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-emerald)]" initial={{ width: 0 }} animate={{ width: `${((stage - 1) / 3) * 100}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
          </div>
          {stageLabels.map((label, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                stage > i + 1 ? 'bg-[var(--color-emerald)] text-white shadow-lg shadow-[var(--color-emerald-glow)]' :
                stage === i + 1 ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary-glow)]' :
                'bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] text-[var(--color-text-muted)]'
              }`}>
                {stage > i + 1 ? <CheckCircle2 size={18} /> : i + 1}
              </div>
              <span className={`text-[11px] font-medium ${stage >= i + 1 ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>{label}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Stage 1 */}
          {stage === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="glass-card p-10 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <ImagePlus size={24} className="text-[var(--color-primary-light)]" />
                <h2 className="text-2xl font-bold">Upload Car Photos</h2>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm mb-8">Drag & drop exterior and interior shots. Reorder as needed.</p>

              <div {...getRootProps()} className={`w-full max-w-2xl border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 mb-8 ${
                isDragActive ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 scale-[1.01]' : 'border-[var(--color-border-glass)] bg-[var(--color-bg-glass)] hover:bg-[var(--color-bg-glass-hover)] hover:border-[var(--color-border-glass)]'
              }`}>
                <input {...getInputProps()} />
                <UploadCloud className={`w-12 h-12 ${isDragActive ? 'text-[var(--color-primary-light)]' : 'text-[var(--color-text-muted)]'} mb-3`} />
                <p className="text-sm font-medium text-white">{isDragActive ? "Drop files here..." : "Click or drag photos to upload"}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">PNG, JPG up to 10MB each</p>
              </div>

              {photos.length > 0 && (
                <div className="w-full max-w-2xl mb-8">
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={photos.map(p => p.id)} strategy={rectSortingStrategy}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {photos.map(photo => <SortableItem key={photo.id} id={photo.id} url={photo.url} />)}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              )}

              <button onClick={() => setStage(2)} disabled={photos.length === 0} className="liquid-glass-btn px-8 py-3.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 disabled:opacity-40 disabled:pointer-events-none">
                Continue <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* Stage 2 */}
          {stage === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="glass-card p-10 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-2">
                <Search size={24} className="text-[var(--color-emerald)]" />
                <h2 className="text-2xl font-bold">Vehicle Identification</h2>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm mb-8">Enter the 17-character VIN to fetch history and specs.</p>

              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                maxLength={17}
                placeholder="JTDBT••••••••••••"
                className="w-full max-w-md bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] rounded-xl p-5 text-center text-2xl font-mono tracking-[0.2em] text-[var(--color-primary-light)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors placeholder-[var(--color-text-muted)]"
              />

              <div className="flex gap-4 mt-10 w-full max-w-md">
                <button onClick={() => setStage(1)} className="ghost-btn flex-1 py-3.5 rounded-xl text-sm font-medium text-white">Back</button>
                <button onClick={runAnalysis} disabled={vin.length < 5} className="liquid-glass-btn flex-1 py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none">
                  Analyze <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Stage 3 */}
          {stage === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24">
              <div className="relative w-28 h-28 flex items-center justify-center mb-8">
                <div className="absolute inset-0 border-[3px] border-[var(--color-border-glass)] border-t-[var(--color-primary)] rounded-full animate-spin" />
                <div className="absolute inset-2 border-[3px] border-[var(--color-border-glass)] border-b-[var(--color-emerald)] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                <Sparkles size={28} className="text-[var(--color-primary-light)] animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold mb-2 gradient-text">Running AI Analysis...</h2>
              <p className="text-[var(--color-text-muted)] text-sm">Cross-referencing photos with VIN history datasets.</p>
            </motion.div>
          )}

          {/* Stage 4 */}
          {stage === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden flex flex-col h-[600px]">
              <div className="p-6 border-b border-[var(--color-border-glass)] flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Verification Pipeline</h2>
                  <p className="text-[var(--color-text-muted)] text-sm">Review the AI-generated workflow. Drag nodes to explore.</p>
                </div>
                <button onClick={() => navigate('/report/123')} className="liquid-glass-btn px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2">
                  View Report <ArrowRight size={16} />
                </button>
              </div>
              <div className="flex-1 w-full bg-[var(--color-bg-deep)]/80">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={(c) => setNodes((nds) => applyNodeChanges(c, nds))}
                  onEdgesChange={(c) => setEdges((eds) => applyEdgeChanges(c, eds))}
                  fitView
                >
                  <Background color="rgba(148,163,184,0.08)" gap={20} size={1} />
                  <Controls className="bg-[var(--color-bg-glass)] border border-[var(--color-border-glass)] rounded-xl" />
                </ReactFlow>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
