"use client";

import React from "react";
import { createContext, type PropsWithChildren, useContext } from "react";
import { useLocalStorage } from "react-use";

import { frontmatter } from "@/documents/privacy-policy.md";

type PrivacyConsent = {
  readonly accepted: boolean;
  readonly setAccepted: () => void;
};

const version = frontmatter.version ?? "0";

export const PrivacyConsentContext = createContext<PrivacyConsent | null>(null);

export const PrivacyConsentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [acceptedVersion, setAcceptedVersion] = useLocalStorage<string>("privacyPolicyAcceptedVersion", undefined, { raw: true });

  const accepted = acceptedVersion === version;

  const setAccepted = () => setAcceptedVersion(version);

  return <PrivacyConsentContext.Provider value={{ accepted, setAccepted }}>{children}</PrivacyConsentContext.Provider>;
};

export const usePrivacyConsentContext = () => {
  const context = useContext(PrivacyConsentContext);

  if (!context) {
    throw new Error("usePrivacyConsentContext must be used inside the PrivacyConsentProvider");
  }

  return context;
};
