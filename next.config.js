/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  env: {
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
}

module.exports = nextConfig
