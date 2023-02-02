/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.imgur.com", "imgur.com"],
  },
};

module.exports = nextConfig;
