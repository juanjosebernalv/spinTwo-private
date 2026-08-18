import type { NextConfig } from "next";

const isProd = process.env.GITHUB_ACTIONS === "true";

const BASE_PATH = isProd ? "/spinTwo-private" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
