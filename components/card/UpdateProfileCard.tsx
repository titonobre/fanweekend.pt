import { Box, Heading, Text, Stack, Link, Button, HStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function UpdateProfileCard() {
  return (
    <Box w="full" bg="white" boxShadow="2xl" rounded="md" p={6} overflow="hidden">
      <Stack>
        <Heading color="gray.700" fontSize="2xl" fontFamily="body">
          Profile
        </Heading>
        <Text color="gray.500">Update your profile for a better experience.</Text>
        <HStack justify="end">
          <NextLink href="/account/profile" passHref>
            <Button as={Link} w="fit-content" colorScheme="green">
              Profile
            </Button>
          </NextLink>
        </HStack>
      </Stack>
    </Box>
  );
}
