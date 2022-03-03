import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

import withPlugins from "next-compose-plugins";
import pwa from "next-pwa";

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

export default withPlugins(
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