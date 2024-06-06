import withMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  output: "export",
  basePath: process.env.BASE_PATH || "",

  reactStrictMode: true,

  webpack: (config) => {
    /* eslint-disable */

    if (String(config.module.rules.at(-1).test) != String(/\.mdx?$/)) {
      throw new Error("Last rule is not for MDX");
    }

    // patch @next/mdx rule
    config.module.rules.at(-1).resourceQuery = { not: [/raw/] };

    // append custom rule
    config.module.rules.unshift({
      test: /\.md$/,
      resourceQuery: /raw/,
      type: "asset/source",
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
    /* eslint-enable */
  },
};

/** @type {import("@next/mdx").NextMDXOptions} */
const withMDXOptions = {
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
};

export default withMDX(withMDXOptions)(config);
