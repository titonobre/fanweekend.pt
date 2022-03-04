import { Box, Heading, SimpleGrid, Icon, Text, Stack, HStack, VStack, Alert, AlertIcon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import PricingPlans from "./PricingPlans";

import { REGISTRATION_ENABLED } from "../lib/env";

// Replace test data with your own
const features = [
  {
    title: "Accommodation",
    text: "Accommodation in boarding houses (B&B) for three (3) nights.",
  },
  {
    title: "Meals",
    text: "Breakfast, lunch, afternoon snacks and dinner.",
  },
  {
    title: "Activities",
    text: "Access to activities, workshops, presentations and special offers.",
  },
  {
    title: "Lounge",
    text: "AFOL lounge with a wide variety of drinks and snacks.",
  },
  {
    title: "Swag",
    text: "Goodie Bag, participant wristband that will give you access to the activities.",
  },
];

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

      <Stack spacing={4} textAlign="center">
        <Text color="gray.600" fontSize="xl">
          The Basic plan includes the following:
        </Text>
      </Stack>
      <Box marginY={10}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.title} align="top">
              <Box color="green.400" px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align="start">
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color="gray.600">{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
