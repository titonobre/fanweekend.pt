import NextLink from "next/link";

import { Box, Heading, Text, Stack, Link, Button, HStack } from "@chakra-ui/react";

export default function RegisterCard() {
  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Text color="green.500" textTransform="uppercase" fontWeight={800} fontSize="sm" letterSpacing={1.1}>
          Event
        </Text>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          Registration
        </Heading>
        <Text color="gray.500">Want to be part of the event? The first step is to register.</Text>
        <HStack justify="end">
          <NextLink href="/account/plans" passHref>
            <Button as={Link} w="fit-content" colorScheme="green">
              Register
            </Button>
          </NextLink>
        </HStack>
      </Stack>
    </Box>
  );
}
