declare module "*.svg" {
  import { type StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}

declare module "*.mdx" {
  export const frontmatter: Record<string, string>;
}

declare module "*.md" {
  export const frontmatter: Record<string, string>;
}

declare module "*.md?raw" {
  const _: string;
  export = _;
}
