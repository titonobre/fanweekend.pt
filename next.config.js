const path = require("path");

const { PHASE_PRODUCTION_BUILD } = require("next/constants");

const withPlugins = require("next-compose-plugins");
const pwa = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push(
      {
        type: "asset/resource",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ["@svgr/webpack"],
      }
    );

    return config;
  },
};

module.exports = withPlugins(
  [
    [
      pwa,
      {
        pwa: {
          dest: "public",
        },
      },
      [PHASE_PRODUCTION_BUILD],
    ],
  ],
  nextConfig
);
