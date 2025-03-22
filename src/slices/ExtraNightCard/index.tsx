import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { ExtraNightCard } from "@/components/card/extra-night-card";

import { getUserRegistrationData } from "@/lib/data/registered-users";

/**
 * Props for `ExtraNightCard`.
 */
export type ExtraNightCardProps = SliceComponentProps<Content.ExtraNightCardSlice>;

/**
 * Component for "ExtraNightCard" Slices.
 */
const ExtraNightCardSlice = async ({ slice }: ExtraNightCardProps): Promise<JSX.Element> => {
  const registeredUser = await getUserRegistrationData();

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <ExtraNightCard extraNightSelected={!!registeredUser?.extraNight} />
    </section>
  );
};

export default ExtraNightCardSlice;
