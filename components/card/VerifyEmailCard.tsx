import { Box, Heading, Text, Stack } from "@chakra-ui/react";

export default function VerifyEmailCard() {
  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          Email Verification
        </Heading>
        <Text color="gray.500">Please check your email inbox and follow the instructions to verify your account.</Text>
      </Stack>
    </Box>
  );
}
