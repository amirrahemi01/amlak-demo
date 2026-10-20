import type { NextConfig } from "next";

const config: NextConfig = {
  // Photos are resized/compressed by the Unsplash image CDN (see src/lib/loader.ts)
  images: { loader: "custom", loaderFile: "./src/lib/loader.ts" },
};
export default config;
