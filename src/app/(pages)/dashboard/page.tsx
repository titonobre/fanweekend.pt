import { currentUser } from "@clerk/nextjs/server";
import { SliceZone } from "@prismicio/react";
import { AlertCircle } from "lucide-react";

import { WelcomeCard } from "@/components/card/welcome-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Dashboard() {
  const client = createClient();

  const userPromise = currentUser();
  const pagePromise = client.getSingle("dashboard");

  const [user, page] = await Promise.all([userPromise, pagePromise]);

  if (!user) {
    return (
      <div className="thin-container mt-10 flex flex-col gap-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Whoops!</AlertTitle>
          <AlertDescription>Something wrong is not right. If the problem persists, please contact us.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="thin-container mt-10 flex flex-col gap-10">
      <WelcomeCard name={`${user.firstName} ${user.lastName}`} />
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}
