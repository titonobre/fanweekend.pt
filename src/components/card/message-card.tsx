import { type HTMLAttributes, type RefAttributes } from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type WelcomeCardProps = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    title: string;
    content: string;
  };

export function MessageCard({ className, title, content, ...props }: WelcomeCardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
