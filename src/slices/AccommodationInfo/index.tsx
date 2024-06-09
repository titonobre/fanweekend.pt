import { Suspense } from "react";

import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { AccommodationCard, AccommodationCardSkeleton } from "@/components/card/accommodation-card";

import { getAccommodations } from "@/lib/data/accommodations";
import { getUserRegistrationData } from "@/lib/data/registered-users";

export type AccommodationInfoProps = SliceComponentProps<Content.AccommodationInfoSlice>;

async function AccommodationInfoCard() {
  const [registeredUser, accommodations] = await Promise.all([getUserRegistrationData(), getAccommodations()]);

  if (!accommodations || !registeredUser?.accommodation) {
    return undefined;
  }

  const accommodation = accommodations[registeredUser.accommodation];

  if (!accommodation) {
    return undefined;
  }

  return <AccommodationCard {...{ accommodation }} />;
}

export default function AccommodationInfo({ slice }: AccommodationInfoProps): JSX.Element {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Suspense fallback={<AccommodationCardSkeleton />}>
        <AccommodationInfoCard />
      </Suspense>
    </section>
  );
}
