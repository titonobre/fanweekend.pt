"use client";

import NextLink from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { usePrivacyConsentContext } from "@/lib/providers/privacy-consent";

export function PrivacyBanner() {
  const { accepted, setAccepted } = usePrivacyConsentContext();

  const [privacyBannerHidden, setPrivacyBannerHidden] = useState(true);

  useEffect(() => {
    setPrivacyBannerHidden(accepted);
  }, [accepted]);

  if (privacyBannerHidden) {
    return null;
  }

  return (
    <div className="sticky bottom-0 m-4 mb-0 flex flex-col justify-between gap-4 rounded-t-lg border border-slate-200 bg-white/95 p-4 shadow-2xl dark:border-slate-800 dark:bg-black/95">
      <div className="text-md font-bold leading-loose">Regarding Your Privacy</div>
      <div className="flex flex-col gap-4 md:flex-row ">
        <p className="flex-1 text-sm leading-loose">
          We use cookies and other tracking technologies to help provide you a better experience. Please take a few minutes to read our
          Privacy Policy.
        </p>
        <div className="flex flex-row gap-4 self-center whitespace-nowrap sm:self-end">
          <Button onClick={() => setAccepted()}>Accept</Button>
          <Button asChild>
            <NextLink href="/privacy">Privacy Policy</NextLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
