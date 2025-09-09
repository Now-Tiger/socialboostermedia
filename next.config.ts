import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://52.91.1.148:8000/:path*", // EC2 backend
      },
    ];
  },
};

export default nextConfig;
