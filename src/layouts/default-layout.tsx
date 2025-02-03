import { type PropsWithChildren } from "react";

import { PrivacyBanner } from "@/components/shell/privacy-banner";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";

type DefaultLayoutProps = {
  transparentHeader?: true;
};

export const DefaultLayout: React.FC<PropsWithChildren<DefaultLayoutProps>> = ({ children, transparentHeader = false }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader transparentOnTop={transparentHeader} />

      <main className="flex-1 flex-col">{children}</main>

      <SiteFooter />
      <PrivacyBanner />
    </div>
  );
};
