import { SvglImg } from "@/registry/nowts/components/svgl-images";

export function SvglImagesExamples() {
  return (
    <div className="flex items-center gap-4">
      <SvglImg
        lightIconName="github_light"
        darkIconName="github_dark"
        width="32"
        height="32"
      />
      <SvglImg
        lightIconName="google"
        darkIconName="google"
        width="32"
        height="32"
      />
      <SvglImg
        lightIconName="react"
        darkIconName="react"
        width="32"
        height="32"
      />
    </div>
  );
}