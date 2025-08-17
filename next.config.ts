/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dms.licdn.com', 'media.licdn.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'dms.licdn.com' },
      { protocol: 'https', hostname: 'media.licdn.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
