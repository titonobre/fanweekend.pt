"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { type RegisterMOCFormSchema, registerMOCFormSchema } from "@/schema/register-moc-form.schema";
import { api } from "@/trpc/react";

export default function RegisterMOCForm() {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const registerMOCMutation = api.mocs.registerMOC.useMutation();

  useEffect(() => {
    if (registerMOCMutation.isSuccess && registerMOCMutation.data.type === "SUCCESS") {
      setSubmitted(true);
    }
  }, [registerMOCMutation.data, registerMOCMutation.isSuccess]);

  useEffect(() => {
    setErrorMessage(registerMOCMutation.error?.message);
  }, [registerMOCMutation.error]);

  const errorDialogChanged = (isOpen: boolean) => {
    if (!isOpen) {
      setDisabled(false);
      setErrorMessage(undefined);
    }
  };

  const successDialogChanged = (isOpen: boolean) => {
    if (!isOpen) {
      router.push("/dashboard");
    }
  };

  const handleSubmit = (data: RegisterMOCFormSchema): void => {
    setDisabled(true);
    registerMOCMutation.mutate(data);
  };

  return (
    <>
      <AutoForm
        formSchema={registerMOCFormSchema}
        onSubmit={handleSubmit}
        fieldConfig={{
          title: {
            description: "The name of your creation.",
          },
          description: {
            fieldType: "textarea",
          },
          elements: {
            description: "A rough estimation is enough.",
          },
          width: {
            description: "In studs.",
          },
          depth: {
            description: "In studs.",
          },
          photo: {
            description: "The URL for a publicly available photo of your creation.",
          },
          buildTime: {
            description: "Hours? Days? Months? How much time it took you to build it.",
          },
          notes: {
            fieldType: "textarea",
            description:
              "Does it require a power outlet nearby? Should it be displayed on the floor? Is there something important you'd like us to know about the MOC?",
          },
        }}
      >
        <Button type="submit" disabled={disabled}>
          Submit
        </Button>
      </AutoForm>

      {submitted && (
        <Dialog defaultOpen={true} onOpenChange={successDialogChanged}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>MOC Registration Submitted</DialogTitle>
              <DialogDescription>
                <p>Your MOC was registered. Thank you!</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {errorMessage && (
        <Dialog defaultOpen={true} onOpenChange={errorDialogChanged}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Something went sideways!</DialogTitle>
              <DialogDescription>
                <p>{errorMessage}</p>
                <p>You can try again. If the problem persists, please contact us.</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
