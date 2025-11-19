/** @type {import('next').NextConfig} */

const path = require('path');
const { locales, sourceLocale } = require('./lingui.config.js');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    unoptimized: true,
    domains: process.env.IMAGE_DOMAINS.split(','),
  },
  experimental: {
    swcPlugins: [
      [
        '@lingui/swc-plugin',
        {
          macros: true,
        },
      ],
    ],
  },
  env: {
    MAGENTO_ENDPOINT: process.env.MAGENTO_ENDPOINT,
  },
  i18n: {
    locales: locales,
    defaultLocale: sourceLocale,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname),
    };

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    });
    config.module.rules.push({
      test: /\.po/,
      use: ['@lingui/loader'],
    });
    return config;
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:pathname.html',
          destination: '/cmsPages/:pathname*',
        },
      ],
    };
  },
};

module.exports = withBundleAnalyzer(nextConfig);
