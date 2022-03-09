import NextLink from "next/link";

import { Box, Heading, Text, Stack, Link, Button, HStack } from "@chakra-ui/react";

type RegisterCardProps = {
  enabled: boolean;
};

export default function RegisterCard({ enabled = false }: RegisterCardProps) {
  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color={enabled ? "gray.700" : "gray.500"} fontSize="2xl" fontFamily="body">
          Registration
        </Heading>
        <Text color="gray.500">Want to be part of the event? The first step is to register.</Text>
        <HStack justify="end">
          {enabled ? (
            <NextLink href="/account/plans" passHref>
              <Button as={Link} w="fit-content" colorScheme="green">
                Register
              </Button>
            </NextLink>
          ) : (
            <Button disabled>Register</Button>
          )}
        </HStack>
      </Stack>
    </Box>
  );
}
