import { type LucideIcon } from "lucide-react";
import React from "react";

import { Button } from "~/components/ui/button";

type ButtonWithIconProps = {
  icon: LucideIcon;
  label: string;
};

export function ButtonWithIcon({ icon, label }: ButtonWithIconProps) {
  return (
    <Button>
      {React.createElement(icon, { className: "mr-2 h-4 w-4" })}
      {label}
    </Button>
  );
}
