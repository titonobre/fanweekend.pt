import { Link } from "@chakra-ui/react";

import Badge from "../assets/images/rane-badge.svg";

export default function RecognizedEventBadge() {
  return (
    <Link
      href="https://lan.lego.com/events/featured/"
      target="_blank"
      rel="noreferrer"
      border="2px solid black"
      borderRadius="8px"
      backgroundColor="white"
    >
      <Badge width="100%" />
    </Link>
  );
}
