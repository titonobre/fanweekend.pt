import { UserProfile } from "@clerk/nextjs";
import NextLink from "next/link";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <section className="thin-container mt-10 flex min-h-screen w-full flex-1 flex-col items-center gap-10">
      <UserProfile />

      <div className="flex justify-center">
        <Button asChild>
          <NextLink href="/dashboard">Back to Dashboard</NextLink>
        </Button>
      </div>
    </section>
  );
}
