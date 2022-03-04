declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const _: FC<SVGProps<HTMLOrSVGElement> & { title?: string }>;
  export = _;
}

declare module "*.svg?url" {
  const _: string;
  export = _;
}

declare module "*.md?raw" {
  const _: string;
  export = _;
}
