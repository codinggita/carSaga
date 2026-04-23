import React from 'react'
import { motion } from 'motion/react'
import { Activity, Camera, Maximize } from 'lucide-react'

export const SplineShowcase = () => {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[var(--color-surface-container-lowest)]">
      {/* Sleek liquid glow */}
      <div className="absolute inset-0 z-0 opacity-60">
         <div className="absolute top-1/3 right-1/4 translate-x-1/4 -translate-y-1/3 w-[800px] h-[800px] bg-[var(--color-primary-container)] blur-[250px] rounded-full mix-blend-screen pointer-events-none" />
         <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[var(--color-primary)] blur-[200px] rounded-full mix-blend-screen pointer-events-none opacity-40" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center max-w-[1400px] mx-auto px-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-5/12 flex flex-col space-y-8 pt-20 md:pt-0 text-center md:text-left z-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter text-white">
            Scan your <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">future ride.</span>
          </h2>
          <p className="text-[var(--color-on-surface-variant)] text-xl max-w-lg border-l-4 border-[var(--color-primary)] pl-6">
            Upload images to discover hidden defects. Identify potential risks before making an offer across the verified network.
          </p>
          <div className="flex justify-center md:justify-start gap-4 pt-4">
             <button className="liquid-glass-btn px-8 py-3 rounded-xl flex items-center gap-2 text-white font-medium">
               <Camera size={18}/> Start Analysis
             </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, type: "spring", stiffness: 40 }}
          className="w-full md:w-8/12 h-[500px] mt-12 md:mt-0 relative flex justify-center items-center"
        >
          {/* Elegant static fallback UI replacing broken spline */}
          <div className="glass-card w-full max-w-[600px] aspect-video relative flex flex-col p-6 overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent opacity-60"></div>
             
             <div className="flex justify-between items-center border-b border-[var(--color-glass-border)] pb-4 mb-6">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-secondary)]">
                   <Activity size={18} />
                 </div>
                 <span className="font-semibold text-lg text-white">AI Visual Analysis</span>
               </div>
               <div className="text-[var(--color-on-surface-variant)] flex gap-2">
                 <Maximize size={16} />
               </div>
             </div>

             <div className="flex-1 rounded-lg bg-[var(--color-surface-container-lowest)]/50 border border-[var(--color-glass-border)] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                 <div className="absolute w-[200px] h-32 border border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 right-10 top-10 flex items-end p-2 animate-pulse-glow">
                    <span className="text-xs font-medium text-[var(--color-secondary)] bg-black/40 px-2 py-1 rounded">Panel alignment diff</span>
                 </div>
                 <div className="absolute w-16 h-16 rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)]/10 left-1/4 bottom-1/4 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[var(--color-primary)]">Scuff</span>
                 </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
