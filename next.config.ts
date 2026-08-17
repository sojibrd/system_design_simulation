import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/system_design_simulation" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

