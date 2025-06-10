/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // For Next.js 13+ (App Router)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true
}

module.exports = nextConfig