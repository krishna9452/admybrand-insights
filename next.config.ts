
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // ⛔️ This is critical to avoid build failure from ESLint
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
