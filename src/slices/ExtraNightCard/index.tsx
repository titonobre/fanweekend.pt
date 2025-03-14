import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { ExtraNightCard } from "@/components/card/extra-night-card";


/**
 * Props for `ExtraNightCard`.
 */
export type ExtraNightCardProps = SliceComponentProps<Content.ExtraNightCardSlice>;

/**
 * Component for "ExtraNightCard" Slices.
 */
const ExtraNightCardSlice = ({ slice }: ExtraNightCardProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <ExtraNightCard />
    </section>
  );
};

export default ExtraNightCardSlice;
