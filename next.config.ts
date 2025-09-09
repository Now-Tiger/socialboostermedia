import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  env: {
    djangoBackendUrl: "http://52.91.1.148:8000/",
    awsUserAnalyticsRoute: "http://52.91.1.148:8000/user-analytics/",
    djangoBackendLocalhost: "http://localhost:8000/",
    repo: "https://github.com/Now-Tiger/socialboostermedia",
    publicBitCoinBaseUrl:
      "https://data-api.coindesk.com/index/cc/v1/latest/tick",
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://52.91.1.148:8000/:path*", // only rewrite here
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*", // only headers here
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
