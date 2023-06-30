const nextConfig = {
  eslint: {
    dirs: ['src']
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: '/',
  distDir: process.env.DISTDIR || '.next',
  images: {
    domains: ['avatars.githubusercontent.com']
  },
  async rewrites() {
    return [
      {
        source: '/service/:path*',
        destination: 'https://github.com/:path*'
      },
      {
        source: '/apiservice/:path',
        destination: 'https://api.github.com/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
