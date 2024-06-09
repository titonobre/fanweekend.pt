import { Suspense } from "react";

import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { MOCsCard, MOCsCardSkeleton } from "@/components/card/mocs-card";

import { isFeatureEnabled } from "@/config";
import { getUserMOCs } from "@/lib/data/registered-mocs";

export type MyOwnCreationsProps = SliceComponentProps<Content.MyOwnCreationsSlice>;

async function MyMOCs() {
  const mocRegistrationEnabled = await isFeatureEnabled("moc-registration");
  const registeredMOCs = await getUserMOCs();

  const mocNames = registeredMOCs.map((moc) => moc.title);

  return <MOCsCard mocRegistrationEnabled={mocRegistrationEnabled} registeredMOCs={mocNames} />;
}

export default function MyOwnCreations({ slice }: MyOwnCreationsProps): JSX.Element {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Suspense fallback={<MOCsCardSkeleton />}>
        <MyMOCs />
      </Suspense>
    </section>
  );
}
