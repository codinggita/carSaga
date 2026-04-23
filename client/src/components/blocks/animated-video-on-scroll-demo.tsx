import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroButton,
  HeroVideo,
} from "@/components/blocks/animated-video-on-scroll"

export const HeroVideoDemo = () => {
  return (
    <section>
      <ContainerScroll className="h-[350vh]">
        <ContainerSticky
          style={{
            background:
              "radial-gradient(40% 40% at 50% 20%, #0e19ae 0%, #0b1387 22.92%, #080f67 42.71%, #030526 88.54%)",
          }}
          className="bg-stone-900 px-6 py-10 text-slate-50"
        >
          <ContainerAnimated className="space-y-4 text-center">
            <h1 className="text-5xl font-medium tracking-tighter md:text-6xl">
              Don&apos;t Buy Blind.
            </h1>
            <p className="mx-auto max-w-[42ch] opacity-80">
              Upload car photos, enter your VIN and get a full AI-powered
              verification report — in seconds. Know the car before you own it.
            </p>
          </ContainerAnimated>

          <ContainerInset className="max-h-[450px] w-auto py-6">
            <HeroVideo
              src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
              data-src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
            />
          </ContainerInset>

          <ContainerAnimated
            transition={{ delay: 0.4 }}
            outputRange={[-120, 0]}
            inputRange={[0, 0.7]}
            className="mx-auto mt-2 w-fit"
          >
            <HeroButton>
              <span className="text-sm font-medium text-slate-50">
                Verify a Car — It&apos;s Free
              </span>
            </HeroButton>
          </ContainerAnimated>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  )
}
