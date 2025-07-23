/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.anambrastate.gov.ng', 
        port: '',
        pathname: '/uploads/**', // adjust path if needed
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
