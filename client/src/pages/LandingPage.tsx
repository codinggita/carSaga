import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { FeatureGrid } from '@/components/landing/FeatureGrid'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'

export const LandingPage = () => {
  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)] overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  )
}
