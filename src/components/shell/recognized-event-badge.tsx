import Image from "next/image";
import NextLink from "next/link";

import raneBadge from "~/assets/images/rane-badge.svg";

export function RecognizedEventBadge() {
  return (
    <NextLink
      href="https://lan.lego.com/events/featured/"
      target="_blank"
      rel="noreferrer"
      title="This is a LEGO® Recognized AFOL Networking Event"
    >
      <Image src={raneBadge.src} fill alt="LEGO® Recognized AFOL Networking Event Badge" />
    </NextLink>
  );
}
