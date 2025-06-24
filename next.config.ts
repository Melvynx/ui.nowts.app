import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "/": [".git", ".next/cache"],
    "/ui/[slug]": [".git", ".next/cache"],
  },
};

export default nextConfig;
