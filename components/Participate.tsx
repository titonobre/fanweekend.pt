import { Box, Heading, Stack, Alert, AlertIcon } from "@chakra-ui/react";
import PricingPlans from "./PricingPlans";
import Features from "./Features";

import { REGISTRATION_ENABLED } from "../lib/env";

export default function Participate() {
  return (
    <>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="3xl">Be Part of It!</Heading>
      </Stack>

      <PricingPlans />

      {!REGISTRATION_ENABLED && (
        <Box marginY={10}>
          <Alert status="warning" borderRadius={6}>
            <AlertIcon />
            The registration form is being prepared and will open soon.
          </Alert>
        </Box>
      )}

      <Features />
    </>
  );
}
