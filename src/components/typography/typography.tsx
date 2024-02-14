import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/components/utils";

export const typographyVariants = cva("text-xl", {
  variants: {
    variant: {
      h1: "lg: scroll-m-20 text-4xl text-5xl font-extrabold tracking-tight",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      // blockquote: "mt-6 border-l-2 pl-6 italic",
      // list: "my-6 ml-6 list-disc [&>li]:mt-2",
    },
    affects: {
      default: "",
      lead: "text-muted-foreground text-xl",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-muted-foreground text-sm",
      removePMargin: "[&:not(:first-child)]:mt-0",
    },
  },
  defaultVariants: {
    variant: "p",
    affects: "default",
  },
});

export interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(({ className, variant, affects, ...props }, ref) => {
  const Comp = variant ?? "p";
  return <Comp className={cn(typographyVariants({ variant, affects, className }))} ref={ref} {...props} />;
});
Typography.displayName = "H1";

export default Typography;
