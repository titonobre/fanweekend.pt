"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { startOfDay, subDays } from "date-fns";

import AutoForm from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { adjustDateForTimezone } from "@/lib/utils/dateWithoutTimezone";
import { type ExtraNightFormSchema, extraNightFormSchema } from "@/schema/extra-night-form.schema";
import { api } from "@/trpc/react";

type ExtraNightFormProps = {
  eventStart: Date;
  eventEnd: Date;
};

export default function ExtraNightForm({ eventStart, eventEnd }: ExtraNightFormProps) {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const setExtraNightMutation = api.extraNight.setExtraNight.useMutation();

  useEffect(() => {
    if (setExtraNightMutation.isSuccess && setExtraNightMutation.data.type === "SUCCESS") {
      setSubmitted(true);
    }
  }, [setExtraNightMutation.data, setExtraNightMutation.isSuccess]);

  useEffect(() => {
    setErrorMessage(setExtraNightMutation.error?.message);
  }, [setExtraNightMutation.error]);

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

  const handleSubmit = (data: ExtraNightFormSchema): void => {
    setDisabled(true);

    const adjustedDate = data.date ? adjustDateForTimezone(data.date, "Europe/Lisbon") : undefined;

    setExtraNightMutation.mutate({
      ...data,
      date: adjustedDate,
    });
  };

  const fromDate = subDays(eventStart, 1);
  const toDate = eventEnd;

  const fixedDates = [{ from: startOfDay(eventStart), to: startOfDay(subDays(eventEnd, 1)) }];

  return (
    <>
      <AutoForm
        formSchema={extraNightFormSchema}
        onSubmit={handleSubmit}
        fieldConfig={{
          date: {
            description:
              "Select a date or leave the field empty if you don't want the extra night. The fixed nights are signaled on the calendar.",
            inputProps: {
              fromDate,
              toDate,
              disabled: fixedDates,
              modifiers: {
                included: fixedDates,
              },
              modifiersClassNames: {
                included: "bg-slate-700 text-slate-100 opacity-100 dark:bg-slate-300 dark:text-slate-900 dark:opacity-100",
              },
            } as unknown as undefined, // day picker component has custom props 🤷‍♂️,
          },

          notes: {
            fieldType: "textarea",
            description: "Is there something important you'd like us to know about the accommodation?",
          },
        }}
        dependencies={Object.keys(extraNightFormSchema.shape).map((key) => ({
          sourceField: key as keyof ExtraNightFormSchema,
          targetField: key as keyof ExtraNightFormSchema,
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
              <DialogTitle>Extra Night Preference Submitted</DialogTitle>
              <DialogDescription>
                <p>Your preference was registered. Thank you!</p>
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
