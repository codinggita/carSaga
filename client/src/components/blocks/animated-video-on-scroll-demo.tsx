import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroVideo,
} from "@/components/blocks/animated-video-on-scroll"

export const HeroVideoDemo = () => {
  return (
    <section>
      <ContainerScroll className="h-[350vh]">
        <ContainerSticky
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, var(--color-surface-container-high) 0%, var(--color-surface-container-low) 30%, var(--color-surface-container-lowest) 70%)",
          }}
          className="px-6 py-10 border-none relative overflow-hidden"
        >
          {/* Neon trust sleek bg glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)] opacity-10 blur-[150px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
          
          <ContainerAnimated className="space-y-6 text-center md:text-left md:ml-[10vw] relative z-10">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-[var(--color-primary)] mix-blend-plus-lighter">
              Don&apos;t <br/> Buy <span className="text-white">Blind.</span>
            </h1>
            <p className="max-w-[50ch] text-[var(--color-on-surface-variant)] text-xl border-l-[3px] border-[var(--color-secondary)] pl-4">
              Upload car photos, enter your VIN and get a full AI-powered
              verification report — in seconds. Know the car before you own it.
            </p>
          </ContainerAnimated>

          <ContainerInset className="max-h-[450px] w-full py-12">
            <HeroVideo
              src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
              data-src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
              className="shadow-[0px_40px_80px_rgba(37,99,235,0.3)] rounded-3xl opacity-90 mix-blend-screen mix-blend-plus-lighter"
            />
          </ContainerInset>

          <ContainerAnimated
            transition={{ delay: 0.4 }}
            outputRange={[-120, 0]}
            inputRange={[0, 0.7]}
            className="md:ml-[15vw] mt-6 w-fit"
          >
            <button className="liquid-glass-btn px-10 py-5 rounded-2xl text-lg font-bold text-white tracking-wide">
              Verify a Car — It&apos;s Free
            </button>
          </ContainerAnimated>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  )
}
