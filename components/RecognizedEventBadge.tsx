import { Box, Link } from "@chakra-ui/react";

import Badge from "../assets/images/rane-badge.svg";

export default function RecognizedEventBadge() {
  return (
    <Box border="2px solid black" borderRadius="8px" backgroundColor="white">
      <Link href="https://lan.lego.com/events/featured/" target="_blank" rel="noreferrer">
        <Badge width="100%" />
      </Link>
    </Box>
  );
}
