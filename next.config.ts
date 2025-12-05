import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 개발 환경에서는 basePath 제거, 프로덕션에서만 사용
  basePath: process.env.NODE_ENV === "production" ? "/staff" : "",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://uoscholar-server.store/sogong-api/api/:path*",
      },
    ];
  },
};

export default nextConfig;
