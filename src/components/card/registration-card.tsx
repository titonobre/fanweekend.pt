import { type HTMLAttributes, type RefAttributes } from "react";

import NextLink from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/components/utils";

type RegistrationCardProps = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    registrationEnabled: boolean;
  };

export function RegistrationCard({ className, registrationEnabled, ...props }: RegistrationCardProps) {
  if (!registrationEnabled) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        <CardHeader>
          <CardTitle>Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The registration is not enabled!</p>
          <p>If you think this is an error, please get in touch with us.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Registration</CardTitle>
        <CardDescription>Want to be part of the event? The first step is to register.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This registration is required for all participants, even if you won&apos;t display any models.</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>
          <NextLink href="/register">Register</NextLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
