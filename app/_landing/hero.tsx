import AvatarTrust from "./avatar-trust";
import { BlurFade } from "./blur-fade";

export type HeroProps = {};

export const Hero = (props: HeroProps) => {
  return (
    <div id="hero" className="relative max-w-4xl mx-auto">
      <div className="flex items-center justify-center py-4 border-b [border-image:linear-gradient(to_right,transparent,--theme(--color-primary/.4),transparent)1] dark:[border-image:linear-gradient(to_right,transparent,--theme(--color-primary/.16),transparent)1]"></div>
      <div className="relative z-40 mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 text-center lg:gap-12 lg:py-16">
        <div>
          <BlurFade inView delay={0}>
            <h1
              style={
                {
                  "--from-color":
                    "color-mix(in srgb, var(--primary) 80%, var(--foreground) 60%)",
                  "--to-color":
                    "color-mix(in srgb, var(--primary) 20%, var(--foreground) 90%)",
                } as React.CSSProperties
              }
              className="font-inter-tight text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-b from-[var(--from-color)] to-[var(--to-color)] pb-4"
            >
              Full-stack component ready to use
            </h1>
          </BlurFade>
          <BlurFade inView delay={0.2}>
            <p className="text-lg text-muted-foreground">
              The first functional component library for Next.js 15 - shadcn/ui
              compatbility
            </p>
          </BlurFade>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6 before:h-px before:w-full before:border-b before:[border-image:linear-gradient(to_right,transparent,--theme(--color-primary/.3),transparent)1] after:h-px after:w-full after:border-b after:[border-image:linear-gradient(to_right,transparent,--theme(--color-primary/.3),transparent)1]">
          <div className="m-auto flex items-center gap-2 max-lg:flex-col">
            <BlurFade inView delay={0.8}>
              <AvatarTrust count={888} />
            </BlurFade>
          </div>
        </div>
      </div>
    </div>
  );
};
