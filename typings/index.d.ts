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

/**
 * @see https://github.com/Steve-Junior/tawkto-react
 */
declare module "tawkto-react" {
  class TawkToWidget {
    constructor(propertyId: string, widgetId: string);
    onLoad(arg0: () => void);
    setAttributes(arg0: Partial<{ name: string; email: string; hash: string }>);
    maximize();
  }

  export = TawkToWidget;
}
