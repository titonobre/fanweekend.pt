import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { HeartIcon } from "lucide-react";
import NextLink from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ThemeModeToggle } from "@/components/ui-alt/theme-mode-toggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { RecognizedEventBadge } from "./recognized-event-badge";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 p-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div>
            <div className="color-white relative aspect-[300/88] w-48 rounded-lg	border-2 border-black bg-white">
              <RecognizedEventBadge />
            </div>
          </div>

          <div>
            <p className="text-center text-sm leading-loose md:text-left">
              Made with <HeartIcon className="inline animate-pulsate" aria-label="love" /> by{" "}
              <a
                href={siteConfig.links.comunidade0937}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Comunidade 0937
              </a>
              . LEGO® is a trademark of the LEGO Group, which does not sponsor, authorize or endorse this web site.
            </p>
            <p className="text-center text-xs md:text-left">
              <NextLink href="/privacy" className="underline underline-offset-4">
                Privacy Policy
              </NextLink>
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button asChild size="icon">
            <NextLink href="https://www.facebook.com/groups/fanweekend.pt/">
              <SiFacebook />
            </NextLink>
          </Button>
          <Button asChild size="icon">
            <NextLink href="https://www.instagram.com/pdcfanweekend/">
              <SiInstagram />
            </NextLink>
          </Button>
          <ThemeModeToggle />
        </div>
      </div>
    </footer>
  );
}
