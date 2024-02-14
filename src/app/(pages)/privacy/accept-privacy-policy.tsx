"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { usePrivacyConsentContext } from "@/lib/providers/privacy-consent";

export default function AcceptPrivacyPolicy() {
  const { accepted, setAccepted } = usePrivacyConsentContext();

  const [read, setRead] = useState(accepted);

  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox id="read" checked={read} disabled={read} onCheckedChange={(checked) => setRead(!!checked)} />
        <label htmlFor="read" className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {read ? "What has been read, cannot be unread!" : "I read this!"}
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="accept" checked={accepted} disabled={!read || accepted} onCheckedChange={() => setAccepted()} />
        <label htmlFor="accept" className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {accepted ? "Accepted!" : "I accept privacy policy!"}
        </label>
      </div>
    </>
  );
}
