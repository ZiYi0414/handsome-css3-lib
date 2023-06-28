const nextConfig = {
  eslint: {
    dirs: ['src']
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: '/',
  distDir: process.env.DISTDIR || '.next',
  async rewrites() {
    return [
      {
        source: '/service/:path*', // 匹配你的 API 路径，例如 "/api/users"
        destination: 'https://github.com/:path*' // 实际的 API 地址
      }
    ];
  }
};

module.exports = nextConfig;
