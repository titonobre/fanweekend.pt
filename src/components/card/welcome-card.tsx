import { type HTMLAttributes, type RefAttributes } from "react";

import { Skeleton } from "@/components/ui/skeleton";
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

export function WelcomeCardLoading() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-[36px] w-1/2 rounded-lg" />
      <Skeleton className="h-[24px] w-full rounded-lg" />
    </div>
  );
}
