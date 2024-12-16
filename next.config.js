const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname)
    return config;
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
