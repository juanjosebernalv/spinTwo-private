import type { NextConfig } from "next";

const isProd = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/spinTwo-private" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
