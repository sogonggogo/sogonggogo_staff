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
      // DELETE 메서드는 API Route 핸들러가 처리하므로 제외
      // 나머지 요청만 백엔드로 프록시
      {
        source: "/api/:path*",
        destination: "http://uoscholar-server.store/sogong-api/api/:path*",
      },
    ];
  },
};

export default nextConfig;
