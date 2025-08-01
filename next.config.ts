/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/entry',
        permanent: false, 
      },
    ];
  },
};

module.exports = nextConfig;
