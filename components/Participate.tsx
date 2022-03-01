import { Box, Heading, SimpleGrid, Icon, Text, Stack, HStack, VStack, Alert, AlertIcon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import PricingPlans from "./PricingPlans";

// Replace test data with your own
const features = [
  {
    title: "Accommodation",
    text: "Accommodation in boarding houses (B&B) for three (3) nights from Thursday to Sunday.",
  },
  {
    title: "Meals",
    text: "Breakfast (in the boarding houses for ALL days of your stay), lunch, afternoon snacks and dinner from Thursday through Sunday.",
  },
  {
    title: "Activities",
    text: "Access to activities, workshops, presentations and special offers.",
  },
  {
    title: "Swag",
    text: "Participant wristband that will give you access to the activities.",
  },
];

export default function Participate() {
  return (
    <>
      <Stack spacing={4} textAlign="center">
        <Heading fontSize="3xl">Be Part of It!</Heading>
      </Stack>

      <PricingPlans />

      <Box marginY={10}>
        <Alert status="warning" borderRadius={6}>
          <AlertIcon />
          The registration form is being prepared and will open soon.
        </Alert>
      </Box>

      <Stack spacing={4} textAlign="center">
        <Text color="gray.600" fontSize="xl">
          The registration fee of <b>€110</b> per person includes the following:
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
