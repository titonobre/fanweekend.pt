"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import AutoForm from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { adjustDateForTimezone } from "@/lib/utils/dateWithoutTimezone";
import { type RegistrationSchema, registrationSchema } from "@/schema/registration-form.schema";
import { api } from "@/trpc/react";

export default function RegistrationForm() {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const eventRegistrationMutation = api.eventRegistration.register.useMutation();

  useEffect(() => {
    if (eventRegistrationMutation.isSuccess && eventRegistrationMutation.data.type === "SUCCESS") {
      setSubmitted(true);
    }
  }, [eventRegistrationMutation.data, eventRegistrationMutation.isSuccess]);

  useEffect(() => {
    setErrorMessage(eventRegistrationMutation.error?.message);
  }, [eventRegistrationMutation.error]);

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

  // if (registrationTermsQuery.isFetching) {
  //   return <div>loading...</div>;
  // }

  // if (!registrationTermsQuery.data) {
  //   return <div>error!</div>;
  // }

  const handleSubmit = (data: RegistrationSchema): void => {
    const adjustedDateOfBirth = adjustDateForTimezone(data.dateOfBirth, "Europe/Lisbon");

    const adjustedData = {
      ...data,
      dateOfBirth: adjustedDateOfBirth,
    };

    eventRegistrationMutation.mutate(adjustedData);
  };

  return (
    <>
      <AutoForm
        formSchema={registrationSchema}
        onSubmit={handleSubmit}
        fieldConfig={{
          acceptTerms: {
            inputProps: {
              required: true,
            },
            description: "I agree to the terms and conditions.",
          },

          country: {
            description: "Where are you from?",
          },

          shirtSize: {
            description: "We may use this to choose something to put in your goodie bag, or to choose the size of your bed...",
          },

          dateOfBirth: {
            description: "When you were born!",
            inputProps: {
              fromYear: 1910,
              toYear: 2023,
              captionLayout: "dropdown-buttons",
              styles: {
                caption_label: {
                  display: "none",
                },
              },
            },
          },

          lug: {
            description: "Only if they tricked you into joining them.",
          },

          notes: {
            fieldType: "textarea",
            description: "Is there something important you'd like us to know? Like food allergies or who are you traveling with?",
          },
        }}
        dependencies={Object.keys(registrationSchema.shape).map((key) => ({
          sourceField: key as keyof RegistrationSchema,
          targetField: key as keyof RegistrationSchema,
          type: DependencyType.DISABLES,
          when: () => disabled,
        }))}
      >
        <Button type="submit" disabled={disabled}>
          Submit
        </Button>
      </AutoForm>

      {submitted && (
        <Dialog defaultOpen={true} onOpenChange={successDialogChanged}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registration Submitted</DialogTitle>
              <DialogDescription>
                <p>
                  Thank you for signing up for this amazing event! We have received your registration and will get back to you soon with the
                  payment details.
                </p>
                <p>
                  Please don’t forget to add <strong>info@fanweekend.pt</strong> to your senders safe list.
                </p>
                <p>You can now close this dialog and go back to your dashboard.</p>
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
