import { Box, Heading, Text, Stack, Button, HStack, AlertIcon, Alert } from "@chakra-ui/react";

type RegisterCardProps = {
  enabled: boolean;
};

export default function ActivitiesCard({ enabled = false }: RegisterCardProps) {
  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color={enabled ? "gray.700" : "gray.500"} fontSize="2xl" fontFamily="body">
          Activities
        </Heading>
        <Text color="gray.500">Here you will be able to register for the several activities available.</Text>
        <Alert colorScheme="gray" borderRadius={6}>
          <AlertIcon />
          The activities will be available soon.
        </Alert>
        <HStack justify="end">
          <Button disabled>Register</Button>
        </HStack>
      </Stack>
    </Box>
  );
}
