import { type PropsWithChildren } from "react";

import dynamic from "next/dynamic";
import NextLink from "next/link";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { isFeatureEnabled } from "@/config";
import MOCRegistrationTerms from "@/documents/mocs-terms.md";
import { getUserRegistrationData } from "@/lib/data/registered-users";

const RegisterMOCForm = dynamic(() => import("./register-moc-form"), { ssr: false });

const CustomAlert: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="thin-container mt-10 flex flex-col gap-10">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Whoops!</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
      </Alert>

      <div className="flex justify-center">
        <Button asChild>
          <NextLink href="/dashboard">Back to Dashboard</NextLink>
        </Button>
      </div>
    </div>
  );
};

export default async function RegisterMOCPage() {
  const currentUser = await getUserRegistrationData();
  const mocRegistrationEnabled = await isFeatureEnabled("moc-registration");

  if (!currentUser) {
    return (
      <CustomAlert>
        <p>It seems you are not registered to the event. Go back to your dashboard.</p>
        <p>If you think this is an error, please get in touch with us.</p>
      </CustomAlert>
    );
  }

  if (!mocRegistrationEnabled) {
    return (
      <CustomAlert>
        <p>The MOC Registration form is not enabled!</p>
        <p>If you think this is an error, please get in touch with us.</p>
      </CustomAlert>
    );
  }

  return (
    <div className="thin-container flex flex-col gap-10 py-10">
      <div className="prose prose-neutral dark:prose-invert prose-headings:font-normal prose-h1:text-3xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:text-2xl prose-li:my-1">
        <MOCRegistrationTerms />
      </div>
      <div className="flex flex-col gap-2">
        <RegisterMOCForm />
      </div>
    </div>
  );
}
