import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { EventProgramCard } from "@/components/card/event-program-card";

export type EventProgramProps = SliceComponentProps<Content.EventProgramSlice>;

export default function EventProgram({ slice }: EventProgramProps): JSX.Element {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <EventProgramCard />
    </section>
  );
}
