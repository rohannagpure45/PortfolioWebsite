import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "your-image-hosting-domain.com",
      "image.tmdb.org",
      "v0.blob.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
  env: {
    ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
}

export default nextConfig

