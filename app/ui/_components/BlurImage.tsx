"use client";

import { cn } from "@/lib/utils";
import NextImage from "next/image";

import { useState } from "react";

type BlurImageProps = {
  className?: string;
  lazy?: boolean;
} & React.ComponentPropsWithoutRef<typeof NextImage>;

export function BlurImage({
  alt,
  src,
  className,
  lazy = true,
  ...props
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NextImage
      className={cn("duration-700", isLoading && "blur-md", className)}
      src={src}
      alt={alt}
      loading={lazy ? "lazy" : undefined}
      priority={!lazy}
      width={1920}
      height={1080}
      quality={100}
      onLoad={() => setIsLoading(false)}
      {...props}
    />
  );
}
