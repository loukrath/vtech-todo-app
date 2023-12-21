/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: process.env.NEXT_API_URL,
  },
};

module.exports = nextConfig;
