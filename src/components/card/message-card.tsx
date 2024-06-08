import { type HTMLAttributes, type RefAttributes } from "react";

import NextLink from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/components/utils";

type MessageCardProps = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    title: string;
    content: string;
    cta?: {
      label: string;
      link: string;
      external: boolean;
    };
  };

export function MessageCard({ className, title, content, cta, ...props }: MessageCardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      {cta && (
        <CardFooter className="flex justify-end">
          <Button>
            <NextLink href={cta.link} {...(cta.external && { target: "_blank", rel: "noreferrer" })}>
              {cta.label}
            </NextLink>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
