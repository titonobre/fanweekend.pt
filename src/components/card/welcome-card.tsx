import { type HTMLAttributes, type RefAttributes } from "react";

import { cn } from "@/components/utils";

type WelcomeCardProps = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    name: string;
  };

export function WelcomeCard({ className, name, ...props }: WelcomeCardProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <h1 className="text-3xl">
        Welcome <span className="inline font-bold">{name}</span>
      </h1>
      <p>This dashboard is your gateway into the Paredes de Coura Fan Weekend.</p>
    </div>
  );
}
