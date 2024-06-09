import { type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/components/utils";

export type MessageCardProps = SliceComponentProps<Content.MessageCardSlice>;

export default function MessageCard({ slice }: MessageCardProps): JSX.Element {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Card className={cn("w-full")}>
        <CardHeader>
          <CardTitle>{slice.primary.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <PrismicRichText field={slice.primary.body} />
        </CardContent>
        {slice.primary.cta_label && slice.primary.cta_link && (
          <CardFooter className="flex justify-end">
            <Button>
              <PrismicNextLink field={slice.primary.cta_link}>{slice.primary.cta_label}</PrismicNextLink>
            </Button>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
