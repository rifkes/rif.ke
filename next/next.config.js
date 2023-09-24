/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl/,
      type: "asset/source",
    })
    return config
  },
}

module.exports = nextConfig
