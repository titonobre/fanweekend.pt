/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 140,
  plugins: ["prettier-plugin-tailwindcss"],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  tailwindFunctions: ["cva"],
};

export default config;
