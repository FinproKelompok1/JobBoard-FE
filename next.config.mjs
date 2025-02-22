/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "assets.loket.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "api.qrserver.com" },
    ],
  },
};

export default nextConfig;
