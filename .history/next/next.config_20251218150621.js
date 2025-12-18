/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: `/images/5hal0fpp/production/**`,
      },
    ],
  },
	turbopack: {},
}

module.exports = nextConfig
