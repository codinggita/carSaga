import { HeroVideoDemo } from '@/components/blocks/animated-video-on-scroll-demo'
import { SplineShowcase } from '@/components/landing/SplineShowcase'
import { FeatureGrid } from '@/components/landing/FeatureGrid'

export const LandingPage = () => {
  return (
    <main className="min-h-screen bg-stone-900 text-slate-50 flex flex-col">
      <HeroVideoDemo />
      <SplineShowcase />
      <FeatureGrid />
    </main>
  )
}
