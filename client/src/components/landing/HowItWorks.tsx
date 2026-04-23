import { motion } from 'motion/react'
import { Upload, Search, BarChart3, FileCheck, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Photos',
    description: 'Drag & drop or take photos of the car. Our AI needs just 4-6 images to start.',
    color: 'var(--color-primary)',
  },
  {
    icon: Search,
    step: '02',
    title: 'Enter the VIN',
    description: 'Type or scan the 17-character VIN. We pull from global registries instantly.',
    color: 'var(--color-emerald)',
  },
  {
    icon: BarChart3,
    step: '03',
    title: 'AI Analyzes',
    description: 'Our models cross-reference photos, history, and market data in under 60 seconds.',
    color: 'var(--color-warning)',
  },
  {
    icon: FileCheck,
    step: '04',
    title: 'Get Your Report',
    description: 'Full condition score, repair estimates, market value, and negotiation tips.',
    color: 'var(--color-emerald)',
  },
]

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-emerald)] opacity-[0.04] bottom-0 right-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="text-sm font-semibold text-[var(--color-emerald)] tracking-widest uppercase mb-4 block">How it Works</span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Four steps to{' '}
            <span className="gradient-text">total clarity</span>
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            From upload to full report in under a minute. No dealer BS.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-emerald)] to-[var(--color-warning)] opacity-20" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-center"
            >
              {/* Step Circle */}
              <div className="relative mx-auto mb-8">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border border-[var(--color-border-glass)] bg-[var(--color-bg-glass)] backdrop-blur-xl"
                  style={{ boxShadow: `0 0 40px color-mix(in srgb, ${step.color} 20%, transparent)` }}
                >
                  <step.icon size={24} style={{ color: step.color }} />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center"
                  style={{
                    background: step.color,
                    color: '#fff',
                    boxShadow: `0 4px 12px color-mix(in srgb, ${step.color} 40%, transparent)`,
                  }}
                >
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-[240px] mx-auto">
                {step.description}
              </p>

              {/* Arrow between steps (desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-3 z-10">
                  <ArrowRight size={16} className="text-[var(--color-text-muted)]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
