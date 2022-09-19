import withPlugins from "next-compose-plugins";
import pwa from "next-pwa";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH || "",
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
      },
      {
        test: /\.md$/,
        resourceQuery: /raw/, // *.svg?raw
        use: "raw-loader",
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
