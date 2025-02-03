import { type HTMLAttributes, type ReactNode, type RefAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { BanknoteIcon, ClipboardCheckIcon, FileSpreadsheetIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/components/utils";

const iconVariants = cva("relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2", {
  variants: {
    state: {
      done: "border-green-400 text-green-400",
      pending: "border-yellow-400 text-yellow-400",
      disabled: "border-gray-400 text-gray-400",
    },
  },
  defaultVariants: {
    state: "disabled",
  },
});

type IconState = VariantProps<typeof iconVariants>["state"];

type IconProps = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    state?: IconState;
  };
function Icon({ state, children }: IconProps) {
  return <div className={cn(iconVariants({ state }))}>{children}</div>;
}

type ProgressCardProps = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    formSubmitted: boolean;
    registrationConfirmed: boolean;
    paymentEnabled: boolean;
    paymentReceived: boolean;
  };

type Step = {
  icon: ReactNode;
  state: IconState;
  title: string;
  details: string;
};

export function ProgressCard({ formSubmitted, registrationConfirmed, paymentEnabled, paymentReceived }: ProgressCardProps) {
  const steps: Step[] = [
    {
      icon: <FileSpreadsheetIcon />,
      title: "Registration",
      state: formSubmitted ? "done" : "pending",
      details: formSubmitted ? "Form Submitted" : "Pending",
    },
    {
      icon: <ClipboardCheckIcon />,
      title: "Confirmation",
      state: registrationConfirmed ? "done" : formSubmitted ? "pending" : "disabled",
      details: registrationConfirmed ? "Registration Confirmed" : formSubmitted ? "Processing Registration" : "Pending",
    },
    {
      icon: <BanknoteIcon />,
      title: "Payment",
      state: paymentReceived ? "done" : paymentEnabled ? "pending" : "disabled",
      details: paymentReceived ? "Paid and Confirmed" : paymentEnabled ? "Awaiting" : "Pending",
    },
  ];

  return (
    <>
      <ol className="w-full items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        {steps.map((step, i) => (
          <li key={i} className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <Icon state={step.state}>{step.icon}</Icon>
            <span>
              <h3 className="font-medium leading-tight">{step.title}</h3>
              <p className="text-sm">{step.details}</p>
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}

export function ProgressCardLoading() {
  return (
    <div className="w-full items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
      <div className="flex items-center space-x-2.5">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-20 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
