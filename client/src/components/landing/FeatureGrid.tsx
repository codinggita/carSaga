import { motion } from 'motion/react'
import { Camera, Shield, Zap, TrendingUp, MapPin, Brain } from 'lucide-react'

const features = [
  {
    icon: Camera,
    title: 'Visual AI Analysis',
    description: 'Drag & drop photos. Our AI scans every panel, tire tread, and interior surface to grade condition instantly.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Shield,
    title: 'VIN History Check',
    description: 'One VIN search across global registries — accidents, liens, odometer fraud, and auction records.',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: TrendingUp,
    title: 'Cost Prediction',
    description: 'ML-powered forecasts for maintenance, depreciation, and insurance over the next 3 years.',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: Brain,
    title: 'Sage AI Expert',
    description: 'Chat with our AI car expert. Ask about any finding, compare models, or get negotiation advice.',
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    icon: Zap,
    title: '60-Second Reports',
    description: 'Full verification reports generated in under a minute. No waiting, no dealer games.',
    gradient: 'from-rose-500 to-pink-400',
  },
  {
    icon: MapPin,
    title: 'Mechanic Network',
    description: 'Book on-site inspections through our vetted mechanic marketplace with integrated maps.',
    gradient: 'from-sky-500 to-blue-400',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export const FeatureGrid = () => {
  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      {/* Background Orb */}
      <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.04] top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="text-sm font-semibold text-[var(--color-primary-light)] tracking-widest uppercase mb-4 block">Features</span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Everything you need to{' '}
            <span className="gradient-text">buy with confidence</span>
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Six powerful tools working together so you never overpay for a used car again.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card group p-8 flex flex-col relative overflow-hidden"
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon size={22} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-[#0f172a] mb-3">{feature.title}</h3>
              <p className="text-[var(--color-text-secondary)] font-medium text-sm leading-relaxed flex-1">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
