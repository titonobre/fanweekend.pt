import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { PrismicPreview } from "@prismicio/next";

import { ThemeProvider } from "@/components/theme-provider";

import { PrivacyConsentProvider } from "@/lib/providers/privacy-consent";
import { repositoryName } from "@/prismicio";
import { TRPCReactProvider } from "@/trpc/react";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Paredes de Coura Fan Weekend",
  description: "Paredes de Coura Fan Weekend",
  keywords: ["paredes", "coura", "fan", "weekend"],
  authors: [{ name: "Comunidade 0937", url: "https://comunidade0937.com/" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkProvider
            appearance={{
              userButton: {
                elements: {
                  userButtonOuterIdentifier: "text-slate-950 dark:text-slate-50 text-base",
                },
              },
            }}
          >
            <PrivacyConsentProvider>
              <TRPCReactProvider>{children}</TRPCReactProvider>
              <PrismicPreview repositoryName={repositoryName} />
            </PrivacyConsentProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
