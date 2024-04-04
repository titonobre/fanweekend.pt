import { type HTMLAttributes, type RefAttributes } from "react";

import NextLink from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/components/utils";

type ExtraNightCardProps = HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>;

export function ExtraNightCard({ className, ...props }: ExtraNightCardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Extra Night</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your registration fee includes an extra night. We need you to make a choice.</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>
          <NextLink href="/extra-night">Select Extra Night</NextLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
