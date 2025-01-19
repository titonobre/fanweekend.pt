import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { RegistrationCard } from "@/components/card/registration-card";

import { isFeatureEnabled } from "@/config";

/**
 * Props for `RegistrationCard`.
 */
export type RegistrationCardProps = SliceComponentProps<Content.RegistrationCardSlice>;

/**
 * Component for "RegistrationCard" Slices.
 */
const RegistrationCardSlice = async ({ slice }: RegistrationCardProps): Promise<JSX.Element> => {
  const registrationEnabled = await isFeatureEnabled("event-registration");

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <RegistrationCard registrationEnabled={registrationEnabled} />
    </section>
  );
};

export default RegistrationCardSlice;
