import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      // add other domains here if needed
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
