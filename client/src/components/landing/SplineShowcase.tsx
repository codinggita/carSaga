import Spline from '@splinetool/react-spline'

export const SplineShowcase = () => {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden border-y border-white/10 bg-black/40">
      <div className="absolute inset-0 z-0 opacity-40">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#84cc16] blur-[200px] rounded-full mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6">
        <div className="w-full md:w-1/3 flex flex-col space-y-6 pt-10 md:pt-0 pointer-events-none text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">Interact with your future ride.</h2>
          <p className="opacity-70 text-lg">
            Drag to rotate. Discover hotspots. Identify potential risks before making an offer.
          </p>
        </div>
        
        <div className="w-full md:w-2/3 h-[500px] md:h-full cursor-grab active:cursor-grabbing">
          {/* using a community spline URL for a 3D Car Model */}
          <Spline scene="https://prod.spline.design/iW9V4hEOMHtz-h8L/scene.splinecode" />
        </div>
      </div>
    </section>
  )
}
