import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'swiper'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // Short, memorable review link. Points to the Google review page so a QR
      // code or "livingreen.life/review" never breaks even if the Google URL changes.
      {
        source: '/review',
        destination: 'https://g.page/r/CfJBJ2SxcNbXEBM/review',
        permanent: true,
      },
      {
        source: '/reviews-google',
        destination: 'https://g.page/r/CfJBJ2SxcNbXEBM/review',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
