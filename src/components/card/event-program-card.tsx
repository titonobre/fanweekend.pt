import { type HTMLAttributes, type RefAttributes } from "react";

import NextLink from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/components/utils";

type RegistrationCardProps = HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>;

export function EventProgramCard({ className, ...props }: RegistrationCardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Event Program</CardTitle>
      </CardHeader>
      <CardContent>
        <p>There are a lot of things happening over the weekend. Check our program...</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>
          <NextLink href="/program">Event Program</NextLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
