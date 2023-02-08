const nextConfig = {
  eslint: {
    dirs: ['src']
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: '/',
  distDir: process.env.DISTDIR || '.next',
};

module.exports = nextConfig;
