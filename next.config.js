/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    if (!config.experiments) {
      config.experiments = {}
    }
    config.experiments.topLevelAwait = true
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.pepsicopartners.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nhlong27-ecommerce-pepsico.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
