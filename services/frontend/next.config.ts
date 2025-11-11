import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NEXTJS_STANDALONE_OUTPUT !== undefined ? { output: "standalone" } : {}),
};

export default nextConfig;
