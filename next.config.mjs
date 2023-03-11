import pwa from "next-pwa";

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

const plugins = [
  pwa({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  }),
];

const config = () => plugins.reduce((acc, next) => next(acc), nextConfig);

export default config;
