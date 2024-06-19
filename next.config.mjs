/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    fetchCache: "force-no-store",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
