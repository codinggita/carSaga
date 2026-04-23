import { motion } from 'framer-motion'
import { Shield, Smartphone, Zap, Wrench } from 'lucide-react'

const features = [
  {
    icon: <Smartphone className="h-6 w-6 text-[#84cc16]" />,
    title: 'Visual Uploads',
    description: 'Simply drag and drop photos. Our AI analyzes condition based on visuals instantly.',
  },
  {
    icon: <Shield className="h-6 w-6 text-[#84cc16]" />,
    title: 'Verified History',
    description: 'Enter a VIN to pull trusted past ownership and accident records.',
  },
  {
    icon: <Zap className="h-6 w-6 text-[#84cc16]" />,
    title: 'Predictive Costs',
    description: 'See simulated future maintenance costs based on the cars make and mileage.',
  },
  {
    icon: <Wrench className="h-6 w-6 text-[#84cc16]" />,
    title: 'Trusted Mechanics',
    description: 'Book on-site inspections through our interactive maps with trusted partners.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export const FeatureGrid = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Everything you need to buy with confidence</h2>
        <p className="opacity-70 max-w-2xl mx-auto">
          We bring transparency to the used car market out of the box using modern AI and rich data feeds.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {features.map((feature, idx) => (
          <motion.div key={idx} variants={itemVariants} className="glass-card p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
            <div className="bg-[#84cc16]/10 p-4 rounded-full mb-4 ring-1 ring-[#84cc16]/30 shadow-[0px_0px_15px_rgba(132,204,22,0.2)]">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="opacity-70 text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
