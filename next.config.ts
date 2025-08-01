// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This skips build failure on lint error
  },
};

export default nextConfig;
