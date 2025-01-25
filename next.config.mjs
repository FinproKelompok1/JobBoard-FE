/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'assets.loket.com' }
    ]
  }
};

export default nextConfig;
