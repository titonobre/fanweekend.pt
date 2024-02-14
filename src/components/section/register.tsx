import NextLink from "next/link";

import { Button } from "@/components/ui/button";

import { isFeatureEnabled } from "@/config";

export async function Register() {
  const registrationEnabled = await isFeatureEnabled("event-registration");

  if (!registrationEnabled) {
    return <></>;
  }

  return (
    <div className="thin-container flex flex-1 flex-col items-center gap-10 overflow-hidden text-center">
      <p>Wanna see it for yourself?</p>
      <Button>
        <NextLink href="/register">Register Now</NextLink>
      </Button>
    </div>
  );
}
