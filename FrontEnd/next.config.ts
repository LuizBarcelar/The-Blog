import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',

    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
        search: '',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3001/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
