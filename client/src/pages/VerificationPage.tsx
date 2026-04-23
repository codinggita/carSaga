import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UploadCloud, CheckCircle2, Loader2, ArrowRight } from 'lucide-react'
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, type Node, type Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useNavigate } from 'react-router-dom'

// Note: the requested drag-and-drop features and visual flow are simplified for this scaffold

interface Photo {
  id: string;
  url: string;
}

const SortableItem = ({ id, url }: { id: string, url: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative aspect-video rounded-xl overflow-hidden glass-card cursor-grab active:cursor-grabbing border-white/20">
      <img src={url} alt="Car upload" className="w-full h-full object-cover" />
    </div>
  )
}

export const VerificationPage = () => {
  const [stage, setStage] = useState(1)
  const navigate = useNavigate()
  
  // Stage 1: Photos
  const [photos, setPhotos] = useState<Photo[]>([])
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file)
    }))
    setPhotos(prev => [...prev, ...newPhotos])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} })
  
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

  // Stage 2: VIN
  const [vin, setVin] = useState('')

  // Stage 4: React Flow
  const initialNodes: Node[] = [
    { id: '1', position: { x: 50, y: 50 }, data: { label: 'Photos Uploaded' }, style: { background: '#1e293b', color: 'white', border: '1px solid #84cc16', borderRadius: '8px' } },
    { id: '2', position: { x: 50, y: 150 }, data: { label: 'VIN Extracted' }, style: { background: '#1e293b', color: 'white', border: '1px solid #84cc16', borderRadius: '8px' } },
    { id: '3', position: { x: 50, y: 250 }, data: { label: 'AI Analyzed Condition' }, style: { background: '#1e293b', color: 'white', border: '1px solid #84cc16', borderRadius: '8px' } },
  ]
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#84cc16' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#84cc16' } },
  ]
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  // Simulation
  const runAnalysis = () => {
    setStage(3)
    setTimeout(() => {
      setStage(4) // Move to workflow builder
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-stone-900 text-slate-50 flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative w-full px-10">
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#84cc16]" initial={{ width: 0 }} animate={{ width: `${((stage - 1) / 3) * 100}%` }} transition={{ duration: 0.5 }} />
          </div>
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 ${stage >= s ? 'bg-[#84cc16] text-black' : 'bg-stone-800 border-2 border-white/20 text-slate-400'}`}>
              {stage > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Stage 1: Photos */}
          {stage === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-10 flex flex-col items-center">
              <h2 className="text-3xl font-bold mb-2">Upload Car Photos</h2>
              <p className="text-slate-400 mb-8">Drag & drop exterior and interior shots. Reorder them as needed.</p>
              
              <div {...getRootProps()} className={`w-full max-w-2xl aspect-[3/1] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors mb-8 ${isDragActive ? 'border-[#84cc16] bg-[#84cc16]/10' : 'border-white/20 bg-black/20 hover:bg-white/5'}`}>
                <input {...getInputProps()} />
                <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-[#84cc16]' : 'text-slate-400'} mb-2`} />
                <p className="text-sm font-medium">{isDragActive ? "Drop photos here..." : "Click or drag photos here to upload"}</p>
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

              <button onClick={() => setStage(2)} disabled={photos.length === 0} className="mt-auto bg-[#84cc16] hover:bg-[#65a30d] disabled:opacity-50 disabled:hover:bg-[#84cc16] text-black font-semibold py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
                Continue to VIN <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Stage 2: VIN */}
          {stage === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-10 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold mb-2">Vehicle ID Number</h2>
              <p className="text-slate-400 mb-8">Enter the 17-character VIN to fetch history and specs.</p>
              
              <input 
                type="text" 
                value={vin} 
                onChange={(e) => setVin(e.target.value.toUpperCase())} 
                maxLength={17}
                placeholder="JTDBTB....................." 
                className="w-full max-w-md bg-black/30 border border-white/20 rounded-lg p-4 text-center text-2xl font-mono tracking-widest text-[#84cc16] focus:outline-none focus:border-[#84cc16]" 
              />
              
              <div className="flex gap-4 mt-12 w-full max-w-md">
                <button onClick={() => setStage(1)} className="flex-1 border border-white/20 hover:bg-white/5 py-3 rounded-lg font-medium transition-colors">Back</button>
                <button onClick={runAnalysis} disabled={vin.length < 5} className="flex-1 bg-[#84cc16] hover:bg-[#65a30d] text-black disabled:opacity-50 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  Analyze Vehicle <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Stage 3: AI Analysis (Loader) */}
          {stage === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="flex flex-col items-center justify-center py-20">
              <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                <div className="absolute inset-0 border-4 border-white/10 border-t-[#84cc16] rounded-full animate-spin" />
                <Loader2 className="w-12 h-12 text-[#84cc16] animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-[#84cc16] mb-2 animate-pulse">Running AI Visual Scan...</h2>
              <p className="text-slate-400 text-sm">Cross-referencing photos with VIN history datasets.</p>
            </motion.div>
          )}

          {/* Stage 4: Visual Report Builder */}
          {stage === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden flex flex-col h-[600px]">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Verification Workflow</h2>
                  <p className="text-slate-400 text-sm">Review the generated pipeline logic. Drag nodes to explore.</p>
                </div>
                <button onClick={() => navigate('/report/123')} className="bg-[#84cc16] text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#65a30d] transition-colors shadow-[0_0_15px_rgba(132,204,22,0.3)]">
                  View Full Report
                </button>
              </div>
              <div className="flex-1 w-full bg-black/40">
                <ReactFlow 
                  nodes={nodes} 
                  edges={edges} 
                  onNodesChange={(c) => setNodes((nds) => applyNodeChanges(c, nds))}
                  onEdgesChange={(c) => setEdges((eds) => applyEdgeChanges(c, eds))}
                  fitView
                >
                  <Background color="#ffffff" gap={16} size={1} />
                  <Controls className="bg-white/10 fill-white" />
                </ReactFlow>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
