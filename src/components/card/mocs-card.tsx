import { type HTMLAttributes, type RefAttributes } from "react";

import NextLink from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/components/utils";

type MOCsCardProps = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    registeredMOCs: string[];
    mocRegistrationEnabled: boolean;
  };

export function MOCsCard({ className, registeredMOCs, mocRegistrationEnabled, ...props }: MOCsCardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>MOCs</CardTitle>
      </CardHeader>
      <CardContent>
        {mocRegistrationEnabled && (
          <p>Want to bring some of your creations? Fill the MOC Registration Form once for each MOC you wish to display.</p>
        )}
        {registeredMOCs?.length > 0 && (
          <>
            <p className="pt-2">Your Registered MOCs:</p>
            <ul className="list-inside list-disc">
              {registeredMOCs.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {!mocRegistrationEnabled && <p>The MOC Registration is not allowed at this time.</p>}
        <Button {...{ disabled: !mocRegistrationEnabled }}>
          <NextLink href="/register-moc">Register MOC</NextLink>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function MOCsCardSkeleton() {
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="leading-none tracking-tight">
          <Skeleton className="h-6 w-48 max-w-full" />
        </h3>
      </div>
      <div className="p-6 pt-0">
        <Skeleton className="w-48 max-w-full" />
      </div>
      <div className="flex items-center justify-end p-6 pt-0">
        <Skeleton className="h-10 w-44" />
      </div>
    </div>
  );
}
