"use client";

import NextLink from "next/link";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { cva, type VariantProps } from "class-variance-authority";
import { LayoutDashboardIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/components/utils";

import useScrollState from "@/lib/hooks/useScrollState";

const variants = cva("sticky z-50 transition-all", {
  variants: {
    variant: {
      transparent: "bg-transparent",
      hidden: "bg-white/95 dark:bg-black/95",
      default: "bg-white/95 dark:bg-black/95",
      scrolling: "bg-white/95 shadow-2xl dark:bg-black/95",
    },
    visibility: {
      visible: "top-0",
      hidden: "-top-16",
    },
  },
  defaultVariants: {
    variant: "default",
    visibility: "visible",
  },
});

type Variant = VariantProps<typeof variants>["variant"];
type Visibility = VariantProps<typeof variants>["visibility"];

export type NavbarProps = {
  transparentOnTop?: boolean;
};

export function SiteHeader({ transparentOnTop }: NavbarProps = { transparentOnTop: false }) {
  const [scrollPosition, scrollDirection] = useScrollState();
  const user = useUser();

  const signedIn = user.isSignedIn;

  const isScrolled = scrollPosition > 30;
  const isScrolledFar = scrollPosition > 164;

  const isTransparent = transparentOnTop && !isScrolledFar;

  const isScrollingDown = scrollDirection === "down";

  const isHidden = isScrolled && isScrollingDown;

  const visibility: Visibility = isHidden ? "hidden" : "visible";

  const variant: Variant = isTransparent ? "transparent" : isHidden ? "hidden" : isScrolled ? "scrolling" : "default";

  return (
    <div className={cn(variants({ variant, visibility }))}>
      <header className="container z-40">
        <div className="flex h-16 items-center justify-between py-6">
          <div>
            {!isTransparent && (
              <>
                <NextLink href={signedIn ? "/dashboard" : "/"}>Paredes de Coura Fan Weekend</NextLink>
              </>
            )}
          </div>

          <SignedIn>
            <UserButton showName userProfileMode="navigation" userProfileUrl="/user">
              <UserButton.MenuItems>
                <UserButton.Link label="Dashboard" labelIcon={<LayoutDashboardIcon className="size-4" />} href="/dashboard" />
                <UserButton.Action label="manageAccount" />
                <UserButton.Action label="signOut" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>
    </div>
  );
}
