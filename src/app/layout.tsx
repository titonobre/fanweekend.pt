import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import { PrivacyConsentProvider } from "@/lib/providers/privacy-consent";
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
          <PrivacyConsentProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </PrivacyConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
