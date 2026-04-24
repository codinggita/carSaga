import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export const CTASection = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="glow-orb w-[800px] h-[800px] bg-[var(--color-primary)] opacity-[0.06] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
          {/* Top glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" />
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-emerald)] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[var(--color-primary-glow)]"
            >
              <Sparkles size={24} className="text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-6">
              Ready to stop guessing?
            </h2>
            <p className="text-lg font-medium text-[var(--color-text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
              Your first report is completely free. No credit card. No commitments. Just clarity before you buy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/verification" className="liquid-glass-btn px-10 py-4 rounded-2xl text-base font-bold text-white inline-flex items-center gap-2.5">
                Start Free Verification <ArrowRight size={18} />
              </Link>
              <Link to="/auth" className="ghost-btn px-8 py-4 rounded-2xl text-base font-bold text-[#0f172a] bg-white border border-gray-200 hover:bg-gray-50 shadow-sm">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
