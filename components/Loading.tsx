import { Text, Spinner, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Stack spacing={4} textAlign="center" alignItems="center">
      <Spinner size="xl" />
      <Text color="gray.600" fontSize="xl">
        Loading...
      </Text>
    </Stack>
  );
}
