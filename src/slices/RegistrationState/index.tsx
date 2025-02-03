import { Suspense } from "react";

import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { ProgressCard, ProgressCardLoading } from "@/components/card/progress-card";

import { getUserRegistrationData } from "@/lib/data/registered-users";

export type RegistrationStateProps = SliceComponentProps<Content.RegistrationStateSlice>;

async function Progress() {
  const registeredUser = await getUserRegistrationData();

  return (
    <ProgressCard
      formSubmitted={!!registeredUser}
      registrationConfirmed={!!registeredUser?.registrationConfirmed}
      paymentEnabled={!!registeredUser?.paymentEnabled}
      paymentReceived={!!registeredUser?.paymentReceived}
    />
  );
}

export default async function RegistrationState({ slice }: RegistrationStateProps): Promise<JSX.Element> {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Suspense fallback={<ProgressCardLoading />}>
        <Progress />
      </Suspense>
    </section>
  );
}
