/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "127.0.0.1",
        port: "1337",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default nextConfig;
