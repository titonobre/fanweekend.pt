import { Box, Heading, Stack, Alert, AlertIcon } from "@chakra-ui/react";

import { REGISTRATION_ENABLED, SHOW_PRICING } from "../lib/env";

import Features from "./Features";
import PricingPlans from "./PricingPlans";

export default function Participate() {
  return (
    <>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="3xl">Be Part of It!</Heading>
      </Stack>

      {SHOW_PRICING && <PricingPlans />}

      {!REGISTRATION_ENABLED && (
        <Box marginY={10}>
          <Alert status="warning" borderRadius={6}>
            <AlertIcon />
            The registration form is being prepared and will open soon.
          </Alert>
        </Box>
      )}

      {SHOW_PRICING && <Features />}
    </>
  );
}
