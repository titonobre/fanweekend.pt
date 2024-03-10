import { type HTMLAttributes, type RefAttributes } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/components/utils";

import PaymentDetailsMessage from "@/documents/payment-details.md";

type PaymentDetailsCardProps = HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>;

export function PaymentDetailsCard({ className, ...props }: PaymentDetailsCardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <PaymentDetailsMessage />
      </CardContent>
    </Card>
  );
}
